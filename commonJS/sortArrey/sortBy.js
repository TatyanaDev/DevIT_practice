module.exports = function sortBy (arr, column, compareFunction = false) {
  const copy = arr.slice(0)
  if (compareFunction) {
    copy.sort(compareFunction)
    return this.make(copy)
  } else {
    copy.sort((a, b) => a[column] - b[column])
    return this.make(copy)
  }
}
