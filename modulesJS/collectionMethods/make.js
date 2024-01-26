module.exports = function make (arr = []) {
  const collection = new this()
  collection.arr = arr
  return collection
}
