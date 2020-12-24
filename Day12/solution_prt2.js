const fs = require("fs");

const raw = fs.readFileSync("directions.txt", "utf8");

const directions = raw.trim().split(/\n/).map(str => str.split(/(?<=\D)/));

function moveShip(directions){
  const wayPnt = {x: 10, y: -1};
  
  const rotateWayPnt = (degrees) => {
    let radians = degrees * (Math.PI/180);
    let rx = Math.round(wayPnt.x * Math.cos(radians) - wayPnt.y * Math.sin(radians));
    let ry = Math.round(wayPnt.x * Math.sin(radians) + wayPnt.y * Math.cos(radians));
    
    wayPnt.x = rx;
    wayPnt.y = ry;
  }
  
  let dx = 0, dy = 0;
  const increment = {N: [0,-1], S: [0,1], E: [1,0], W: [-1,0]}
  
  for (let dir of directions){
    if (dir[0] === "F"){
      dx += wayPnt.x * dir[1];
      dy += wayPnt.y * dir[1];
    }
    else if (dir[0] === "R"){
      rotateWayPnt(dir[1]);
    }
    else if (dir[0] === "L"){
      rotateWayPnt(360 - dir[1]);
    }
    else {
      wayPnt.x += increment[dir[0]][0] * dir[1];
      wayPnt.y += increment[dir[0]][1] * dir[1];
    }
  }
  return Math.abs(dx) + Math.abs(dy); 
}

console.log(moveShip(directions))