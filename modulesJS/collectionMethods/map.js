module.exports = function map(arr, callback) {
  return this.make(arr.map(callback));
};
