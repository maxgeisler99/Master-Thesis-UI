import {xAcc, yAcc, zAcc, xGyro, yGyro, zGyro} from "../components/movesense/Movesense";


export let exportDataTimeMovesense = [];
let DataTimeMovesense = [];
export function combineDataM() {


    for (let k = 0; k < xAcc.length; k++) {
        if (DataTimeMovesense.length >= 500) {
        // Remove the first element of the array
        DataTimeMovesense.shift();
        }
        DataTimeMovesense.push({
        data: {
            AccX: xAcc[k],
            AccY: yAcc[k],
            AccZ: zAcc[k],
            GyroX: xGyro[k],
            GyroY: yGyro[k],
            GyroZ: zGyro[k],
        },
        time: xAcc[k],    //!!!!!!!!!!!!!!!!! wrong needs to be fixed with timestamp !!!!!!!!!!!!!!!!!
        });
        exportDataTimeMovesense.push({
        data: {
            AccX: xAcc[k],
            AccY: yAcc[k],
            AccZ: zAcc[k],
            GyroX: xGyro[k],
            GyroY: yGyro[k],
            GyroZ: zGyro[k],
        },
            time: xAcc[k],  //!!!!!!!!!!!!!!!!! wrong needs to be fixed with timestamp !!!!!!!!!!!!!!!!!
        });
    }
    return DataTimeMovesense;
}