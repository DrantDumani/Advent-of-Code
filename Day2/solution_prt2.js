const fs = require("fs")

const raw = fs.readFileSync("passwords.txt", "utf8")

const pssWrdData = raw.split(/\n(?=\d+)/);

function validPssWrd(passwords){
  let valid = 0;
  
  for (let data of passwords) {
    let dataSplit = data.split(": ");
    let password = dataSplit[1];
    let pos1 = Number(dataSplit[0].match(/^\d+/));
    let pos2 = Number(dataSplit[0].match(/-(\d+)/)[1]);
    let char = dataSplit[0][dataSplit[0].length - 1];
    
    if ((password[pos1 - 1] === char && password[pos2 - 1] !== char)
        || (password[pos1-1] !== char && password[pos2-1] === char)) {
        valid += 1;
    }
  }
  return valid
}

console.log(validPssWrd(pssWrdData))