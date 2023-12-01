import { input } from "./aoc1-input";

const possibleSubstrings = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "zero",
];

const conversion = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
  zero: "0",
};

const getFirstAndLastDigitOfString = (input: string): string => {
  const firstDigitAsString = parseFirstSubstringOccurence(
    input,
    possibleSubstrings
  );
  const lastDigitAsString = parseFirstSubstringOccurence(
    input,
    possibleSubstrings,
    true
  );
  return firstDigitAsString + lastDigitAsString;
};

const isNumber = (input: string): boolean => {
  return !isNaN(parseInt(input));
};

function parseFirstSubstringOccurence(
  input: string,
  substrings: string[],
  reverse = false
): string {
  let tmpFirstIndex = Infinity;
  let tmpFirst = "";
  if (reverse) input = input.split("").reverse().join("");

  substrings.forEach((substring) => {
    if (reverse) substring = substring.split("").reverse().join("");
    const index = input.indexOf(substring);
    if (index !== -1 && index < tmpFirstIndex) {
      tmpFirstIndex = index;
      if (isNumber(substring)) {
        tmpFirst = substring;
      } else {
        if (reverse) substring = substring.split("").reverse().join("");
        const converted = conversion[substring as keyof typeof conversion];

        tmpFirst = converted;
      }
    }
  });
  return tmpFirst;
}

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
