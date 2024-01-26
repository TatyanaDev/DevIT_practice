module.exports = function find(arr, search) {
  if (!arr || !search) {
    return null;
  }

  if (typeof search === "string") {
    search = new RegExp(`^${search}$`);
  }

  const filtered = arr.filter((el) => search.test(el));

  return this.make(filtered.length ? filtered : null);
};
