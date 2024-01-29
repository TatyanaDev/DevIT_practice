// #2
// Есть ферма животных, у всех животных есть имена и возраст. Животные бывают разных типов: Кошки, Собаки, Коровы. У каждого животного могут быть дети. Если животное является родителем этих детей, в свою очередь глубина семейного древа может достигать N либо 0. Опишите структуры данных для фермы животных и напишите функцию, которая делает подсчёт всех возрастов животных и выводит общий возраст для всей фермы.

class Animal {
  constructor (name, age, childs = null) {
    this.name = name
    this.age = age
    this.childs = childs
  }
}

class Cat extends Animal {
  constructor (name, age, childs = null) {
    super(name, age, childs)
  }
}

class Dog extends Animal {
  constructor (name, age, childs = null) {
    super(name, age, childs)
  }
}

class Cow extends Animal {
  constructor (name, age, childs = null) {
    super(name, age, childs)
  }
}

const getAgeChildren = animals => {
  let ageChildren = 0
  if (animals.length > 0) {
    ageChildren += animals.reduce((acc, value) => {
      let sumAge = 0
      if (value.childs && value.childs.length > 0) {
        sumAge += getAgeChildren(value.childs)
      }
      return acc + value.age + sumAge
    }, 0)
  }
  return ageChildren
}
const countTypeAnimals = (type, quantity) => {
  let countType = []
  for (let i = 0; i <= quantity; i++) {
    let info = {
      name: `${type} ${i}`,
      age: i,
      childs: []
    }

    let children = null

    switch (type) {
      case 'Cat':
        children = new Cat(info.name, info.age)
        break
      case 'Dog':
        children = new Dog(info.name, info.age)
        break
      case 'Cow':
        children = new Cow(info.name, info.age)
        break
    }

    if (children) {
      countType.push(children)
    }
  }

  return countType
}

const addingChildren = (animals, count, type) => {
  animals.forEach(animal => {
    animal.childs = countTypeAnimals(type, count)
  })
}

let cats = countTypeAnimals('Cat', 4)
addingChildren(cats, 8, 'Cat')

let dogs = countTypeAnimals('Dog', 5)
addingChildren(dogs, 10, 'Dog')

let cows = countTypeAnimals('Cow', 3)
addingChildren(cows, 7, 'Dog')

let totalFarmAge = [...cats, ...dogs, ...cows]

// getAgeChildren(totalFarmAge) // 653
