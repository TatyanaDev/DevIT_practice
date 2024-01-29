const { testData } = require("./data");

/*8. Сделать функцию подсчета среднего значения с возможностью исключения не числовых значений.*/

const array_avg = (arr, skipNaN = false) => {
  const arrayOfNumbers = [];

  if (skipNaN) {
    arr.filter((val) => {
      if (typeof val === "number") {
        arrayOfNumbers.push(val);
      }
    });

    const avg = Math.round(arrayOfNumbers.reduce((acc, value) => acc + value / arr.length)) - 1;
    
    return avg;
  } else {
    arr.filter((val) => {
      if (typeof val === "number") {
        arrayOfNumbers.push(val);
      }
    });

    const avg = Math.round(arrayOfNumbers.reduce((acc, value) => acc + value / arrayOfNumbers.length)) - 1;
    
    return avg;
  }
};

console.log(array_avg(testData));
console.log(array_avg(testData, true));

module.exports = array_avg;
