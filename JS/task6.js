// #6
// Написать функцию для выполнения параллельных вычислений без использования Promise

const a = function (one, two) {
  return one + two
}

const b = function () {
  return false
}

const paralell = (functionOne, functionTwo) => {
  const res = []
  functionOne.forEach(([func, thisArgs = []]) => {
    setTimeout(() => res.push(func(...thisArgs)), 0)
  })
  setTimeout(functionTwo, 0, res)
}

/* paralell([[a, [5, 6]], [b]], function (results) {
    console.log(results);
  }); // (2) [11, false]
  */
