const { testData, testData2 } = require('./data')

// #17
// Сделать функцию которая возвращает уникальные элементы массива.

const array_unique = arrey => [...new Set(arrey)]

// array_unique(testData.concat(testData2))
// (14) [1, 2, 1990, 85, 24, "Vasya", "colya@example.com", "Rafshan", "ashan@example.com", true, false, 5, 7, 8.1]
