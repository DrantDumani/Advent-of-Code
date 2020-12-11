const fs = require("fs");

const raw = fs.readFileSync("adapters.txt", "utf8");

const adapters = raw.trim().split(/\n/).map(jolt => Number(jolt));

function joltDiffs(adptList) {
  adptList.sort((a,b) => a - b).push(adptList[adptList.length - 1] + 3);
  adptList.unshift(0);
  let oneVoltDiff = 0;
  let threeVoltDiff = 0;
  for (let i = 0; i < adptList.length; i++) {
    if (adptList[i+1] - adptList[i] === 1) oneVoltDiff += 1;
    if (adptList[i+1] - adptList[i] === 3) threeVoltDiff += 1;
  }
  return oneVoltDiff * threeVoltDiff;
  return adptList;
}

console.log(joltDiffs(adapters));