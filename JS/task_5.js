/*5. Написать функцию, которая проверяет, являются ли две строки анаграммами, причем регистр букв не имеет значения. Учитываются лишь символы; пробелы или знаки препинания в расчет не берутся.*/

const areAnagrams = (str1, str2) => {
  const sanitizeString = (str) => str.toLowerCase().replace(/[^a-z\d]/g, "").split("").sort().join("");

  return sanitizeString(str1) === sanitizeString(str2);
};

console.log(areAnagrams("nap", "pa;n"));
console.log(areAnagrams("eAr", "ArE"));
console.log(areAnagrams("chea ters", "hecTares"));
console.log(areAnagrams("chedfdaters", "hecTasfres"));
