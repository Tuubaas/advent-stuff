import fs from "fs";

const input = fs.readFileSync("aoc3-input.txt", "utf8");
const lines = input.split("\n");

const symbols = "*#+$/%&-=@";

let acc: number[] = [];
let j = 0;
while (j < lines.length) {
  let line = lines[j];
  let i = 0;
  while (i < line.length) {
    const char = line[i];
    if (isNumber(char)) {
      const [fullNumber, lastIndex] = getFullNumberAndLastIndex(line, i);
      const hasSurroundingSymbol = checkSurroundingIndices(
        lines,
        j,
        i,
        lastIndex
      );
      if (hasSurroundingSymbol) {
        acc.push(fullNumber);
        i = lastIndex;
        continue;
      }
    }

    i++;
  }
  j++;
}

function isNumber(char: string) {
  return !isNaN(parseInt(char));
}

function getFullNumberAndLastIndex(line: string, i: number) {
  let number = "";
  let lastIndex = i;
  while (isNumber(line[lastIndex])) {
    number += line[lastIndex];
    lastIndex++;
  }
  return [parseInt(number), lastIndex];
}

function checkSurroundingIndices(
  lines: string[],
  lineIndex: number,
  firstNumberIndex: number,
  lastNumberIndex: number
) {
  for (let i = lineIndex - 1; i <= lineIndex + 1 && i < lines.length; i++) {
    if (i < 0) continue;
    const lineToCheckForSymbol = lines[i];

    for (
      let j = firstNumberIndex - 1;
      j <= lastNumberIndex + 1 && j < lineToCheckForSymbol.length;
      j++
    ) {
      if (j < 0) continue;
      const char = lineToCheckForSymbol[j];
      if (symbols.includes(char)) {
        return true;
      }
    }
  }

  return false;
}

function sumArray(arr: number[]) {
  return arr.reduce((acc, num) => acc + num, 0);
}

export default function aoc3() {
  console.log(sumArray(acc));
}
