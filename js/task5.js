// #5
// Нужно написать функцию, которая проверяет, являются ли две строки анаграммами, причем регистр букв не имеет значения. Учитываются лишь символы; пробелы или знаки препинания в расчет не берутся.

const helper = str =>
  str
    .toLowerCase()
    .split('')
    .sort()
    .join('')

const annagram = (str1, str2) => {
  const normalization1 = helper(str1)

  const normalization2 = helper(str2)

  if (normalization1 === normalization2) {
    return true
  }
  return false
}

// annagram('nap','pan') // true
// annagram('eAr','ArE') // true
// annagram('cheaters','hecTares') // true
// annagram('chedfdaters','hecTasfres') // false
