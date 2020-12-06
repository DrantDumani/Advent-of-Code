const fs = require("fs")

const raw = fs.readFileSync("passwords.txt", "utf8")

const pssWrdData = raw.split(/\n(?=\d+)/);

function validPssWrd(passwords){
  let valid = 0;
  
  for (let data of passwords) {
    let count = 0;
    let dataSplit = data.split(": ");
    let password = dataSplit[1];
    let min = Number(dataSplit[0].match(/^\d+/));
    let max = Number(dataSplit[0].match(/-(\d+)/)[1]);
    let char = dataSplit[0][dataSplit[0].length - 1];
    
    for (let letter of password) {
      if (letter === char) count += 1;
    }
    if (count >= min && count <= max) valid += 1;
  }
  return valid
}

console.log(validPssWrd(pssWrdData))