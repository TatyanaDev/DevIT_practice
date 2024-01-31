const { make } = require("./paginationMethods");

const Pagination = function () {
  this.collection;

  Object.defineProperty(this, "limit", {
    get: () => this._limit,
    set: (limit) => {
      this._limit = limit;
      this._pages = this.collection.chunk(limit);
      this._count = this._pages.length;
    },
  });

  Object.defineProperty(this, "cursor", {
    get: () => this._cursor,
    set: () => null,
  });
};

Pagination.make = make;

Pagination.prototype = {
  constructor: Pagination,

  paginate: function (limit) {
    this.limit = limit;
    return this;
  },

  count: function () {
    return this._count;
  },

  current: function () {
    return this._pages[this._cursor - 1];
  },

  next: function () {
    if (this.cursor < this._count) {
      this._cursor = this.cursor + 1;
    }

    return this._pages[this._cursor - 1];
  },

  prev: function () {
    if (this._cursor > 1) {
      this._cursor = this.cursor - 1;
    }

    return this._pages[this._cursor - 1];
  },

  first: function () {
    return this._pages[0];
  },

  last: function () {
    return this._pages[this._count - 1];
  },

  reset: function () {
    this._cursor = 1;
  },
};

module.exports = Pagination;
