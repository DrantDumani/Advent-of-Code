const fs = require("fs");

const raw = fs.readFileSync("times.txt", "utf8");

const times = raw.split(/[\n,]/).filter(el => el !== "x").map(num => Number(num));

function earlyBus(estDprt, busIDs){
  let shrtstWaitTime = Infinity;
  let busId = 0;
  
  for (let id of busIDs){
    let prevTrip = Math.floor(estDprt / id);
    let nextTime = id * (prevTrip + 1);
    let waitTime = nextTime - estDprt;
    if (waitTime === id) return 0;
    if (waitTime < shrtstWaitTime) {
      shrtstWaitTime = waitTime;
      busId = id;
    }
  }
  return shrtstWaitTime * busId;
}


console.log(earlyBus(times[0], times.slice(1)));