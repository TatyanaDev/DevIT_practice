module.exports = function sortDesc (arr, compareFunction = false) {
  const copy = arr.slice(0)
  if (compareFunction) {
    copy.sort(compareFunction)
    return this.make(copy)
  } else if (copy.some(v => typeof v === 'object')) {
    copy.sort((a, b) => b.age - a.age)
    return this.make(copy)
  } else {
    copy.sort((a, b) => b - a)
    return this.make(copy)
  }
}
