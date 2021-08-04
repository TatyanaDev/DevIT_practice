const { buildSchema } = require('graphql')

const schema = buildSchema(`
  type Query {
    rooms: [Room]
    users: [User]
    reservations: [Reservation]
  }

  type Room{
    id: ID!
  }

  type User{
    id: ID
    name: String,
    email: String,
    hashPass: String
  }
  
  input UserInput{
    name: String,
    email: String,
    hashPass: String
  }

  type Reservation{
    id: ID!
    room_id: Room
    id_user: User
    from: String
    to: String
  }

  input ReservationInput{
    room_id: Room
    id_user: User
    from: String
    to: String
  }

  type Mytation{
    createUser(input: UserInput): User
    createReservation(input: ReservationInput): Reservation
  }
`)

module.exports = {
  schema
}
