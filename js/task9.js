const { testData2 } = require('./data')

// #9
// Сделать функцию которая разбивает массив на подмассивы указанной длинны.

const array_chunk = (arr, count) => {
  let subarray = []
  for (let i = 0; i < arr.length / count; i++) {
    subarray[i] = arr.slice(i * count, i * count + count)
  }
  return subarray
}

// array_chunk(testData2, 2) // [[1, 2], [1990, 85], [24, 5], [7, 8.1]]
module.exports = array_chunk