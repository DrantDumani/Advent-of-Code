const fs = require("fs");

const raw = fs.readFileSync("seats.txt", "utf8");

const seats = raw.trim().split(/\n/).map(row => row.split(""));

function finalSeatArrnge(layout){
  let newLayout = layout.map((row, rIndex) => row.map((seat, colIndex) => {
    if (seat === "L" && adjacentNum(layout, rIndex, colIndex) === 0) return "#";
    else if (seat === "#" && adjacentNum(layout, rIndex, colIndex) >= 4) return "L";
    else return seat;
  }));
  
  if (!compareLayouts(layout, newLayout)){
    return finalSeatArrnge(newLayout);
  }
  else {
    let seatNum = newLayout.reduce((total, row) => total + row.reduce((rowTtl, seat) =>{
      return seat === "#" ? (rowTtl + 1) : rowTtl + 0;
    }, 0), 0);
    return seatNum;
  }
}

function compareLayouts(grid1, grid2) {
  for (let i = 0; i < grid1.length; i++){
    for (let j = 0; j < grid1[i].length; j++) {
      if (grid1[i][j] !== grid2[i][j]) return false;
    }
  }
  return true;
}

function adjacentNum(grid, rwInd, clInd){
  let num = 0;
  for (let i = rwInd - 1; i <= rwInd + 1; i++){
    if (!grid[i]) continue;
    for (let j = clInd - 1; j <= clInd + 1; j++){
      if (i === rwInd && j === clInd) continue;
      if (grid[i][j] === "#") num += 1;
    }
  }
  return num;
}

console.log(finalSeatArrnge(seats));