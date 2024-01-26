module.exports = function sort(arr, compareFunction = false) {
  const copy = arr.slice(0);

  if (compareFunction) {
    copy.sort(compareFunction);
    return this.make(copy);
  } else if (copy.some((v) => typeof v === "object")) {
    copy.sort((a, b) => a.age - b.age);
    return this.make(copy);
  } else {
    copy.sort((a, b) => a - b);
    return this.make(copy);
  }
};
