const fs = require("fs")

const raw = fs.readFileSync("map.txt", "utf8")

const grid = raw.split(/[\n\s]/).map(str => str.split(""));

function findTrees(area){
  let dx = 3, dy = 1;
  let x = 0, y = 0;
  let trees = 0;
  while (y < area.length) {
    if (area[y][x] === "#") trees += 1;
    x = (x + dx) % area[y].length;
    y = y + dy;
  }
  return trees;
}

console.log(findTrees(grid))