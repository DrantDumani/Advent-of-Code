const fs = require("fs")

const raw = fs.readFileSync("map.txt", "utf8");

const grid = raw.split(/[\n\s]/).map(str => str.split(""));

function findTrees(area, dx = 100, dy = 100){
  let x = 0, y = 0;
  let trees = 0;
  while (y < area.length) {
    if (area[y][x] === "#") trees += 1;
    x = (x + dx) % area[y].length;
    y = y + dy;
  }
  return trees;
}

const slopes = [[1,1], [3,1], [5,1], [7,1], [1,2]];
let answer = slopes.map(slope => findTrees(grid, slope[0], slope[1]))
  .reduce((total, num) => total * num, 1);

console.log(answer)