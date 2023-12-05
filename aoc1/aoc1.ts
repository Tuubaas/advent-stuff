import { input } from "./aoc1-input";

const getFirstAndLastDigitOfString = (input: string): string => {
  const firstDigitAsString = getFirstDigitInStringAsString(input);
  const lastDigitAsString = getFirstDigitInStringAsString(
    input.split("").reverse().join("")
  );
  return firstDigitAsString + lastDigitAsString;
};

const isNumber = (input: string): boolean => {
  return !isNaN(parseInt(input));
};

const getFirstDigitInStringAsString = (input: string): string => {
  for (let i = 0; i < input.length; i++) {
    if (isNumber(input[i])) {
      return input[i];
    }
  }
  return "";
};

const sumAllNumbersInInput = (inputs: string[]): void => {
  let sum = 0;
  inputs.forEach((input) => {
    const firtsAndLastDigit = getFirstAndLastDigitOfString(input);

    sum += parseInt(firtsAndLastDigit);
  });
  console.log(sum);
};

const main = () => {
  sumAllNumbersInInput(input);
};

export default main;
