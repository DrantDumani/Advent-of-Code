const fs = require("fs")

const raw = fs.readFileSync("boardingPasses.txt", "utf8")

const bPasses = raw.split(/\n/);
const sortedIds = bPasses.map(findSeatId).sort((id1, id2) => id1 - id2);

function findSeatId(bPass) {
  let rowMin = 0, rowMax = 127;
  let colMin = 0, colMax = 7;
  for (let char of bPass) {
    if (char === "B")
      rowMin = Math.ceil((rowMin + rowMax)/2);
    else if (char === "F")
      rowMax = Math.floor((rowMax + rowMin)/2);
    else if (char === "R")
      colMin = Math.ceil((colMin + colMax)/2);
    else if (char === "L")
      colMax = Math.floor((colMin + colMax)/2);
  }
  let seatId = rowMax * 8 + colMax;
  return seatId;
}

function fndLrgstSeatID(bPasses) {
  let lrgstID = 0;
  for (let bPass of bPasses) {
    let seatID = findSeatId(bPass);
    lrgstID = seatID > lrgstID ? seatID : lrgstID;
  }
  return lrgstID;
}

function findMySeat(seatIds) {
  for (let i = 1; i < seatIds.length - 1; i++) {
    if (seatIds[i] !== seatIds[i - 1] + 1) return seatIds[i] - 1;
  }
}

console.log(findMySeat(sortedIds));