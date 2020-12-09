const fs = require("fs");

const raw = fs.readFileSync("bootcmds.txt", "utf8");

const bootList = raw.trim().split(/\n/).map(str => str.split(/\s/));

function findAccB4Repeat(instrc) {
  let acc = 0;
  let steps = []; //log instructions to this array
  let index = 0;
  while (index < instrc.length) { //inf loop incoming
    if (steps.indexOf(index) !== -1) break;
    steps.push(index);
    let dir = instrc[index][0];
    let amount = Number(instrc[index][1]);
    if (dir === "acc") {
      acc += amount;
      index += 1;
    }
    else if (dir === "nop") index += 1;
    else if (dir === "jmp") index += amount;
  }
  return acc
}

console.log(findAccB4Repeat(bootList))