module.exports = function sort(arr, compareFunction) {
  if (typeof compareFunction === "function") {
    arr.sort(compareFunction);
    return this.make(arr);
  } else if (arr.some((item) => typeof item === "object" && item !== null)) {
    const firstObjectKeys = Object.keys(...arr)[0];

    arr.sort((a, b) => a[firstObjectKeys] - b[firstObjectKeys]);
    return this.make(arr);
  } else {
    arr.sort((a, b) => a - b);
    return this.make(arr);
  }
};
