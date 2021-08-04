const { testData4 } = require('./data')

// #11
// Сделать функцию для проверки существования значения в не нормализированном списке данных.

const array_contains = (arr, search) => {
  if (!arr || !search) {
    return null
  }

  if (typeof search === 'string') {
    search = new RegExp(`^${search}$`)
  }

  arr = arr.flat(Infinity)

  return arr.filter(el => {
    if (typeof el === 'object') {
      return Object.values(el).filter(val => {
        return search.test(val)
      }).length
    }

    return search.test(el)
  }).length
    ? true
    : false
}

// array_contains(testData4,/^raf.*/i) // true
// array_contains(testData4,/^azaza.*/i) // false
