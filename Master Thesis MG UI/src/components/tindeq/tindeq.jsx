import React, { useState } from "react";
import BluetoothDevice from "../common/BluetoothDevice";

export let forcearraytindeq = [];
export let timearraytindeq = [];
export function Tindeq() {
  /* Tindeq UUIDs */
  const PRIMARY_SERVICE = "7e4e1701-1ea6-40c9-9dcc-13d34ffead57";
  const NOTIFY = "7e4e1702-1ea6-40c9-9dcc-13d34ffead57";
  const WRITE = "7e4e1703-1ea6-40c9-9dcc-13d34ffead57";
  const start = "startTindeq";
  const stop = "stopTindeq";
  const tare = "tareTindeq";

  /* Here we set state if we want to access data in other parts of the app. */
  const [batteryLevel, setBatteryLevel] = useState(null);
  const [frameCounter, setFrameCounter] = useState(0);
  const [timeStamp, setTimeStamp] = useState(0);
  const [forceData, setForceData] = useState([]);
  const [TindeqFData, setTFData] = useState([]);
  const [TindeqTData, setTTData] = useState([]);

  function parseSensorData(event) {
    /* Code for data processing goes here */
    const forceData = [];
    const timeData = [];
    const data = new Uint8Array(event.target.value.buffer);
    const time = event.timeStamp;
    console.log("Time: ", time);

    //loop through data, the first two bytes are neglected as they don't contain any data
    // the data consists of 4 bytes force value followed by 4 bytes time value and then the next pair follows
    // force data from Uint8Array
    for (let i = 2; i < data.length; i += 8) {
      const dataViewforce = new DataView(new ArrayBuffer(4));
      const bytesforce = [data[i + 3], data[i + 2], data[i + 1], data[i]];
      bytesforce.forEach((b, i) => dataViewforce.setUint8(i, b));
      const floatforce = dataViewforce.getFloat32(0);
      forceData.push(floatforce);
      forcearraytindeq.push(floatforce);

      const dataViewtime = new DataView(new ArrayBuffer(4));
      const bytestime = [data[i + 7], data[i + 6], data[i + 5], data[i + 4]];
      bytestime.forEach((b, i) => dataViewtime.setUint8(i, b));
      const inttime = dataViewtime.getUint32(0);
      const floattime = parseFloat(inttime);
      timeData.push(floattime/1000000);
    }
    forcearraytindeq = forceData;
    timearraytindeq = timeData;
    setTFData(forceData);
    setTTData(timeData);
  }


  return (
    <div className="tindeq-Container">
      <BluetoothDevice
        namePrefix={"Progressor"} 
        primaryService={PRIMARY_SERVICE}
        notifications={NOTIFY}
        write={WRITE}
        dataHandler={parseSensorData}
        start={start}
        stop={stop}
        tare={tare}
      />
    </div>
  );
}

