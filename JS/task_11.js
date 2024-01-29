const { testData4 } = require("./data");

/*11. Сделать функцию для проверки существования значения в не нормализированном списке данных.*/

const array_contains = (arr, search) => {
  if (!arr || !search) {
    return null;
  }

  if (typeof search === "string") {
    search = new RegExp(`^${search}$`);
  }

  arr = arr.flat(Infinity);

  return Boolean(
    arr.filter((el) => {
      if (typeof el === "object") {
        return Object.values(el).filter((val) => search.test(val)).length;
      }

      return search.test(el);
    }).length
  );
};

console.log(array_contains(testData4,/^raf.*/i))
console.log(array_contains(testData4,/^azaza.*/i))

module.exports = array_contains;
