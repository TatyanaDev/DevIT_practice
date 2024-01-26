const { testData3 } = require("../js/data");

const sort_by_skill = (arr) => {
  const sorted = (arr) =>
    Object.entries(arr)
      .sort((a, b) => b[1] - a[1])
      .reduce((r, [key, value]) => {
        r[key] = value;
        return r;
      }, {});
  const helper = (res) => Object.keys(sorted(res)).join("\n");
  const resPhp = {};
  const resJs = {};
  const resMadness = {};
  const resRage = {};
  const name = arr.map((v) => v.name);
  const php = arr.map((v) => v.skills.php);
  const js = arr.map((v) => v.skills.js);
  const madness = arr.map((v) => v.skills.madness);
  const rage = arr.map((v) => v.skills.rage);
  for (let i = 0; i < arr.length; i++) {
    resPhp[name[i]] = php[i];
    resJs[name[i]] = js[i];
    resMadness[name[i]] = madness[i];
    resRage[name[i]] = rage[i];
  }

  return `----- PHP -----
${helper(resPhp)}
----- JS ------
${helper(resJs)}
--- Madness ---
${helper(resMadness)}
---- Rage ----
${helper(resRage)}`;
};

// sort_by_skill(testData3)
// ----- PHP -----
//   Colya
//   Misha
//   Dima
//   Vasya
//   Ashan
//   Rafshan
// ----- JS ------
//   Ashan
//   Dima
//   Misha
//   Rafshan
//   Vasya
//   Colya
// --- Madness ---
//   Vasya
//   Ashan
//   Misha
//   Dima
//   Colya
//   Rafshan
// ---- Rage ----
//   Vasya
//   Rafshan
//   Colya
//   Dima
//   Misha
//   Ashan
