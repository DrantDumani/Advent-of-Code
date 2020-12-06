const fs = require("fs")

const raw = fs.readFileSync("expense_report.txt", "utf8")

const report = raw.split(/\n(?=\d+)/).map(n => Number(n));

function findExpenses(array) {
  for (let index = 0; index < array.length; index++){
    let num = array[index];
    for (let start = index + 1; start < array.length; start++){
      if (num + array[start] >= 2020) continue;
      let num2 = array[start];
      for (let start2 = index + 2; start2 < array.length; start2++){
        if (num + num2 + array[start2] == 2020) return num * num2 * array[start2];
      }
    }
  }
}

console.log(findExpenses(report))