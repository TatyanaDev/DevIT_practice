const { testData, testData2 } = require('./data')

// #14
// Создать функцию которая создает объект на основании двух представленных массивов используя один как ключи, а другой как значения. Не подходящие ключи массивов должны быть исключены.

const array_combine = (keysArrey, valuesArrey) => {
  const result = {}
  const filterKeysArrey = keysArrey.filter(
    key => typeof key === 'string' || typeof key === 'number'
  )
  for (let i = 0; i < filterKeysArrey.length; i++) {
    result[filterKeysArrey[i]] = valuesArrey[i]
  }
  return result
}

// array_combine(testData,testData2) // {1: 1, 2: 2, 24: 24, 85: 85, 1990: 1990, Vasya: 5, colya@example.com: 7, Rafshan: 8.1, ashan@example.com: undefined}
