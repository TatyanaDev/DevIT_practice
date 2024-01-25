const { testData } = require('./data')

// #10
// Сделать функцию которая обрезает массив до указанного значения.

const array_skip_until = (arrey, info) => {
  const searchTruncated = arrey.indexOf(info)
  return arrey.slice(searchTruncated)
}

// array_skip_until(testData, 2) // [2, 1990, 85, 24, "Vasya", "colya@example.com", "Rafshan", "ashan@example.com", true, false]
// array_skip_until(testData, "Rafshan") // ["Rafshan", "ashan@example.com", true, false]
// array_skip_until(testData, "asd") // []
