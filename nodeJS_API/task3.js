const {
  isMainThread,
  workerData,
  parentPort,
  Worker
} = require('worker_threads')
const fs = require('fs')

function timestamp () {
  current_timestamp = new Date().toLocaleString('ru')
}
setInterval(timestamp, 1000)

if (isMainThread) {
  for (let i = 0; i < 3; i++) {
    const currentWorkerId = i + 1
    const worker = new Worker(__filename, {
      workerData: {
        id: currentWorkerId
      }
    })
    worker.on('message', msg => {
      setInterval(() => {
        fs.appendFile('file.txt', `${current_timestamp}   ${msg}\n`, function (
          err
        ) {
          if (err) {
            return console.error(err)
          }
        })
      }, 1000)
    })
  }
} else {
  parentPort.postMessage(`Message from worker ${workerData.id}`)
}
