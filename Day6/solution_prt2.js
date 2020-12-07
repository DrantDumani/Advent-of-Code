const fs = require("fs");

const raw = fs.readFileSync("answers.txt", "utf8");

const answers = raw.trim().split(/\n\n/).map(str => str.split(/\n/));

//Now we want the questions that everyone in the group answered yes to
function everyOneSaidYes(answers) {
  let sum = 0;
  for (let group of answers) {
    for (let answer of group[0]) {
      for (let char of answer) {
        let check = true;
        for (let i = 1; i < group.length; i++) {
          if (group[i].indexOf(char) === -1) {
            check = false;
            break;
          }
        }
        if (check) sum += 1;
      }
    }
  }
  return sum;
}

console.log(everyOneSaidYes(answers))