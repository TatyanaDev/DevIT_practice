// function NewObj () {
//   let x
//   const getX = this.setX
//   Object.defineProperty(this, 'x', {
//     get: () => x
//   })
//   this.setX = function (val) {
//     return this.setX(x)(val)
//   }
// }



// // let obj = new NewObj()
// // obj.x = 5
// // console.log(obj.setX(1)(19))

// NewObj.prototype.setX = (x) => (val) => x = val

// this.setX = (function (val) {
//   return this.setX(x)
// })()

// let obj2 = NewObj.prototype
// obj2.setX(2)()
// console.log(obj2)
// obj.x = 5
// console.log(obj2.setX()(19))