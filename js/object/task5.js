// const C = {
//   name: () => 'C',
//   run: () => 300,
//   jump: () => 30
// }

// const B = Object.create(C)
// B.name = () => 'B'
// B.run = () => 200
// B.jump = () => 20

// const A = () => {}
// A.prototype = Object.create(B)
// A.prototype.name = () => 'A'
// A.prototype.run = () => 100
// A.prototype.jump = () => 10

// // console.log('здесь все ', A.prototype)

// function F () {}

// F.prototype.name =() =>Object.create(A.prototype)
// F.prototype = Object.create(A.prototype.__proto__)
// F.prototype.jump = Object.create(A.prototype.__proto__.__proto__)

// console.log(F.prototype)
// // console.log(F.prototype.__proto__)

// let x = new F()
// console.log('--------->', x)
// console.log(x.name()) //A
// // console.log(x.run()) //200
// // console.log(x.jump()) //30
