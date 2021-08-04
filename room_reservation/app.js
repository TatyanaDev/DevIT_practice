const express = require('express')
const app = express()
const port = 3000
const hostname = '127.0.0.1'

const { graphqlHTTP } = require('express-graphql')
const passwordHash = require('password-hash')
const path = require('path')
const multer = require('multer')
const upload = multer()

const { schema } = require('./src/schema')
const { root } = require('./src/root')
const { fakeDatabase } = require('./src/db')

// const { Room } = require('./src/models/Room')
// const { User } = require('./src/models/User')
// const { Reservation } = require('./src/models/Reservation')

const startServer = async () => {
  app.use(express.static(path.join(__dirname + '/views/registration')))
  app.post('/', upload.array(), function (req, res, next) {
    hashedPassword = passwordHash.generate(req.body.psw)
    console.log(hashedPassword)
    fakeDatabase.users.push({
      id: Date.now(),
      name: req.body.name,
      email: req.body.email,
      hashedPass: hashedPassword
    })
    console.log(fakeDatabase.users)
    res.redirect('./authorization')
  })

  app.use(
    '/authorization',
    express.static(path.join(__dirname + '/views/authorization'))
  )
  app.post('/authorization', upload.array(), function (req, res, next) {
    checkPass = passwordHash.verify(req.body.psw, hashedPassword)
    console.log(checkPass)
    res.redirect('./calendar')
  })

  app.use('/calendar', express.static(path.join(__dirname + '/views/calendar')))

  //   await mongoose.connect('mongodb://localhost:27017/room_reservation', {
  //     useNewUrlParser: true,
  //     useUnifiedTopology: true,
  //     useFindAndModify: false,
  //     useCreateIndex: true
  //   })

  app.use(
    '/graphql',
    graphqlHTTP({
      schema: schema,
      rootValue: root,
      graphiql: true,
      context: fakeDatabase
    })
  )

  app.listen(port, hostname, function () {
    console.log(`Server running at http://${hostname}:${port}/`)
  })
}

startServer()
