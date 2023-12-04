import fs from "fs";

const input = fs.readFileSync("byte3-input.txt", "utf8");
const lines = input.split("\n");

const linesInNumbers = lines.map((num) => parseInt(num));

let longestArrLength = 0;
let globalCurrLongest = 0;

function plsWork(arr: number[]): number[] {
  if (arr.length === 0) return [];
  let currLongest: number[] = [];
  for (let i = 0; i < arr.length; i++) {
    console.log(arr.length, i);

    if (longestArrLength > arr.length - i) break;
    const firstNumber = arr[i];
    const rest = arr.slice(i + 1);
    if (rest[0] <= firstNumber) continue;
    const longestRestArr = plsWork(rest);

    const newArr = [firstNumber, ...longestRestArr];
    if (newArr.length > currLongest.length) {
      currLongest = newArr;
    }
    if (currLongest.length > longestArrLength) {
      longestArrLength = currLongest.length;
    }
  }
  return currLongest;
}

export default function aoc3() {
  const res = plsWork(linesInNumbers);

  console.log(res);
  console.log(res.length);
}
