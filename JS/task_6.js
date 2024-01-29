/* 6. Написать функцию для выполнения параллельных вычислений без использования Promise.*/

const a = function (one, two) {
  return one + two;
};

const b = function () {
  return false;
};

const parallel = (tasks, finalCallback) => {
  const results = [];
  let completedTasks = 0;

  tasks.forEach((task, index) => {
    setTimeout(() => {
      const [func, args] = task;

      const result = func ? func.apply(null, args || []) : undefined;

      results[index] = result;

      if (++completedTasks === tasks.length) {
        finalCallback(results);
      }
    }, 0);
  });
};

parallel([[a, [1, 2]], [b]], function (results) {
  console.log(results);
});
