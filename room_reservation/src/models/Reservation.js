const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

export const Reservation = mongoose.model('Reservation', {
  id: ObjectId,
  room_id: Number,
  id_user: Number,
  from: Date,
  to: Date
})
