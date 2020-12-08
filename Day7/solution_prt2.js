const fs = require("fs");

const raw = fs.readFileSync("BagRules.txt", "utf8");

const bagRules = raw.trim().split(/\n/).map(str => {
  let obj = {};
  let match = str.match(/((\d+ )?\w+ \w+)(?= bag)/g);
  obj[match[0]] = []
  for (let i = 1; i < match.length; i++) {
    let bagNumberPair = match[i].split(/(?<=\d+)\s(?=\w+)/)
    obj[match[0]].push(bagNumberPair);
  }
  return obj;
})

function bagsInsideBag(bagClr){
  let sumOfInnerBags = 0;
  for (let bag of bagRules) {
    let currentBag = Object.keys(bag)[0];
    if (currentBag === bagClr){
      for (let innerBag of bag[currentBag]){
        let moreBags = Number(innerBag[0]);
        if (moreBags) {
          sumOfInnerBags = sumOfInnerBags + Number(innerBag[0])
           + Number(innerBag[0]) * Number(bagsInsideBag(innerBag[1]));
        }
      }
    }
  }
  return sumOfInnerBags;
}

console.log(bagsInsideBag("shiny gold"));