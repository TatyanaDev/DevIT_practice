const { testData, testData2 } = require("./data");

/*13. Создать функцию, которая создает объект на основании двух представленных массивов используя один как ключи, а другой как значения. Не подходящие ключи массивов должны быть исключены.*/

const array_combine = (arrayOfKeys, arrayOfValues) => {
  const result = {};

  const filteredArrayOfKeys = arrayOfKeys.filter((key) => typeof key === "string" || typeof key === "number");

  for (let i = 0; i < filteredArrayOfKeys.length; i++) {
    result[filteredArrayOfKeys[i]] = arrayOfValues[i];
  }

  return result;
};

console.log(array_combine(testData,testData2))
