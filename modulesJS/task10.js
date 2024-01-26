const { Collection, Pagination } = require('./task6')

const toPagination = function (data, limit) {
  const data = [...arguments]
  const limit = arguments[arguments.length - 1]
  const copy = data.slice(0)
  copy.pop()
  const firstValue = copy[0]

  if (Array.isArray(firstValue)) {
    return Pagination.make(Collection.make(firstValue), limit)
  } else if (firstValue instanceof Collection) {
    return Pagination.make(firstValue, limit)
  } else return Pagination.make(Collection.make(copy), limit)
}
