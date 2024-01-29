const { testData } = require('./data')

// #7
// Сделать функцию поиска значений в массиве.

const array_find = (arr, search) => {
  if (!arr || !search) {
    return null
  }

  if (typeof search === 'string') {
    search = new RegExp(`^${search}$`)
  }

  const filtered = arr.filter(el => {
    return search.test(el)
  })

  return filtered.length ? filtered : null
}

// array_find(testData,/^raf.*/i) // ["Rafshan"]
// array_find(testData,'Rafshan') // ["Rafshan"]
// array_find(testData,/^1Vas./i) // null
// array_find(testData,'1990') // [1990]
