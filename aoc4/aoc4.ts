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

// Part 3 - Raise 2 to the power of the number of duplicates
function raiseToPowerOfDuplicates(card: ScartchCard) {
  const duplicates = countDuplicates(card);
  if (duplicates === 0) return 0;
  return Math.pow(2, duplicates - 1);
}

function isNumber(string: string) {
  return !isNaN(parseInt(string));
}

const cards = lines.map(parseLine);
export default function aoc4() {
  const sum = cards.reduce((acc, card) => {
    return acc + raiseToPowerOfDuplicates(card);
  }, 0);
  console.log(sum);
}
