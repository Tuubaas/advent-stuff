import fs from "fs";

const input = fs.readFileSync("aoc4-input.txt", "utf8");
const lines = input.split("\n");

type ScartchCard = {
  winningNumbers: number[];
  playingNumbers: number[];
};

// Part 1 - Parse lines and read winning numbers into one array and playing naumbers into one
function parseLine(line: string): ScartchCard {
  const [cardIndex, rest] = line.split(":");

  const [wNumbers, pNumbers] = rest.split("|");

  const winningNumbers = wNumbers
    .split(" ")
    .reduce((acc: number[], char: string) => {
      if (char === " ") return acc;
      if (!isNumber(char)) return acc;
      return [...acc, parseInt(char)];
    }, []);
  const playingNumbers = pNumbers
    .split(" ")
    .reduce((acc: number[], char: string) => {
      if (char === " ") return acc;
      if (!isNumber(char)) return acc;
      return [...acc, parseInt(char)];
    }, []);

  return {
    winningNumbers: winningNumbers,
    playingNumbers: playingNumbers,
  };
}

// Part 2 - Count duplicates between winning numbers and playing numbers
function countDuplicates(card: ScartchCard) {
  const duplicates = card.winningNumbers.filter((number) => {
    return card.playingNumbers.includes(number);
  });
  return duplicates.length;
}

// Part 3 - A function which reads the number of duplicates and increments that number of conseccutive indices in a global array with 1
function incrementDuplicates(duplicatesArr: number[]) {
  let screatchCardCount = new Array(duplicatesArr.length).fill(1);
  for (let i = 0; i < duplicatesArr.length; i++) {
    if (duplicatesArr[i] === 0) continue;
    for (let j = 1; j <= duplicatesArr[i]; j++) {
      screatchCardCount[i + j] += screatchCardCount[i];
    }
  }
  return screatchCardCount;
}

function isNumber(string: string) {
  return !isNaN(parseInt(string));
}

const cards = lines.map(parseLine);
export default function aoc4() {
  const dups = cards.map(countDuplicates);
  const numScratchCards = incrementDuplicates(dups);
  const sum = numScratchCards.reduce((acc, dup) => {
    return acc + dup;
  }, 0);
  console.log(sum);
}
