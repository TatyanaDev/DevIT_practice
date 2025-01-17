"use strict";

// Реализовать стрим для ограничения скорости передачи данных

const { Transform } = require("stream");
const fs = require("fs");

class ThrottlePipe extends Transform {
  constructor({ throttle }) {
    super();
    this.throttle = throttle; // bytes per second
    this.lastTime = Date.now(); // Initialize with current time
    this.remainingQuota = this.throttle; // Remaining data quota in the current period
  }

  _transform(chunk, encoding, callback) {
    const now = Date.now();
    const elapsedTime = now - this.lastTime;

    if (elapsedTime >= 1000) {
      this.remainingQuota = this.throttle; // Reset quota each second
      this.lastTime = now;
    }

    if (chunk.length <= this.remainingQuota) {
      this.push(chunk);
      this.remainingQuota -= chunk.length;

      callback();
    } else {
      // If the chunk is too large, throttle it
      const timeToWait = Math.ceil(((chunk.length - this.remainingQuota) / this.throttle) * 1000);
      this.push(chunk.slice(0, this.remainingQuota));

      const remainingChunk = chunk.slice(this.remainingQuota);
      this.remainingQuota = 0;

      setTimeout(() => {
        this.push(remainingChunk);

        callback();
      }, timeToWait);
    }
  }
}

const throttlePipe = new ThrottlePipe({ throttle: 1024 }); // 1 KB per second

fs.createReadStream("./copyMe").pipe(throttlePipe).pipe(fs.createWriteStream("./copyHere"));
