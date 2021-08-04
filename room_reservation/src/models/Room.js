const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

export const Room = mongoose.model('Room', { id: ObjectId })
