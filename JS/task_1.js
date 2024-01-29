/*1. Напишите функцию, которая пишет в консоль число в заданном диапазоне, в случае, если оно успешно делится или не делится с остатком или без остатка в зависимости от параметров.*/

const configuration = {
  modulus: 10,
  isEntry: false,
  start: 45,
  end: 68,
};

const getNumbersModulatorBy = (modulus) => (start, end) => {
  const loggerCallback = (data) => console.log(data);

  loggerCallback({ message: "Configuration", config: configuration });
  loggerCallback({ message: "Received modulator", modulus: modulus });
  loggerCallback({
    message: "Received start and end",
    start: start,
    end: end,
  });

  while (start <= end) {
    if (start % modulus == configuration.isEntry) {
      loggerCallback(start);
    }

    start++;
  }
};

const tenNumbersModulator = getNumbersModulatorBy(configuration.modulus);

configuration.modulus = 5;

const fiveNumbersModulator = getNumbersModulatorBy(configuration.modulus);

tenNumbersModulator(configuration.start, configuration.end);
tenNumbersModulator(10, 100);

configuration.isEntry = true;

fiveNumbersModulator(configuration.start, configuration.end);
fiveNumbersModulator(10, 21);
