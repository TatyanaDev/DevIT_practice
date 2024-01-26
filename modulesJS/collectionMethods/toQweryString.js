const querystring = require('querystring')

module.exports = function toQweryString (arr) {
  return querystring.stringify(arr)
}
