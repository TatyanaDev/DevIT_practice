const Collection = require('./Collection')
const { testData4 } = require('./../js/data')

// #8
// С помощью коллекции преобразовать данные testData4 в следующий вид
// ["Rafshan", "Misha", "Vasya", "Dima", "Colya", "Ashan"]

Collection.make(testData4)
  .filter(v => typeof v === 'object' && !Array.isArray(v))
  .map(v => v.name)

//Collection {arr: [ 'Vasya', 'Dima', 'Colya', 'Misha', 'Ashan', 'Rafshan' ]}
