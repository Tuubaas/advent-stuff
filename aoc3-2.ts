import fs from "fs";

const input = fs.readFileSync("aoc3-input.txt", "utf8");
const lines = input.split("\n");

let acc: number[] = [];
let j = 0;
while (j < lines.length) {
  let line = lines[j];
  let i = 0;
  while (i < line.length) {
    const char = line[i];
    if (char === "*") {
      const [firstNumber, secondNumber] = getSurroundingNumbers(lines, i, j);

      if (firstNumber && secondNumber) {
        acc.push(firstNumber * secondNumber);
      }
    }
    i++;
  }
  j++;
}

function isNumber(char: string) {
  return !isNaN(parseInt(char));
}

function getSurroundingNumbers(
  lines: string[],
  starIndex: number,
  lineIndex: number
) {
  const res = [];

  let i = lineIndex - 1;
  while (i <= lineIndex + 1 && i < lines.length && res.length < 2) {
    if (i < 0) continue;
    const lineToCheckForSymbol = lines[i];

    let j = starIndex - 1;
    while (
      j <= starIndex + 1 &&
      j < lineToCheckForSymbol.length &&
      res.length < 2
    ) {
      if (j < 0) continue;
      if (isNumber(lines[i][j])) {
        const [fullNumber, nextIndex] = getFullNumberAndNextIndex(lines[i], j);
        res.push(fullNumber);
        j = nextIndex;
        continue;
      }
      j++;
    }
    i++;
  }
  return res;
}

function getFullNumberAndNextIndex(line: string, i: number) {
  let number = line[i];

  let x = i - 1;
  while (x >= 0 && isNumber(line[x])) {
    number = line[x] + number;
    x--;
  }

  let y = i + 1;
  while (y < line.length && isNumber(line[y])) {
    number += line[y];
    y++;
  }

  return [parseInt(number), y];
}

function sumArray(arr: number[]) {
  return arr.reduce((acc, num) => acc + num, 0);
}

export default function aoc3() {
  console.log(acc);

  console.log(sumArray(acc));
}
