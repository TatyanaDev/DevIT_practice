const Collection = require('./Collection')
const Pagination = require('./Pagination')

Collection.paginate = function (arr, limit) {
  return Pagination.make(Collection.make(arr), limit)
}

Collection.prototype.paginate = function (limit) {
  return Collection.paginate(this.arr, limit)
}

Pagination.prototype.page = function (page) {
  return Collection.make(this._pages[page - 1])
}

module.exports = { Collection, Pagination }
