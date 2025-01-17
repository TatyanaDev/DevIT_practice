const { Collection } = require("./task_1-6");
const { testData4 } = require("../JS/data");

// #8 С помощью коллекции преобразовать данные testData4 в следующий вид ["Rafshan", "Misha", "Vasya", "Dima", "Colya", "Ashan"]

console.log(
  Collection.make(testData4)
    .filter((item) => typeof item === "object" && !Array.isArray(item))
    .map(({ name }) => name)
    .values()
);
