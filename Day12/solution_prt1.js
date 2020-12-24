const fs = require("fs");

const raw = fs.readFileSync("directions.txt", "utf8");

const directions = raw.trim().split(/\n/).map(str => str.split(/(?<=\D)/));

function moveShip(directions, currDir = "E"){
  const changeDir = (dir, degrees) => {
    const cardinal = ["N", "E", "S", "W"];
    let currIndex = cardinal.indexOf(dir);
    let nextDir = ((currIndex) + degrees/90) % cardinal.length;
    return cardinal[nextDir];
  }
  
  let facing = currDir;
  let dx = 0, dy = 0;
  const increment = {N: [0,-1], S: [0,1], E: [1,0], W: [-1,0]}
  
  for (let dir of directions){
    if (dir[0] === "F"){
      dx += increment[facing][0] * dir[1];
      dy += increment[facing][1] * dir[1];
    }
    else if (dir[0] === "R")
      facing = changeDir(facing, dir[1]);
    else if (dir[0] === "L")
      facing = changeDir(facing, 360 - dir[1]);
    else {
      dx += increment[dir[0]][0] * dir[1];
      dy += increment[dir[0]][1] * dir[1];
    }
  }
  return Math.abs(dx) + Math.abs(dy); 
}

console.log(moveShip(directions))