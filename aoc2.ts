import fs from "fs";

const input = fs.readFileSync("aoc2-input.txt", "utf8");
const lines = input.split("\n");

const MAX_POSSIBLE_RED = 12;
const MAX_POSSIBLE_GREEN = 13;
const MAX_POSSIBLE_BLUE = 14;

type Set = {
  red?: number;
  blue?: number;
  green?: number;
};

type Game = {
  id: number;
  sets: Set[];
};

// Part 1 - Parse lines into game objects
const games: Game[] = lines.map((line) => {
  const [id, rest] = line.split(":");

  const sets = rest
    .trim()
    .split(";")
    .map((setString) => {
      const cubesByColor = setString.trim().split(",");
      const set = cubesByColor.reduce((acc, cube) => {
        const [number, color] = cube.trim().split(" ");
        return { ...acc, [color]: parseInt(number) };
      }, {} as Set);
      return set;
    });
  const idNumber = id.split(" ")[1];

  return { id: parseInt(idNumber), sets };
});

// Part 2 - Find the games possible without any set exceeding the max
const possibleGames = games.filter((game) => {
  return game.sets.every((set) => {
    const red = set.red || 0;
    const green = set.green || 0;
    const blue = set.blue || 0;
    return (
      red <= MAX_POSSIBLE_RED &&
      green <= MAX_POSSIBLE_GREEN &&
      blue <= MAX_POSSIBLE_BLUE
    );
  });
});

// Part 3 - Sum the ids of the possible games
const sumOfIds = possibleGames.reduce((acc, game) => {
  return acc + game.id;
}, 0);

export default function aoc2() {
  console.log(sumOfIds);
}
