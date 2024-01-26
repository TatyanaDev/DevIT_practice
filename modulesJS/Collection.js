const {
  every,
  filter,
  indexOf,
  isEmpty,
  make,
  map,
  reduce,
  toJSON,
  toQweryString
} = require('./collectionMethods')

const {
  avg,
  chunk,
  contains,
  fill,
  find,
  get,
  normalize,
  pluck,
  skipUntil,
  unique
} = require('./ArreyHelpers')

const { sort, sortBy, sortByDesc, sortDesc } = require('./sortArrey')

const Collection = function () {
  this.arr = []
  Object.defineProperty(this, 'length', {
    get: () => this.arr.length,
    set: () => null
  })
}

Collection.make = make
Collection.map = map
Collection.filter = filter
Collection.reduce = reduce
Collection.every = every
Collection.indexOf = indexOf
Collection.toJSON = toJSON
Collection.toQweryString = toQweryString
Collection.isEmpty = isEmpty

Collection.find = find
Collection.avg = avg
Collection.chunk = chunk
Collection.skipUntil = skipUntil
Collection.contains = contains
Collection.get = get
Collection.normalize = normalize
Collection.pluck = pluck
Collection.unique = unique
Collection.fill = fill

Collection.sort = sort
Collection.sortDesc = sortDesc
Collection.sortBy = sortBy
Collection.sortByDesc = sortByDesc

Collection.prototype = {
  constructor: Collection,
  map: function map (callback) {
    return Collection.map(this.arr, callback)
  },
  filter: function (callback) {
    return Collection.filter(this.arr, callback)
  },
  reduce: function (callback, initial = 0) {
    return Collection.reduce(this.arr, callback, initial)
  },
  transform: function (callback) {
    return (this.arr = this.arr.map(callback)), this
  },
  sanitize: function (callback) {
    return (this.arr = this.arr.filter(callback)), this
  },
  every: function (callback) {
    every(this.arr, callback)
  },
  indexOf: function (searchElement, fromIndex = 0) {
    return indexOf(this.arr, searchElement, fromIndex)
  },
  toArray: function () {
    return this.arr
  },
  toJSON: function () {
    return toJSON(this.arr)
  },
  toQweryString: function () {
    return toQweryString(this.arr)
  },
  toString: function () {
    return this.arr.toString()
  },
  isEmpty: function () {
    return isEmpty(this.arr)
  },
  find: function (search) {
    return Collection.find(this.arr, search)
  },
  avg: function (skipNaN = false) {
    return Collection.avg(this.arr, skipNaN)
  },
  chunk: function (count) {
    return Collection.chunk(this.arr, count)
  },
  skipUntil: function (value) {
    return Collection.skipUntil(this.arr, value)
  },
  contains: function (search) {
    return Collection.contains(this.arr, search)
  },
  get: function (path) {
    return Collection.get(this.arr, path)
  },
  normalize: function (shema, transform = false) {
    return Collection.normalize(this.arr, shema, transform)
  },
  pluck: function (path) {
    return Collection.pluck(this.arr, path)
  },
  unique: function () {
    return Collection.unique(this.arr)
  },
  fill: function (length, value) {
    return Collection.fill(length, value)
  },
  values: function () {
    return this.arr
  },
  sort: function (compareFunction = false) {
    return Collection.sort(this.arr, compareFunction)
  },
  sortDesc: function (compareFunction = false) {
    return Collection.sortDesc(this.arr, compareFunction)
  },
  sortBy: function (compareFunction = false) {
    return Collection.sortBy(this.arr, compareFunction)
  },
  sortByDesc: function (compareFunction = false) {
    return Collection.sortByDesc(this.arr, compareFunction)
  }
}

module.exports = Collection
