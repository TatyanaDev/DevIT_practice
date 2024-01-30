module.exports = function sortBy(arr, column, compareFunction) {
  if (typeof compareFunction === "function") {
    arr.sort(compareFunction);
    return this.make(arr);
  } else {
    arr.sort((a, b) => a[column] - b[column]);
    return this.make(arr);
  }
};
