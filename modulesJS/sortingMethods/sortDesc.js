module.exports = function sortDesc(arr, compareFunction) {
  if (typeof compareFunction === "function") {
    arr.sort(compareFunction);
    return this.make(arr);
  } else if (arr.some((item) => typeof item === "object" && item !== null)) {
    const firstObjectKeys = Object.keys(...arr)[0];

    arr.sort((a, b) => b[firstObjectKeys] - a[firstObjectKeys]);
    return this.make(arr);
  } else {
    arr.sort((a, b) => b - a);
    return this.make(arr);
  }
};
