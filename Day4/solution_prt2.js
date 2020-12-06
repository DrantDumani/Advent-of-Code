const fs = require("fs")

const raw = fs.readFileSync("passports.txt", "utf8")

const passPortData = raw.split(/\n\n/)
.map(str => str.replace(/\n/g, " ")
     .split(" ").reduce((obj, str) => {
  let keyVal = str.split(":");
  obj[keyVal[0]] = keyVal[1];
  return obj;
}, {}));

function pssprtTests(pssprt) {
  let eyeClr = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
  
  if (Number(pssprt.byr) > 2002 || Number(pssprt.byr) < 1920) return false;
  if (Number(pssprt.iyr) > 2020 || Number(pssprt.iyr) < 2010) return false;
  if (Number(pssprt.eyr) > 2030 || Number(pssprt.eyr) < 2020) return false;
  if (!/^#[0-9a-f]{6}$/.test(pssprt.hcl)) return false;
  if (!eyeClr.includes(pssprt.ecl)) return false;
  if (!/^\d{9}$/.test(pssprt.pid)) return false;
  if (!pssprt.hgt.match(/^\d{2,3}(in|cm)$/)) return false;
  if (pssprt.hgt.match(/in/)) {
    if (Number(pssprt.hgt.match(/\d+/)) > 76 
        || Number(pssprt.hgt.match(/\d+/)) < 59) return false;
  }
  else if (pssprt.hgt.match(/cm/)) {
    if (Number(pssprt.hgt.match(/\d+/)) > 193 
        || Number(pssprt.hgt.match(/\d+/)) < 150) return false;
  }
  return true;
}

function validPass(passPorts){
  let fields = ["hgt", "iyr", "ecl", "eyr", "pid", "hcl", "byr"];
  let valid = 0;
  for (let passport of passPorts){
    if (!fields.every(el => el in passport)) continue;
    if (pssprtTests(passport)) valid += 1;
  }
  return valid;
}
console.log(validPass(passPortData))