const { testData4 } = require("./data");

/*12. Сделать функцию для получения данных с массивов по указанному пути.*/

const array_get = (arr, path) => {
  path = path.replace(/\[(\w+)\]/g, ".$1");
  path = path.replace(/^\./, "");

  const paths = path.split(".");

  for (let i = 0; i < paths.length; i++) {
    const key = paths[i];

    if (!(key in arr)) {
      return;
    }

    arr = arr[key];
  }

  return arr;
};

console.log(array_get(testData4, "[5].name"));
console.log(array_get(testData4, "[17][0][0][0][11][0]"));
console.log(array_get(testData4, "[17][0][0][0][11][0][name]"));

module.exports = array_get;
