const { testData } = require("./data");

/*10. Сделать функцию, которая обрезает массив до указанного значения.*/

const array_skip_until = (arr, value) => {
  const index = arr.indexOf(value);

  return index !== -1 ? arr.slice(index) : [];
};

console.log(array_skip_until(testData, 2));
console.log(array_skip_until(testData, "Rafshan"));
console.log(array_skip_until(testData, "asd"));

module.exports = array_skip_until;