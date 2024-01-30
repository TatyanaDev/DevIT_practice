module.exports = function sortByDesc(arr, column, compareFunction) {
  if (typeof compareFunction === "function") {
    arr.sort(compareFunction);
    return this.make(arr);
  } else {
    arr.sort((a, b) => b[column] - a[column]);
    return this.make(arr);
  }
};
