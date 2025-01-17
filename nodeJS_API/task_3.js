"use strict";

const { isMainThread, workerData, parentPort, Worker } = require("worker_threads");
const fs = require("fs");

let current_timestamp = new Date().toLocaleString("ru");

setInterval(() => (current_timestamp = new Date().toLocaleString("ru")), 1000);

if (isMainThread) {
  const writeToFile = () => {
    fs.appendFile("./file.txt", `${current_timestamp} Messages from workers\n`, (err) => {
      if (err) {
        return console.error(err);
      }
    });
  };

  setInterval(writeToFile, 1000);

  for (let i = 0; i < 3; i++) {
    const worker = new Worker(__filename, {
      workerData: {
        id: i + 1,
      },
    });

    worker.on("message", (msg) => console.log(`${current_timestamp} ${msg}`));
  }
} else {
  parentPort.postMessage(`Message from worker ${workerData.id}`);
}
