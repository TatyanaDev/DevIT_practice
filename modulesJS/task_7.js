const array_chunk = require("../JS/task_9");

// #7 Вывести в консоль по 4 значения из переданного массива с интервалом в 2 секунды.

const arr = [1, 2, 3, 4, 5, 6, 7, 8, "Vasya", "|", "123", 9, 10, 11, 12, 13, 14, 15];

const subArrays = array_chunk(arr, 4);

subArrays.forEach((el, i) => setTimeout(() => console.log(el), (i + 1) * 2000));
