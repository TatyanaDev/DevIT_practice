module.exports = function skipUntil(arr, value) {
  const searchTruncated = arr.indexOf(value);

  return this.make(arr.slice(searchTruncated));
};
