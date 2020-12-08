const fs = require("fs");

const raw = fs.readFileSync("BagRules.txt", "utf8");

const bagRules = raw.trim().split(/\n/).map(str => {
  let obj = {};
  let match = str.match(/(\w+ \w+)(?= bag)/g);
  obj[match[0]] = []
  for (let i = 1; i < match.length; i++) {
    obj[match[0]].push(match[i]);
  }
  return obj;
})

function containsBag(bagClr, bagList){
  for (let bag of bagRules) {
    let currentBag = Object.keys(bag)[0];
    if (currentBag === bagClr) continue;
    if (bag[currentBag].includes(bagClr) && !bagList.includes(currentBag)) {
      bagList.push(currentBag);
      containsBag(currentBag, bagList);
    }
  }
  let sum = bagList.length;
  return sum;
}

console.log(containsBag("shiny gold", []));