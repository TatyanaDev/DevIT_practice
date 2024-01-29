/*3. Напишите конструктор ёлочки, который будет содержать метод draw, рисующий в консоли ёлку заданной высоты.*/

class ChristmasTree {
  constructor(height) {
    this.height = height;
  }

  draw() {
    for (let i = 0; i < this.height; i++) {
      let level = "";

      for (let j = 0; j < this.height - i - 1; j++) {
        level += " ";
      }

      for (let k = 0; k < 2 * i + 1; k++) {
        level += "*";
      }

      console.log(level);
    }
  }
}

const newYear = new ChristmasTree(8);

newYear.draw();
