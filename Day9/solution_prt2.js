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

function findWeakness(num, list){
  if (typeof num !== "number") return num;
  let sum = list[0] + list[1];
  let range = [list[0], list[1]];
  let index = 2;
  while (index < list.length) {
    if (sum < num) {
      range.push(list[index]);
      sum += range[range.length -1];
      index += 1;
    }
    else if (sum > num) {
      sum -= range[0];
      range.shift();
    }
    else if (sum === num) break;
  }
  range.sort((a,b) => a - b);
  let weakness = range[range.length - 1] + range[0];
  return weakness;
}

console.log(findWeakness(findInvalid(nums, 25), nums));