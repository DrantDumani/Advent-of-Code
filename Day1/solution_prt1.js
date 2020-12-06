const fs = require("fs")

const raw = fs.readFileSync("expense_report.txt", "utf8")

const report = raw.split(/\n/).map(n => Number(n));

function findExpenses(array) {
  for (let index = 0; index < array.length - 1; index++){
    let num = array[index];
    for (let start = index + 1; start < array.length; start++){
      if (num + array[start] == 2020) return num * array[start];
    }
  }
}

console.log(findExpenses(report))