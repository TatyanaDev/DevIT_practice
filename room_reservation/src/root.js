const root = {
  createUser: ({ input }) => {
    const user = createUser(input)
    users.push(user)
    return user
  },
  rooms: () => {
    return fakeDatabase.find(users)
  },
  users: () => {
    return fakeDatabase.users
  },
  reservations: () => {
    return fakeDatabase.reservations
  }
}

module.exports = {
  root
}
