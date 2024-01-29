const { testData4 } = require("./data");

/*14. Создать функцию, которая нормализует данные в массиве исключая или преобразуя не подходящие.*/

const ageHelper = (arr) => arr.filter((value) => typeof value === "object" && !Array.isArray(value)).map(({ age }) => ({ age }));

const floatHelper = (arr) => arr.filter((value) => typeof value === "number" && !Number.isInteger(value));

const numberHelper = (arr) => arr.filter((value) => typeof value === "number");

const array_normalize = (arr, schema, transform = false) => {
  if (typeof schema === "object") {
    switch (String(Object.values(schema))) {
      case transform && "float":
        return ageHelper(arr);
      case "float":
        return floatHelper(arr);
      case transform && "int":
      case "int":
        return ageHelper(arr);
      default:
        return arr;
    }
  } else {
    switch (schema) {
      case transform && "string":
        return arr.filter((value) => typeof value !== "object" && typeof value !== "boolean").map((value) => String(value));
      case "string":
        return arr.filter((value) => typeof value === "string");
      case "bool":
        return arr.filter((value) => typeof value === "boolean");
      case transform && "number":
      case "number":
        return numberHelper(arr);
      case transform && "int":
      case "int":
        return numberHelper(arr);
      case "function":
        return arr.filter((value) => typeof value === "function");
      case transform && "float":
        return numberHelper(arr);
      case "float":
        return floatHelper(arr);
      case transform && "array":
      case "array":
        return arr.filter((value) => Array.isArray(value));
      default:
        return arr;
    }
  }
};

console.log(array_normalize(testData4, "string"));
console.log(array_normalize(testData4, "string", true));
console.log(array_normalize(testData4, "number"));
console.log(array_normalize(testData4, "number", true));
console.log(array_normalize(testData4, "int"));
console.log(array_normalize(testData4, "int", true));
console.log(array_normalize(testData4, "float"));
console.log(array_normalize(testData4, "float", true));
console.log(array_normalize(testData4, "bool"));
console.log(array_normalize(testData4, "bool", true));
console.log(array_normalize(testData4, "function"));
console.log(array_normalize(testData4, "function", true));
console.log(array_normalize(testData4, "array"));
console.log(array_normalize(testData4, "array", true));
console.log(array_normalize(testData4, { age: "float" }));
console.log(array_normalize(testData4, { age: "float" }, true));
console.log(array_normalize(testData4, { age: "int" }));
console.log(array_normalize(testData4, { age: "int" }, true));

module.exports = array_normalize;