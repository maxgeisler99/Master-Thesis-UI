import React, { useState } from "react";
import BluetoothDevice from "../common/BluetoothDevice";
import { parse12BitInts } from "../../utils/12bitToFloat";


export let forcearrayforcePlate1 = [];
export let forcearrayforcePlate2 = [];
export let framearray = [];
export function ForcePlateHandler() {
  /* Force plates UUIDs */
  const PRIMARY_SERVICE = "713d0000-503e-4c75-ba94-3148f18d941e";
  const NOTIFY = "713d0002-503e-4c75-ba94-3148f18d941e";
  const WRITE = "713d0003-503e-4c75-ba94-3148f18d941e";
  const start = "startForceplate";
  const stop = "stopForceplate";
  const tare = "tareForceplate";
  const gain1 = "setGain1";
  const gain2 = "setGain2";
  const save = "savetoflash";

  const [batteryLevel, setBatteryLevel] = useState(null);
  const [powerBankLevel, setPowerBankLevel] = useState(null);
  const [frameCounter, setFrameCounter] = useState(0);
  const [forceData, setForceData] = useState([]);
  const [forceData1, setForceData1] = useState([]);
  const [forceData2, setForceData2] = useState([]);

  function intToFloat(value) {
    var integerPart = value >> 4; // get the integer part (8 bits)
    var fractionalPart = value & 0x0f; // get the fractional part (4 bits)
    return integerPart + fractionalPart / 16; // combine integer and fractional parts
  }

  function parseSensorData(event) {
    const data = new Uint8Array(event.target.value.buffer);
    const forceData1 = [];
    const forceData2 = [];
    const framearray1 = [];
    const startByte = data[0];
    // Check if start byte is correct
    if (startByte !== 12) {
      return null;
    }

    // Extract timestamp from the event buffer
    const time = event.timeStamp;
    // Convert frame counter
    const frameCounter = data[3] | (data[2] << 8);
    framearray1.push(frameCounter);
    framearray = framearray1;

    // Parse buffer into individual data fields
    const forceData = [];
    for (let i = 4; i < 20; i += 4) {
      const forcePair1 = intToFloat(data[i + 1] | (data[i] << 8));
      const forcePair2 = intToFloat(data[i + 3] | (data[i + 2] << 8));
      forceData1.push(forcePair1);
      forceData2.push(forcePair2);
    }
    forcearrayforcePlate1 = forceData1;
    forcearrayforcePlate2 = forceData2;
    setForceData1(forceData1);
    setForceData2(forceData2);
    // Return an object containing the parsed values
    const result = {
      time,
      frameCounter,
      batteryLevel,
      powerBankLevel,
      forceData,
    };
    
  }

  return (
    <div className="forcePlate-Container">
      <BluetoothDevice
        namePrefix={"ForcePlate"}
        primaryService={PRIMARY_SERVICE}
        notifications={NOTIFY}
        write={WRITE}
        dataHandler={parseSensorData}
        start={start}
        stop={stop}
        tare={tare}
        gain1={gain1}
        gain2={gain2}
        save={save}
      />
      {/* {notificationValue && <p>Notification value: {notificationValue}</p>} */}
      {/* {batteryLevel && <p>Battery level: {batteryLevel}</p>}
      {powerBankLevel && <p>Power bank level: {powerBankLevel}</p>}
      {frameCounter && <p>Frame Counter: {frameCounter}</p>}
      {forceData && <p>Force Data value: {forceData}</p>} */}
    </div>
  );
}
