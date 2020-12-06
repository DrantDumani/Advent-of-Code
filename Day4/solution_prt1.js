const fs = require("fs")

const raw = fs.readFileSync("passports.txt", "utf8")


const passPortData = raw.split(/\n\n/)
.map(str => str.replace(/\n/g, " ")
     .split(" ").reduce((obj, str) => {
  let keyVal = str.split(":");
  obj[keyVal[0]] = keyVal[1];
  return obj;
}, {}));

function validPass(passPorts){
  let fields = ["hgt", "iyr", "ecl", "eyr", "pid", "hcl", "byr"];
  let valid = 0;
  for (let passport of passPorts){
    if (fields.every(el => el in passport)) {
      valid += 1;
      }
  }
  return valid;
}
console.log(validPass(passPortData));