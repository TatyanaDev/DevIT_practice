module.exports = function filter(arr, callback) {
  return this.make(arr.filter(callback));
};
