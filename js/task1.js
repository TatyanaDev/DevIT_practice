// #1
// Напишите функцию, которая пишет в консоль число в заданном диапазоне, в случае, если оно успешно делится или не делится с остатком или без остатка в зависимости от параметров.

const range = (from, to, bool = false) => {
  const helper = () => Math.round(Math.random() * (to - from) + from)
  let intNum = helper()
  if (bool) {
    while (true) {
      let intNum = helper()
      if (intNum % 2 === 0) {
        return intNum
      }
    }
  } else {
    return intNum
  }
}

// range(2,6) // 2
// range(2,6) // 3
// range(2,6) // 5
// range(2,6) // 4
// range(2,6) // 4
// range(2,6) // 3
// range(2,6,true) // 2
// range(2,6,true) // 4
// range(2,6,true) // 6
// range(2,6,true) // 2
// range(2,6,true) // 4
// range(2,6,true) // 4
// range(2,6,true) // 2
