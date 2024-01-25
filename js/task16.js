const { testData3 } = require('./data')

// #16
// Сделать функцию которая сможет делать срез данных с ассоциативного массива.

const array_pluck = (arr, path) => {
  const pathSplit = path.split('.')
  return arr.map(item => {
    let sliceData = item
    for (const data of pathSplit) {
      sliceData = sliceData[data]
    }
    return sliceData
  })
}

// array_pluck(testData3, 'name') // (6) ["Vasya", "Dima", "Colya", "Misha", "Ashan", "Rafshan"]
// array_pluck(testData3, 'skills.php') // (6) [0, 5, 8, 6, 0, 0]
