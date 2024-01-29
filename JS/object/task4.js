// function A () {}
// function B () {}
// function C () {}
// function D () {}
// function E () {}
// function F () {}

// A.prototype = Object.create(B.prototype)
// B.prototype = Object.create(E.prototype)
// B.prototype = Object.create(C.prototype)
// C.prototype = Object.create(D.prototype)

// // F.prototype = Object.setPrototypeOf(D)
// F=>C=>D=>A
// console.log(B.prototype instanceof A.prototype)