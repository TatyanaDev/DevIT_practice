// #3
// Напишите конструктор ёлочки который будет содержать метод draw, рисующий в консоли ёлку заданной высоты.

function Tree (height) {
  this.draw = function () {
    let i = 0
    let j = 0
    const max = height
    while (i < max) {
      let empty = ''
      let star = ''
      for (j = 0; j < max - i; j++) empty += ' '
      for (j = 0; j < 2 * i + 1; j++) star += '*'
      i++
      console.log(empty + star)
    }
  }
}

// let new_Year = new Tree(5)
// new_Year.draw()
//      *
//     ***
//    *****
//   *******
//  *********
