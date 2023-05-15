import React, { useState } from "react";
import BluetoothDevice from "../common/BluetoothDevice";

    export let xAcc = [];
    export let yAcc = [];
    export let zAcc = [];
    export let xGyro = [];
    export let yGyro = [];
    export let zGyro = []; 

export function Movesense() {
  /* UUIDs */
  const PRIMARY_SERVICE = "34802252-7185-4d5d-b431-630e7050e8f0";
  const NOTIFY = "34800002-7185-4d5d-b431-630e7050e8f0";
  const WRITE = "34800001-7185-4d5d-b431-630e7050e8f0";
  const start = "startMovesense";
  const stop = "stopMovesense";
  /* Here we set state if we want to access data in other parts of the app. */
  const [batteryLevel, setBatteryLevel] = useState(null);
  const [frameCounter, setFrameCounter] = useState(0);
  const [timeStamp, setTimeStamp] = useState(0);
  const [AccData, setAccData] = useState([]);

  function parseSensorData(event) {
    let xAcc1 = [];
    let yAcc1 = [];
    let zAcc1 = [];
    let xGyro1 = [];
    let yGyro1 = [];
    let zGyro1 = [];
    let val = new DataView(event.target.value.buffer);    
    let numOfSamples = (val.byteLength - 6) / (6*4);
    const time = event.timeStamp;
    console.log("Time: ", time);

  
    for (let i=0;i<numOfSamples;i++){
        let xAccNew = val.getFloat32(6 + i * 12, true);
        let yAccNew = val.getFloat32(6 + i * 12 + 4, true);
        let zAccNew = val.getFloat32(6 + i * 12 + 8, true);

        let xGyroNew = val.getFloat32(6 + i * 12 + numOfSamples * 12, true);
        let yGyroNew = val.getFloat32(6 + i * 12 + numOfSamples * 12 + 4 , true);
        let zGyroNew = val.getFloat32(6 + i * 12 + numOfSamples * 12 + 8, true);

        xAcc1.push(xAccNew);
        yAcc1.push(yAccNew);
        zAcc1.push(zAccNew);
        xGyro1.push(xGyroNew);
        yGyro1.push(yGyroNew);
        zGyro1.push(zGyroNew);
    }
    xAcc = xAcc1;
    yAcc = yAcc1;
    zAcc = zAcc1;
    xGyro = xGyro1;
    yGyro = yGyro1;
    zGyro = zGyro1; 
    setAccData(xAcc1);

  }


  return (
    <div className="Movesense-Container">
      <BluetoothDevice
        namePrefix={"Movesense"} 
        primaryService={PRIMARY_SERVICE}
        notifications={NOTIFY}
        write={WRITE}
        dataHandler={parseSensorData}
        start={start}
        stop={stop}
      />
    </div>
  );
}