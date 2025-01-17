const { testData3 } = require("../JS/data");

// #9 На основании данных testData3 вывести последовательно в консоль имена программистов сгруппированных и отсортированных по их навыкам

const sort_and_group_by_skill = (data) => {
  const skillMap = {};

  data.forEach((person) => {
    Object.keys(person.skills).forEach((skill) => {
      if (!skillMap[skill]) {
        skillMap[skill] = [];
      }

      skillMap[skill].push({
        name: person.name,
        level: person.skills[skill],
      });
    });
  });

  Object.keys(skillMap).forEach((skill) => {
    console.log(`----- ${skill.toUpperCase()} -----`);

    skillMap[skill].sort((a, b) => b.level - a.level);

    skillMap[skill].forEach((person) => {
      if (person.level > 0) {
        console.log(person.name);
      }
    });
  });
};

sort_and_group_by_skill(testData3);
