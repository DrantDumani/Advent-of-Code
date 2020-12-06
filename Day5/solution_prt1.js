const fs = require("fs")

const raw = fs.readFileSync("boardingPasses.txt", "utf8")

const bPasses = raw.split(/\n/);

function fndLrgstSeatID(bPasses) {
  let lrgstID = 0;
  for (let bPass of bPasses) {
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
    let seatID = rowMax * 8 + colMax;
    lrgstID = seatID > lrgstID ? seatID : lrgstID;
  }
  return lrgstID;
}

console.log(fndLrgstSeatID(bPasses))