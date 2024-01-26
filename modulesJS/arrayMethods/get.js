module.exports = function get(arr, path) {
  path = path.replace(/\[(\w+)\]/g, ".$1");
  path = path.replace(/^\./, "");

  const keys = path.split(".");

  for (var i = 0; i < keys.length; i++) {
    const key = keys[i];

    if (!(key in arr)) {
      return;
    }

    arr = arr[key];
  }

  return arr;
};
