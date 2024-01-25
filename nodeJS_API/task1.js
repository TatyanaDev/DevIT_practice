'use strict'
// Реализовать стрим для ограничения скорости передачи данных
const { Transform } = require('stream')

class ThrottlePipe extends Transform {
  constructor ({ throttle }) {
    super()
    this.throttle = throttle //ограничение скорости в кб
    this.timeshtamp = 0 //время задержки перед отправкой следующего cb
    this.count = 0 //заполненная память
  }
  _transform (chunk, encoding, callback) {
    const timeout = this.check() //проверка времени на необходимость отправки cb
    // устанавливаем задержку перед вызовом следующего cb
    setTimeout(() => {
      this.push(chunk)
      callback()
      this.update(chunk.length)
    }, timeout)
  }
  check () {
    //количество миллисекунд, прошедших с 1 января 1970 года
    const diff = Date.now() - this.timeshtamp
    //если задержка больше минуты => устанавливаем её в 0
    if (diff > 1000) {
      return 0
    }
    //this.throttle * 1024 => переводим кб в б
    //если заполненная память < переданная скорость => очищаем её
    if (this.count < this.throttle * 1024) {
      return 0
    }
    //иначе возвращаем время задержки < секунды
    return 1000 - diff
  }
  update (size) {
    this.count += size //общее заполнение памяти
    //если время задержки перед отправкой следующего cd больше секунды
    if (Date.now() - this.timeshtamp > 1000) {
      //обнуляем память
      this.count = 0
      //устанавливаем время задержки заново
      this.timeshtamp = Date.now()
    }
  }
}

const throttlePipe = new ThrottlePipe({ throttle: 1000 })

require('fs')
  .createReadStream('copyMe')
  .pipe(throttlePipe)
  .pipe(require('fs').createWriteStream('copyHere'))
