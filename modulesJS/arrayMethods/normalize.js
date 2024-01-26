const helperAge = (arr) =>
  arr
    .filter((v) => typeof v === "object" && !Array.isArray(v))
    .map((obj) => ({ age: obj.age }));

const helperFloat = (arr) =>
  arr.filter((v) => typeof v === "number" && !Number.isInteger(v));

const helperNumber = (arr) => arr.filter((v) => typeof v === "number");

module.exports = function normalize(arr, shema, transform = false) {
  if (typeof shema === "object") {
    const helpersShema = String(Object.values(shema));
    switch (helpersShema) {
      case transform && "float":
        return this.make(helperAge(arr));
      case "float":
        return this.make(helperFloat(arr));
      case (transform && "int") || "int":
        return this.make(helperAge(arr));
      default:
        return this.make(arr);
    }
  } else {
    switch (shema) {
      case transform && "string":
        return this.make(
          arr
            .filter((v) => typeof v !== "object" && typeof v !== "boolean")
            .map((v) => String(v))
        );
      case "string":
        return this.make(arr.filter((v) => typeof v === "string"));
      case "bool":
        return this.make(arr.filter((v) => typeof v === "boolean"));
      case (transform && "number") || "number":
        return this.make(helperNumber(arr));
      case (transform && "int") || "int":
        return this.make(helperNumber(arr));
      case "function":
        return this.make(arr.filter((v) => typeof v === "function"));
      case transform && "float":
        return this.make(helperNumber(arr));
      case "float":
        return this.make(helperFloat(arr));
      case (transform && "array") || "array":
        return this.make(arr.filter((v) => Array.isArray(v)));
      default:
        return this.make(arr);
    }
  }
};
