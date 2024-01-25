const { testData4 } = require('./data')

// #12
// Сделать функцию для получения данных с массивов по указанному пути.

const array_get = (arr, path) => {
  path = path.replace(/\[(\w+)\]/g, '.$1')
  path = path.replace(/^\./, '')

  const keys = path.split('.')

  for (var i = 0; i < keys.length; i++) {
    const key = keys[i]
    if (!(key in arr)) return
    arr = arr[key]
  }
  return arr
}

// array_get(testData4,'[5].name') // "Rafshan"
// array_get(testData4,'[17][0][0][0][11][0]') // {name: "Rafshan", email: "rafshan@example.com", age: 11}
// array_get(testData4,'[17][0][0][0][11][0][name]') // "Rafshan"
