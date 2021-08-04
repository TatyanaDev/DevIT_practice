const hello = (name, great) => great + ' ' + name
const users = [{ name: 'Vasya' }, { name: 'Olya' }, { name: 'Kolya' }]
const great = 'Hello'

users.forEach(user => {
  user.hello = hello.bind(user, user.name, great)
})

// users[0].hello() //Hello Vasya
