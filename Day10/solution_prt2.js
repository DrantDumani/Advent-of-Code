const fs = require("fs");

const raw = fs.readFileSync("adapters.txt", "utf8");

const adapters = raw.trim().split(/\n/).map(jolt => Number(jolt))
.sort((a,b) => a - b)
adapters.unshift(0);
adapters.push(adapters[adapters.length - 1] + 3);

const memoize = function(){
  const cache = {};
  
  return function totalCombo(list, index = 0){
    if (index in cache) return cache[index];
    let branches = 0;
    for (let j = index + 1; list[j] - list[index] <= 3; j++){
      branches += 1
    }
    if (index >= list.length - 1) return 1;
    else {
      if (branches === 3) {
        return cache[index] = totalCombo(list, index + 1) + 
          totalCombo(list, index + 2) + totalCombo(list, index + 3);
      }
      else if (branches === 2) {
        return cache[index] = totalCombo(list, index + 1) 
          + totalCombo(list, index + 2);
      }
      else if (branches === 1) {
        return cache[index] = totalCombo(list, index + 1);
      }
    }
  }
}

let uniqueCombos = memoize();
console.log(uniqueCombos(adapters, 0));