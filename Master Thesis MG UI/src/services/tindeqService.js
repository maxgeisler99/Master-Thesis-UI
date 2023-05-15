import {forcearraytindeq, timearraytindeq} from "../components/tindeq/tindeq";

    let ForceTimeTindeq = [];
    export let exportForceTimeTindeq = [];
    export let forceTindeq = [];

  export function combineForcesT() {
    for (let k = 0; k < timearraytindeq.length; k++) {
      if (ForceTimeTindeq.length >= 500) {
        // Remove the first element of the array
        ForceTimeTindeq.shift();
        forceTindeq.shift();
      }
      ForceTimeTindeq.push({
      force: {
        force1: forcearraytindeq[k],
      },
        time: timearraytindeq[k],    
      });
      exportForceTimeTindeq.push({
        force: {
          force1: forcearraytindeq[k],
        },
          time: timearraytindeq[k],    
        });
        forceTindeq.push(forcearraytindeq[k]);
    }
    return ForceTimeTindeq;
  }
