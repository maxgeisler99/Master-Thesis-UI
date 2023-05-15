import {forcearrayforcePlate1, forcearrayforcePlate2} from "../components/forcePlates/ForcePlateHandler";

export let exportForceTimeForcePlate = [];

let ForceTimeForcePlate = [];
export let force1ForcePlate = [];
export let force2ForcePlate = [];
let timeforcesensor = [];
let timer = 0;
  
  export function combineForcesF() {
    //const alpha = 1.57; // factor that the measured force is multiplied with (experimentally determined)
    // frequency 100Hz

    for (let k = 0; k < forcearrayforcePlate1.length; k++) {
      //console.log("successfully");
      
      if (ForceTimeForcePlate.length >= 500) {
        // Remove the first element of the array
        ForceTimeForcePlate.shift();
        timeforcesensor.shift();
        force1ForcePlate.shift();
        force2ForcePlate.shift();
      }

      timeforcesensor.push(timer*0.01);
      timer++;
      ForceTimeForcePlate.push({
      force: {
        force1: (forcearrayforcePlate1[k]),  // offset then multiply by factor alpha
        force2: (forcearrayforcePlate2[k]),  // offset then multiply by factor alpha
      },
        time: timeforcesensor[timeforcesensor.length-1],   
      });

      exportForceTimeForcePlate.push({
        force: {
          force1: (forcearrayforcePlate1[k]), // offset then multiply by factor alpha
          force2: (forcearrayforcePlate2[k]), // offset then multiply by factor alpha
        },
          time: timeforcesensor[timeforcesensor.length-1],   //needs to be changed  
        });

      

        force1ForcePlate.push(forcearrayforcePlate1[k]);
        force2ForcePlate.push(forcearrayforcePlate2[k]);
    }
   
    return ForceTimeForcePlate;

  
  }
