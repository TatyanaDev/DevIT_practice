const { testData, testData2 } = require('./data')

// #8
// Сделать функцию подсчета среднего значения, с возможностью исключения не числовых значений

const avg = (arr, skipNaN = false) => {
  let arrNum = []
  if (skipNaN) {
    arr.filter(val => {
      if (typeof val === 'number') {
        arrNum.push(val)
      }
    })
    const avg =
      Math.round(arrNum.reduce((acc, value) => acc + value / arr.length)) - 1
    return avg
  } else {
    arr.filter(val => {
      if (typeof val === 'number') {
        arrNum.push(val)
      }
    })
    const avg =
      Math.round(arrNum.reduce((acc, value) => acc + value / arrNum.length)) - 1
    return avg
  }
}

// array_avg(testData2) // ~265
// array_avg(testData) // ~420
// array_avg(testData, true) // ~191
