const fs = require("fs");

const raw = fs.readFileSync("seats.txt", "utf8");

const seats = raw.trim().split(/\n/).map(row => row.split(""));

function finalSeatArrnge(layout){
  let newLayout = layout.map((row, rIndex) => row.map((seat, colIndex) => {
    if (seat === "L" && visibleSeats(layout, rIndex, colIndex) === 0) return "#";
    else if (seat === "#" && visibleSeats(layout, rIndex, colIndex) >= 5) return "L";
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

function visibleSeats(grid, rwInd, clInd){
  let num = 0;
  let mod = 1
  let w = true, nW = true, n = true, nE = true;
  let e = true, sE = true, s = true, sW = true;
  
  while (w || nW || n || nE || e || sE || s || sW) {
    if (w){
      if ((clInd - mod) < 0) w = false;
      else if (grid[rwInd][clInd - mod] !== ".") {
        if (grid[rwInd][clInd - mod] === "#") num +=1;
        w = false;
      }
    }
    if (n){
      if ((rwInd - mod) < 0) n = false;
      else if (grid[rwInd - mod][clInd] !== ".") {
        if (grid[rwInd - mod][clInd] === "#") num +=1;
        n = false;
      }
    }
    if (e){
      if ((clInd + mod) >= grid[rwInd].length) e = false;
      else if (grid[rwInd][clInd + mod] !== ".") {
        if (grid[rwInd][clInd + mod] === "#") num +=1;
        e = false;
      }
    }
    if (s){
      if ((rwInd + mod) >= grid.length) s = false;
      else if (grid[rwInd + mod][clInd] !== ".") {
        if (grid[rwInd + mod][clInd] === "#") num +=1;
        s = false;
      }
    }
    if (sE){
      if ((rwInd + mod) >= grid.length 
          || (clInd + mod) >= grid[rwInd].length) sE = false;
      else if (grid[rwInd + mod][clInd + mod] !== ".") {
        if (grid[rwInd + mod][clInd + mod] === "#") num +=1;
        sE = false;
      }
    }
    if (sW){
      if ((rwInd + mod) >= grid.length 
          || (clInd - mod) < 0) sW = false;
      else if (grid[rwInd + mod][clInd - mod] !== ".") {
        if (grid[rwInd + mod][clInd - mod] === "#") num +=1;
        sW = false;
      }
    }
    if (nW){
      if ((rwInd - mod) < 0 
          || (clInd - mod) < 0) nW = false;
      else if (grid[rwInd - mod][clInd - mod] !== ".") {
        if (grid[rwInd - mod][clInd - mod] === "#") num +=1;
        nW = false;
      }
    }
    if (nE){
      if ((rwInd - mod) < 0 
          || (clInd + mod) >= grid[rwInd].length) nE = false;
      else if (grid[rwInd - mod][clInd + mod] !== ".") {
        if (grid[rwInd - mod][clInd + mod] === "#") num +=1;
        nE = false;
      }
    }
    mod++;
  }
  return num;
}

console.log(finalSeatArrnge(seats));