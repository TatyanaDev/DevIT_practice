module.exports = function sanitize(collection, callback) {
  collection.arr = collection.arr.filter(callback);

  return collection;
};
