const { Collection, Pagination } = require("./task_1-6");

// #10 Сделать функцию, которая будет возвращать объект прототипа Pagination при любых переданных ему данных

const toPagination = (data, limit) => {
  let collection;

  if (data instanceof Collection) {
    collection = data;
  } else {
    let dataArray = Array.isArray(data) ? data : [data];

    collection = new Collection(dataArray);
  }

  return new Pagination(collection, limit);
};

console.log(toPagination([1, 2], 1).first().toJSON());
console.log(
  toPagination(Collection.make([1, 2]), 1)
    .first()
    .toJSON()
);
console.log(toPagination(false, 1).first().toJSON());
console.log(
  toPagination(Collection.make([false, true, 1, 2]), 4)
    .first()
    .toJSON()
);
