const fs = require("fs");

const raw = fs.readFileSync("answers.txt", "utf8");

const answers = raw.split(/\n\n/).map(str => str.replace(/\n/g, ""));

//We're only interested in which questions any single person answered yes to
function sumOfYesAnswers(answers) {
  let sum = 0;
  for (let group of answers) {
    let answeredYes = [];
    let yesGrp = 0;
    for (let answer of group) {
      if (answeredYes.indexOf(answer) === -1) {
        answeredYes.push(answer);
        yesGrp += 1;
      }
      else continue;
    }
    sum += yesGrp;
  }
  return sum;
}
console.log(sumOfYesAnswers(answers))