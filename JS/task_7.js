/*7. Сделать функцию поиска значений в массиве.*/

const { testData } = require("./data");

const array_find = (arr, search) => {
  let result;

  if (typeof search === "string") {
    result = arr.filter((item) => item === search);
  } else if (search instanceof RegExp) {
    result = arr.filter((item) => search.test(item.toString()));
  } else {
    return null;
  }

  return result.length > 0 ? result : null;
};

console.log(array_find(testData, /^raf.*/i));
console.log(array_find(testData, "Rafshan"));

module.exports = array_find;
