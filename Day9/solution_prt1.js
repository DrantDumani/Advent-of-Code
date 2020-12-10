const fs = require("fs");

const raw = fs.readFileSync("numbers.txt", "utf8");

const nums = raw.trim().split(/\n/).map(num => Number(num));

function findInvalid(list, preamble){
  let preNums = list.slice(0,preamble);
  for (let start = preamble; start < list.length; start++){
    let testNum = list[start];
    if (verifySum(testNum, preNums)) {
      preNums.shift();
      preNums.push(testNum);
      continue;
    }
    else return testNum;
  }
  return "All numbers passed the test. No weaknesses detected";
}

function verifySum(num, arr){
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] + arr[j] === num) return true;
    }
  }
  return false;
}

console.log(findInvalid(nums, 25));