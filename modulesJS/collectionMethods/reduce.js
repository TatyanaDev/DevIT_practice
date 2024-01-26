module.exports = function reduce(arr, callback, initial = 0) {
  return this.make(arr.reduce(callback, initial));
};
