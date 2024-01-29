const { testData, testData2 } = require("./data");

/*16. Сделать функцию, которая возвращает уникальные элементы массива.*/

const array_unique = (arr) => [...new Set(arr)];

console.log(array_unique(testData.concat(testData2)));

module.exports = array_unique;
