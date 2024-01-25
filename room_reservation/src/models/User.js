const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

export const User = mongoose.model('User', {
  id: ObjectId,
  name: String,
  email: String,
  nashPass: String
})
