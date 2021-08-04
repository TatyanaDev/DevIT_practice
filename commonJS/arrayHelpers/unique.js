module.exports = function unique (arr) {
  return this.make([...new Set(arr)])
}
