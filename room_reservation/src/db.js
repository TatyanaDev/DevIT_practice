const fakeDatabase = {
  rooms: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }],
  users: [],
  reservations: [{ id: Date.now(), room_id: '', user_id: '', from: '', to: '' }]
}

module.exports = {
  fakeDatabase
}
