const { testData3 } = require('./data')

/*15. Сделать функцию, которая сможет делать срез данных с ассоциативного массива.*/

const array_pluck = (arr, key) => {
  const keys = key.split(".");

  return arr.map((obj) => {
    let current = obj;

    for (const k of keys) {
      current = current && current[k];

      if (current === undefined) {
        break;
      }
    }

    return current;
  });
};

console.log(array_pluck(testData3, "name"));
console.log(array_pluck(testData3, "skills.php"));

module.exports = array_pluck;
