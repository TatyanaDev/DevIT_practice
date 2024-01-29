/*2. Есть ферма животных, у всех животных есть имена и возраст. Животные бывают разных типов: Кошки, Собаки, Коровы. У каждого животного могут быть дети. Если животное является родителем этих детей, в свою очередь глубина семейного древа может достигать N либо 0. Опишите структуры данных для фермы животных и напишите функцию, которая делает подсчёт всех возрастов животных и выводит общий возраст для всей фермы.*/

class Animal {
  constructor(name, age, children = null) {
    this.name = name;
    this.age = age;
    this.children = children;
  }
}

class Cat extends Animal {
  constructor(name, age, children = null) {
    super(name, age, children);
  }
}

class Dog extends Animal {
  constructor(name, age, children = null) {
    super(name, age, children);
  }
}

class Cow extends Animal {
  constructor(name, age, children = null) {
    super(name, age, children);
  }
}

const getAnimalsAge = (animals) => {
  let output = 0;

  if (animals.length > 0) {
    output += animals.reduce((acc, current) => {
      let count = 0;

      if (current.children && current.children.length > 0) {
        count += getAnimalsAge(current.children);
      }

      return acc + current.age + count;
    }, 0);
  }

  return output;
};

const generateAnimals = (type, count) => {
  const output = [];

  for (let i = 0; i <= count; i++) {
    const parameter = {
      name: `${type} ${i}`,
      age: i,
      children: [],
    };

    let item = null;

    switch (type) {
      case "Cat":
        item = new Cat(parameter.name, parameter.age);
        break;
      case "Dog":
        item = new Dog(parameter.name, parameter.age);
        break;
      case "Cow":
        item = new Cow(parameter.name, parameter.age);
        break;
    }

    if (item) {
      output.push(item);
    }
  }

  return output;
};

const addChildrenTo = (animals, count, type) => {
  animals.forEach((animal) => {
    if (!animal.children) {
      animal.children = [];
    }

    animal.children = generateAnimals(type, count);
  });
};

const cats = generateAnimals("Cat", 5);
addChildrenTo(cats, 10, "Cat");

const dogs = generateAnimals("Dog", 3);
addChildrenTo(dogs, 3, "Dog");

const cows = generateAnimals("Cow", 7);
addChildrenTo(cows, 1, "Dog");

const animals = [...cats, ...dogs, ...cows];

console.log(getAnimalsAge(animals));
