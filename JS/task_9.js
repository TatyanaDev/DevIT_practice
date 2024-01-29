const { testData2 } = require("./data");

/*9. Сделать функцию, которая разбивает массив на подмассивы указанной длинны.*/

const array_chunk = (arr, count) => {
  const subArray = [];

  for (let i = 0; i < arr.length / count; i++) {
    subArray[i] = arr.slice(i * count, i * count + count);
  }

  return subArray;
};

console.log(array_chunk(testData2, 2));

module.exports = array_chunk;
