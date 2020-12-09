const fs = require("fs");

const raw = fs.readFileSync("bootcmds.txt", "utf8");

const bootList = raw.trim().split(/\n/).map(str => str.split(/\s/));

function iterateList(list) {
  let info =  [0, [], false];
  for (let index = 0; index !== list.length;) {
    if (info[1].indexOf(index) !== -1) {
      info[2] = true;
      return info;
    }
    info[1].push(index)
    let dir = list[index][0];
    let amount = Number(list[index][1]);
    if (dir === "acc") {
      info[0] += amount;
      index += 1;
    }
    else if (dir === "nop") index += 1;
    else if (dir === "jmp") index += amount;
  }
  return info;
}

function findAcc(instrc) {
  let [acc, steps, infLoop] = iterateList(instrc);
  if (infLoop) return backTrack(instrc, steps);
  else return acc;
}

function backTrack(instrc, bckTrckArr){ 
  let step = bckTrckArr.pop();
  let [dir, amnt] = instrc[step];
  let testList;
  if (dir === "acc") {
    return backTrack(instrc, bckTrckArr);
  }
  else if (dir === "jmp") dir = "nop";
  else if (dir === "nop") dir = "jmp";
  testList = instrc.map((cmd, index) => index === step ? [dir, amnt] : cmd);
  let [_, ignre, infLoop] = iterateList(testList);
  if (infLoop) return backTrack(instrc, bckTrckArr);
  else return findAcc(testList); 
}

console.log(findAcc(bootList));