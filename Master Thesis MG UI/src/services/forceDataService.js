import { forcePlate1, forcePlate2 } from "./forceData";

export function combineForces() {
  let CombinedForce = [];
  let modifiedIndex = 0;
  for (let i = 0; i < forcePlate1.length; i++) {
    for (let j = 0; j < forcePlate2.length; j++) {
      if (forcePlate1[i].index === forcePlate2[j].index) {
        let timeDiff = Math.abs(forcePlate1[i].time - forcePlate2[j].time);
        let maxTime = Math.max(forcePlate1[i].time, forcePlate2[j].time);
        let t1 = forcePlate1[i].time;
        let t2 = forcePlate1[i].time + 120;
        let step = (t2 - t1) / 3;
        let timeArr = [forcePlate1[i].time];
        if (timeDiff / maxTime <= 0.01) {
          for (let k = 0; k <= 3; k++) {
            timeArr.push(t1 + step * k);
            CombinedForce.push({
              force: {
                forcePlate1: forcePlate1[i].force[k] + 4000,
                forcePlate2: forcePlate2[j].force[k] + 4000,
              },
              time: timeArr[k] / 10000,
              index: forcePlate1[i].index,
              modifiedIndex: modifiedIndex,
            });
            modifiedIndex++;
          }
        }
      }
    }
  }

  return CombinedForce;
}

export function getTime() {
  return;
}
export function getIndex() {
  return;
}

export function minTime() {
  const array = forcePlate1.concat(forcePlate2);
  return minBy(array, (x) => x.time);
}
export function maxTime() {
  const array = forcePlate1.concat(forcePlate2);
  return maxBy(array, (x) => x.time);
}

const minBy = (arr, fn) =>
  Math.min(...arr.map(typeof fn === "function" ? fn : (val) => val[fn]));

const maxBy = (arr, fn) =>
  Math.max(...arr.map(typeof fn === "function" ? fn : (val) => val[fn]));
