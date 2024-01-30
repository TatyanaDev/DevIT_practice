const array_normalize = require("../../JS/task_14");

module.exports = function normalize(arr, schema, transform = false) {
  return this.make(array_normalize(arr, schema, transform));
};
