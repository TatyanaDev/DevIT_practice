const querystring = require("querystring");

module.exports = function toQueryString(arr) {
  return querystring.stringify(arr);
};
