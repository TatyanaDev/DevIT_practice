const { testData4 } = require('./data')

// #15
// Создать функцию которая нормализует данные в массиве исключая или преобразуя не подходящие.

const helperAge = arr =>
  arr
    .filter(v => typeof v === 'object' && !Array.isArray(v))
    .map(obj => ({ age: obj.age }))

const helperFloat = arr =>
  arr.filter(v => typeof v === 'number' && !Number.isInteger(v))

const helperNumber = arr => arr.filter(v => typeof v === 'number')

const array_normalize = (arr, shema, transform = false) => {
  if (typeof shema === 'object') {
    const helpersShema = String(Object.values(shema))
    switch (helpersShema) {
      case transform && 'float':
        return helperAge(arr)
      case 'float':
        return helperFloat(arr)
      case (transform && 'int') || 'int':
        return helperAge(arr)
      default:
        return arr
    }
  } else {
    switch (shema) {
      case transform && 'string':
        return arr
          .filter(v => typeof v !== 'object' && typeof v !== 'boolean')
          .map(v => String(v))
      case 'string':
        return arr.filter(v => typeof v === 'string')
      case 'bool':
        return arr.filter(v => typeof v === 'boolean')
      case (transform && 'number') || 'number':
        return helperNumber(arr)
      case (transform && 'int') || 'int':
        return helperNumber(arr)
      case 'function':
        return arr.filter(v => typeof v === 'function')
      case transform && 'float':
        return helperNumber(arr)
      case 'float':
        return helperFloat(arr)
      case (transform && 'array') || 'array':
        return arr.filter(v => Array.isArray(v))
      default:
        return arr
    }
  }
}

// array_normalize(testData4,'string') // ["Vasya", "colya@example.com", "Rafshan", "ashan@example.com"]
// array_normalize(testData4,'string',true) // ["1", "2", "1990", "85", "24", "Vasya", "colya@example.com", "Rafshan", "ashan@example.com"]0: "1"1: "2"2: "1990"3: "85"4: "24"5: "Vasya"6: "colya@example.com"7: "Rafshan"8: "ashan@example.com"length: 9__proto__: Array(0)
// array_normalize(testData4,'number') // [1, 2, 1990, 85, 24]
// array_normalize(testData4,'number',true) // [1, 2, 1990, 85, 24]
// array_normalize(testData4,'int') // [1, 2, 1990, 85, 24]
// array_normalize(testData4,'int',true) // [1, 2, 1990, 85, 24]
// array_normalize(testData4,'float') // []
// array_normalize(testData4,'float',true) // [1, 2, 1990, 85, 24]
// array_normalize(testData4,'bool') // [true, false]
// array_normalize(testData4,'bool',true) // [true, false]
// array_normalize(testData4,'function') // []
// array_normalize(testData4,'function',true) // []
// array_normalize(testData4,'array') // [Array(1)]
// array_normalize(testData4,'array',true) // [Array(1)]
// array_normalize(testData4,{age:'float'}) // []
// array_normalize(testData4,{age:'float'},true) // [{age: 20},{age: 34},{age: 46},{age: 16},{age: 99},{age: 11}]
// array_normalize(testData4,{age:'int'}) // [{age: 20},{age: 34},{age: 46},{age: 16},{age: 99},{age: 11}]
// array_normalize(testData4,{age:'int'},true) // [{age: 20},{age: 34},{age: 46},{age: 16},{age: 99},{age: 11}]
