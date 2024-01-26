module.exports = function sortByDesc (arr, column, compareFunction = false) {
  const copy = arr.slice(0)
  if (compareFunction) {
    copy.sort(compareFunction)
    return this.make(copy)
  } else {
    copy.sort((a, b) => b[column] - a[column])
    return this.make(copy)
  }
}
