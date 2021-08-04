module.exports = function make (collection, limit) {
  const pagination = new this()
  pagination.collection = collection
  pagination.limit = limit
  pagination._cursor = 1
  return pagination
}
