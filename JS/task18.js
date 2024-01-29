// #18
// Сделать функцию которая создает массив указанной длинны и заполняет его переданными значениями.

const array_fill = (lenghtArrey, values) => {
  array = []
  array.length = lenghtArrey
  return array.fill(values)
}

// array_fill(5, 'string') // ['string', 'string', 'string', 'string', 'string']
