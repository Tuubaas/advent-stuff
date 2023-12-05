// import fs from "fs";

// const input = fs.readFileSync("byte2-input.txt", "utf8"); //"-1\n3\n0\n-2\n1\n-3\n4"; //fs.readFileSync("byte2-input.txt", "utf8");
// const lines = input.split("\n");

// const MIN_TIME = 8;
// const MAX_TIME = 16;

// type SortedTimes = {
//   "-12": number;
//   "-11": number;
//   "-10": number;
//   "-9": number;
//   "-8": number;
//   "-7": number;
//   "-6": number;
//   "-5": number;
//   "-4": number;
//   "-3": number;
//   "-2": number;
//   "-1": number;
//   "0": number;
//   "1": number;
//   "2": number;
//   "3": number;
//   "4": number;
//   "5": number;
//   "6": number;
//   "7": number;
//   "8": number;
//   "9": number;
//   "10": number;
//   "11": number;
//   "12": number;
//   [key: string]: number;
// };

// // Part 1 - Parse lines and count times occurences
// const times: SortedTimes = lines.reduce((acc, line) => {
//   acc[line] = (acc[line] || 0) + 1;
//   return acc;
// }, {} as SortedTimes);
// console.log(times);

// // Part 2 - Find the times that occur between MIN_TIME and MAX_TIME
// let maxSum = 0;
// let maxSumTime: string = "";
// for (let i = 12; i >= -12; i--) {
//   let sum = 0;
//   for (let j = 0; j <= 7; j++) {
//     const a = i - j;
//     if (times[a.toString()]) {
//       sum += times[a.toString()];
//     }
//   }

//   if (sum > maxSum) {
//     maxSum = sum;
//     maxSumTime = i.toString();
//   }
// }

// export default function byte2() {
//   console.log("maxSumTime", maxSumTime);
//   console.log("maxSum", maxSum);
// }

import fs from "fs";

const input = fs.readFileSync("byte2-input.txt", "utf8");
const lines = input.split("\n");

const MIN_WORKING_HOUR = 8;
const MAX_WORKING_HOUR = 16;

type Timeslots = {
  8: number;
  9: number;
  10: number;
  11: number;
  12: number;
  13: number;
  14: number;
  15: number;
};

const timeslots: Timeslots = {
  8: 0,
  9: 0,
  10: 0,
  11: 0,
  12: 0,
  13: 0,
  14: 0,
  15: 0,
};

for (let i = MIN_WORKING_HOUR; i < MAX_WORKING_HOUR; i++) {
  lines.forEach((line) => {
    const tz = parseInt(line);
    const hour = i - tz;
    if (hour >= MIN_WORKING_HOUR && hour < MAX_WORKING_HOUR) {
      timeslots[i as keyof Timeslots] += 1;
    }
  });
}

export default function byte2() {
  console.log(timeslots);
}
