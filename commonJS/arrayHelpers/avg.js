module.exports = function avg (arr, skipNaN = false) {
  let arrNum = []
  if (skipNaN) {
    arr.filter(val => {
      if (typeof val === 'number') {
        arrNum.push(val)
      }
    })
    const avg =
      Math.round(arrNum.reduce((acc, value) => acc + value / arr.length)) - 1
    return avg
  } else {
    arr.filter(val => {
      if (typeof val === 'number') {
        arrNum.push(val)
      }
    })
    const avg =
      Math.round(arrNum.reduce((acc, value) => acc + value / arrNum.length)) - 1
    return avg
  }
}
