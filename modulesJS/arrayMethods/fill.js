module.exports = function fill(lenght, value) {
  array = [];
  array.length = lenght;
  return this.make(array.fill(value));
};
