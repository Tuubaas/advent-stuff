import { a } from "./byte1-input.js";
const input = [2, 0, 9, 3, 4, 1, 6, 8, 7];

const findFirstUnusedNumber = (input: number[]): number => {
  const sortedInput = input.sort((a, b) => a - b);

  for (let i = 0; i < sortedInput.length; i++) {
    if (sortedInput[i] !== i) {
      return i;
    }
  }

  return sortedInput.length;
};

const run = () => {
  console.log(findFirstUnusedNumber(a));
};

export default run;
