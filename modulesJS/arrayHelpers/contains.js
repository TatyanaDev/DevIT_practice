module.exports = function contains (arr, search) {
  if (!arr || !search) {
    return null
  }

  if (typeof search === 'string') {
    search = new RegExp(`^${search}$`)
  }

  arr = arr.flat(Infinity)

  return arr.filter(el => {
    if (typeof el === 'object') {
      return Object.values(el).filter(val => {
        return search.test(val)
      }).length
    }

    return search.test(el)
  }).length
    ? true
    : false
}
