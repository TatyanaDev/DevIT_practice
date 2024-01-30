const { testData4 } = require("./data");

/*11. Сделать функцию для проверки существования значения в не нормализированном списке данных.*/

const array_contains = (arr, search) => {
  if (!arr || !search) {
    return null;
  }

  let searchPattern = search;

  if (typeof search === "string") {
    searchPattern = new RegExp(`^${search}$`);
  }

  const containsElement = arr.flat(Infinity).some((el) => {
    if (typeof el === "object" && el !== null) {
      return Object.values(el).some((val) => searchPattern.test(String(val)));
    }

    return searchPattern.test(String(el));
  });

  return containsElement;
};

console.log(array_contains(testData4, /^raf.*/i));
console.log(array_contains(testData4, /^azaza.*/i));

module.exports = array_contains;
