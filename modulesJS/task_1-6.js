const { normalize, skipUntil, contains, unique, chunk, pluck, find, fill, avg, get } = require("./arrayMethods");
const { map, filter, reduce, every, indexOf, toJSON, toQueryString, isEmpty } = require("./collectionMethods");

const Collection = function (arr = []) {
  this.arr = arr;

  Object.defineProperty(this, "length", {
    get: function () {
      return this.arr.length;
    },
  });
};

Collection.prototype = {
  map(callback) {
    return new Collection(map(this.arr, callback));
  },
  filter(callback) {
    return new Collection(filter(this.arr, callback));
  },
  reduce(callback, initial) {
    return new Collection(reduce(this.arr, callback, initial));
  },
  transform(callback) {
    this.arr = map(this.arr, callback);

    return this;
  },
  sanitize(callback) {
    this.arr = filter(this.arr, callback);

    return this;
  },
  every(callback) {
    return every(this.arr, callback);
  },
  indexOf(searchElement, fromIndex = 0) {
    return indexOf(this.arr, searchElement, fromIndex);
  },
  values() {
    return Array.from(this.arr);
  },
  toArray() {
    return [...this.arr];
  },
  toJSON() {
    return toJSON(this.arr);
  },
  toQueryString() {
    return toQueryString(this.arr);
  },
  toString() {
    return this.toJSON();
  },
  isEmpty() {
    return isEmpty(this.arr);
  },
  find(search) {
    return new Collection(find(this.arr, search));
  },
  avg(skipNaN = false) {
    return avg(this.arr, skipNaN);
  },
  chunk(count) {
    return new Collection(chunk(this.arr, count));
  },
  skipUntil(value) {
    return new Collection(skipUntil(this.arr, value));
  },
  contains(search) {
    return contains(this.arr, search);
  },
  get(path) {
    return get(this.arr, path);
  },
  normalize(schema, transform) {
    return new Collection(normalize(this.arr, schema, transform));
  },
  pluck(path) {
    return new Collection(pluck(this.arr, path));
  },
  unique() {
    return new Collection(unique(this.arr));
  },
  fill(length, value) {
    return new Collection(fill(length, value));
  },
  sort(compareFunction = (a, b) => a - b) {
    return new Collection(this.arr.sort(compareFunction));
  },
  sortDesc(compareFunction = (a, b) => b - a) {
    return new Collection(this.arr.sort(compareFunction));
  },
  sortBy(column, compareFunction = (a, b) => a[column] - b[column]) {
    return new Collection(this.arr.sort((a, b) => compareFunction(a, b)));
  },
  sortByDesc(column, compareFunction = (a, b) => b[column] - a[column]) {
    return new Collection(this.arr.sort((a, b) => compareFunction(a, b)));
  },
  paginate(limit) {
    return new Pagination(this, limit);
  },
};

Collection.make = (arr = []) => new Collection(arr);
Collection.map = (arr, callback) => new Collection(map(arr, callback));
Collection.filter = (arr, callback) => new Collection(filter(arr, callback));
Collection.reduce = (arr, callback, initial) => new Collection(reduce(arr, callback, initial));
Collection.every = every;
Collection.indexOf = indexOf;
Collection.toJSON = toJSON;
Collection.toQueryString = toQueryString;
Collection.isEmpty = isEmpty;

Collection.find = (arr, search) => new Collection(find(arr, search));
Collection.avg = avg;
Collection.chunk = (arr, count) => new Collection(chunk(arr, count));
Collection.skipUntil = (arr, value) => new Collection(skipUntil(arr, value));
Collection.contains = contains;
Collection.get = get;
Collection.normalize = (arr, schema, transform) => new Collection(normalize(arr, schema, transform));
Collection.pluck = (arr, path) => new Collection(pluck(arr, path));
Collection.unique = (arr) => new Collection(unique(arr));
Collection.fill = (length, value) => new Collection(fill(length, value));

Collection.sort = (arr, compareFunction = (a, b) => a - b) => new Collection(arr.sort(compareFunction));
Collection.sortDesc = (arr, compareFunction = (a, b) => b - a) => new Collection(arr.sort(compareFunction));
Collection.sortBy = (arr, column, compareFunction = (a, b) => a[column] - b[column]) => new Collection(arr.sort((a, b) => compareFunction(a, b)));
Collection.sortByDesc = (arr, column, compareFunction = (a, b) => a[column] - b[column]) => new Collection(arr.sort((a, b) => compareFunction(a, b)).reverse()); // проверить надо ли reverse()

Collection.paginate = (arr, limit) => new Pagination(new Collection(arr), limit);

const Pagination = function (collection, limit = 10) {
  this.collection = collection;
  this.limit = limit;
  this.currentPage = 1;
};

Pagination.prototype = {
  page(page) {
    const startIndex = (page - 1) * this.limit;
    const endIndex = startIndex + this.limit;
    const pageItems = this.collection.arr.slice(startIndex, endIndex);

    return new Collection(pageItems);
  },
  paginate(limit) {
    this.limit = limit;

    return this;
  },
  count() {
    return Math.ceil(this.collection.arr.length / this.limit);
  },
  getPageItems(page) {
    const startIndex = (page - 1) * this.limit;
    const endIndex = startIndex + this.limit;

    return this.collection.arr.slice(startIndex, endIndex);
  },
  current() {
    return new Collection(this.getPageItems(this.currentPage));
  },
  next() {
    if (this.currentPage + 1 <= this.count()) {
      this.currentPage += 1;
    }

    return new Collection(this.getPageItems(this.currentPage));
  },
  prev() {
    if (this.currentPage - 1 >= 1) {
      this.currentPage -= 1;
    }

    return new Collection(this.getPageItems(this.currentPage));
  },
  first() {
    this.currentPage = 1;

    return new Collection(this.getPageItems(this.currentPage));
  },
  last() {
    this.currentPage = this.count();

    return new Collection(this.getPageItems(this.currentPage));
  },
  reset() {
    this.currentPage = 1;
  },
  get cursor() {
    return (this.currentPage - 1) * this.limit + 1;
  },
};

Pagination.make = (collection, limit) => new Pagination(collection, limit);

module.exports = { Collection, Pagination };
