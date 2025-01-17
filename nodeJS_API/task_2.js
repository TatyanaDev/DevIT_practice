"use strict";

// Написать свой файловый стрим на чтение с возможностью указания ограничения скорости чтения в КВ(килобайтах)

// Пример использования:
// const readable = createReadableStreamWithThrottle('./data/test.tar', {throttle: 1000})
// const writeable = createWriteStream('./data/test.tar.copy');
// readable.pipe(writeable);

const { Readable } = require("stream");
const fs = require("fs");

class ThrottledReadable extends Readable {
  constructor(path, options) {
    super(options);
    this.path = path;
    this.throttleKBps = options.throttle;
    this.throttleBytesPerMs = (this.throttleKBps * 1024) / 1000; // Convert KBps to Bytes/ms
    this.lastReadTime = Date.now();
  }

  _read(size) {
    const now = Date.now();
    const timeSinceLastRead = now - this.lastReadTime;
    const maxBytesToRead = Math.floor(this.throttleBytesPerMs * timeSinceLastRead);
    const bytesToRead = Math.min(size, maxBytesToRead);

    if (bytesToRead <= 0) {
      // Not enough "time budget" to read yet, set a timeout to try again soon
      setTimeout(() => this._read(size), 50);
      return;
    }

    // Adjust last read time: move it forward by the amount of time "consumed" by this read
    this.lastReadTime += bytesToRead / this.throttleBytesPerMs;

    const buffer = Buffer.alloc(bytesToRead);

    fs.read(this.fd, buffer, 0, bytesToRead, null, (err, bytesRead, buffer) => {
      if (err) {
        this.emit("error", err);
        return;
      }

      if (bytesRead === 0) {
        this.push(null); // EOF
      } else {
        this.push(buffer.slice(0, bytesRead));
      }
    });
  }

  _construct(callback) {
    fs.open(this.path, "r", (err, fd) => {
      if (err) {
        callback(err);
        return;
      }

      this.fd = fd;
      callback();
    });
  }

  _destroy(err, callback) {
    if (this.fd) {
      fs.close(this.fd, (er) => callback(er || err));
    } else {
      callback(err);
    }
  }
}

const createReadableStreamWithThrottle = (path, options) => new ThrottledReadable(path, options);

const readable = createReadableStreamWithThrottle("./data/test.tar", { throttle: 1000 });
const writable = fs.createWriteStream("./data/test.tar.copy");

readable.pipe(writable);
