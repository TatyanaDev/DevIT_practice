const array_chunk = require("../../js/task9");

module.exports = function chunk(arr, count) {
  return array_chunk(arr, count).map((v) => this.make(v));
};
