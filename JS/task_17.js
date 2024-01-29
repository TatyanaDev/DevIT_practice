/*17. Сделать функцию, которая создает массив указанной длинны и заполняет его переданными значениями.*/

const array_fill = (arrayLength, values) => {
  array = [];

  array.length = arrayLength;

  return array.fill(values);
};

console.log(array_fill(5, "string"));

module.exports = array_fill;
