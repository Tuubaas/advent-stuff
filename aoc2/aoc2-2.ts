import fs from "fs";

const input = fs.readFileSync("aoc2-input.txt", "utf8");
const lines = input.split("\n");

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

// Part 2 - Find the least amount of cubes of each color needed to make each game possible
const leastCubes = games.map((game) => {
  const leastCubesForGame = game.sets.reduce(
    (acc: Required<Set>, set) => {
      const red = set.red || 0;
      const green = set.green || 0;
      const blue = set.blue || 0;
      return {
        red: Math.max(acc.red, red),
        green: Math.max(acc.green, green),
        blue: Math.max(acc.blue, blue),
      };
    },
    { red: 0, green: 0, blue: 0 } as Required<Set>
  );
  return { id: game.id, sets: leastCubesForGame };
});

// Part 3 - Multiply the least cubes of each color by each other for each game
const leastCubesMultiplied = leastCubes.map((game) => {
  return game.sets.red * game.sets.green * game.sets.blue;
});

// Part 4 - Sum the multiplied cubes for each game
const sumOfMultipliedCubes = leastCubesMultiplied.reduce((acc, game) => {
  return acc + game;
}, 0);

export default function aoc2() {
  console.log(sumOfMultipliedCubes);
}
