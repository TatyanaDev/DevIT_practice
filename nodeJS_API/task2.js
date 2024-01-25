'use strict'
// Написать свой файловый стрим на чтение с возможностью
// указания ограничения скорости чтения в КВ(килобайтах)
// Пример использования:
// const readable = createReadableStreamWithThrottle('./data/test.tar', {throttle: 1000})
// const writeable = createWriteStream('./data/test.tar.copy');
// readable.pipe(writeable);

const { Readable } = require('stream')
const { Buffer } = require('buffer')
const fs = require('fs')
const { createWriteStream } = require('fs')

const kIsPerformingIO = Symbol('kIsPerformingIO')
const kFs = Symbol('kFs')

class MyReadable extends Readable {
  constructor (path, { throttle }) {
    super()
    this[kFs] = fs //file system (ссылка)
    this.fd = undefined //файловый дискриптор
    this.path = path //задаваемый путь к файлу
    this.flags = 'r' //открыть файл для чтения если он существует
    this.mode = 0o666 //права доступа к файлу на чтение и запись
    this.start = 0 //стартовая позиция считывания
    this.end = Infinity // конечная позиция считывания
    this.pos = 0 //кол-во заполненных данных
    this.bytesRead = 0 //кол-во считанных байтов

    this.throttle = throttle //ограничение скорости в кб
    this.timeshtamp = 0 //время задержки перед отправкой следующего cb
    this.count = 0 //заполненная память

    this[kIsPerformingIO] = true //переводим стрим в состояние flowing (поступление данных)

    Readable.call(this, {})
    //открыть(по заданному пути, окрыть файл для чтения, с правами на чтение и запись)
    this[kFs].open(this.path, this.flags, this.mode, (er, fd) => {
      if (er) {
        throw er
      }
      //установить полученный дискриптор в this
      this.fd = fd
      //сгенерировать событие открытия по дискриптору
      this.emit('open', fd)
      //подготовка
      this.emit('ready')
      //извлечь некоторые данные из внутреннего буфера и возвратить
      this.read()
    })
  }

  _read (n) {
    //если нет дискриптора
    if (typeof this.fd !== 'number') {
      //один раз, дождаться ответа
      return this.once('open', function () {
        this._read(n)
      })
    }

    const timeout = this.check() //проверка времени на необходимость отправки cb

    //размер данных на считывание
    n =
      this.pos !== undefined //если есть заполненные данные
        ? //бесконечность + 1 или 16384(максимальный размер буфера) => 16384
          Math.min(this.end - this.pos + 1, n)
        : //бесконечность + 1 или кол-во прочитанных байтов => кол-во прочитанных байтов
          Math.min(this.end - this.bytesRead + 1, n)
    //если читать нечего push(null) и выход
    if (n <= 0) {
      this.push(null)
      return
    }
    // устанавливаем задержку перед вызовом следующего cb
    if (timeout > 0) {
      setTimeout(() => {
        this._read(n)
      }, timeout)
      return
    }

    //создаем новый буфер с указанным размером
    const buf = Buffer.allocUnsafeSlow(n)
    this[kIsPerformingIO] = true //переводим стрим в состояние flowing (поступление данных)
    //считать по дискриптору, в текущий буфер данными от нуля до 16384, кол-во заполненных байт
    this[kFs].read(this.fd, buf, 0, n, this.pos, (er, bytesRead, buf) => {
      if (er) {
        throw er
      }
      this[kIsPerformingIO] = false //ставим поток на paused
      //если есть считанные данные и заполненные данные => обновить заполненные данные (кол-во заполненных байт)
      if (bytesRead > 0) {
        if (this.pos !== undefined) {
          this.pos += bytesRead
        }
        //обновить кол-во прочитанных байт
        this.bytesRead += bytesRead
        //если кол-во прочитанных байт не равно размеру текущего буфера
        if (bytesRead !== buf.length) {
          //создаем буфер равный количеству прочитанных байт
          const dst = Buffer.allocUnsafeSlow(bytesRead)
          //в текущий буфер копируем оставшиеся байты с нулевой позиции, копируем с нулевой позиции все прочитанные байты
          buf.copy(dst, 0, 0, bytesRead)
          //присваиваем это все добро в текущий буфер
          buf = dst
        }
        //и отправляем
        this.push(buf)
        //обновляем размер буфера
        this.update(buf.length)
      } else {
        this.push(null)
      }
    })
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

function createReadableStreamWithThrottle (path, throttle) {
  const stream = new MyReadable(path, throttle)
  return stream
}

const readable = createReadableStreamWithThrottle('./data/text.txt', {
  throttle: 1000
})

const writeable = createWriteStream('./data/testCopy.txt')

readable.pipe(writeable)
