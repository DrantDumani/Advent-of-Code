const fs = require("fs");

const raw = fs.readFileSync("times.txt", "utf8");

const times = raw.trim().split(/[\n,]/).map(el => el !== "x" ? Number(el) : el)

function findTimeStamp(timeStamps){
  let increment = timeStamps[0];
  let winningNum = 0;
  let index = 1;
  while (index < timeStamps.length){
    if (timeStamps[index] == "x") {
      index += 1;
      continue;
    }
    if (winningNum % timeStamps[0] == 0
        && (winningNum + index) % timeStamps[index] == 0){
      increment *= timeStamps[index];
      index += 1;
    }
    else {
      winningNum += increment;
    }
  }
  return winningNum;
}


console.log(findTimeStamp(times.slice(1)));