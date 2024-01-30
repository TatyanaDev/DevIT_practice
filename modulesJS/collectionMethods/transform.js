module.exports = function transform(collection, callback) {
  collection.arr = collection.arr.map(callback);

  return collection;
};
