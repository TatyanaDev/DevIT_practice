const { testData } = require("./data");

/*8. Сделать функцию подсчета среднего значения с возможностью исключения не числовых значений.*/

const array_avg = (arr, skipNaN = false) => {
  const arrayOfNumbers = [];

  if (skipNaN) {
    arr.forEach((val) => {
      if (typeof val === "number") {
        arrayOfNumbers.push(val);
      }
    });

    const avg = Math.round(arrayOfNumbers.reduce((acc, value) => acc + value, 0) / arr.length);

    return avg;
  } else {
    arr.forEach((val) => {
      if (typeof val === "number") {
        arrayOfNumbers.push(val);
      }
    });

    const avg = Math.round(arrayOfNumbers.reduce((acc, value) => acc + value, 0) / arrayOfNumbers.length);

    return avg;
  }
};

console.log(array_avg(testData));
console.log(array_avg(testData, true));

module.exports = array_avg;
