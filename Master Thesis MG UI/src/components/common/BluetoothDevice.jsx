import React, { useState } from "react";
import { SaveToFile } from "../../utils/saveFile";
import ChartGeneral from "./ChartGeneral";
import {exportForceTimeTindeq, forceTindeq} from "../../services/tindeqService";
import {exportForceTimeForcePlate, force1ForcePlate, force2ForcePlate} from "../../services/forcePlateService";
import {exportDataTimeMovesense} from "../../services/movesenseService";

function BluetoothDevice({
  namePrefix,
  primaryService,
  notifications,
  write,
  dataHandler,
  start,
  stop,
  tare, gain1, gain2, save
}) {
  const [device, setDevice] = useState(null);
  const [deviceConnected, setDeviceConnected] = useState(false);
  const [characteristic, setCharacteristic] = useState(null);
  const [mean1, setMean1] = useState(0);
  const [mean2, setMean2] = useState(0);
  const [mean3, setMean3] = useState(0);

  async function connectToDevice() {
    try {
      const device = await navigator.bluetooth.requestDevice({
        filters: [
          {
            namePrefix: namePrefix,
          },
        ],
        optionalServices: [primaryService],
      });
      await device.gatt.connect();
      console.log("Connected to device: " + device);
      setDevice(device);
      setDeviceConnected(true);
    } catch (error) {
      console.error("Failed to connect to device: " + error);
    }
  }

  async function startNotificationService() {
    if (device) {
      try {
        const service = await device.gatt.getPrimaryService(primaryService);
        const characteristic = await service.getCharacteristic(notifications);
        setCharacteristic(characteristic);
        await characteristic.startNotifications();
        console.log("Started notification service");
        /* Call the event handler function passed via props */
        characteristic.addEventListener(
          "characteristicvaluechanged",
          dataHandler
        );
      } catch (error) {
        console.error("Failed to start notification service: " + error);
      }
    }
  }

  async function writetoDevice(command) {
    if (device) {
      try {
        const service = await device.gatt.getPrimaryService(primaryService);
        const characteristic = await service.getCharacteristic(write);
        setCharacteristic(characteristic);
        const com = command;
        var val;
        switch (com) {
          case "startTindeq":
            val = stringToByteArray("e");

            break;
          case "stopTindeq":
            val = stringToByteArray("f"); 

            break;
          case "tareTindeq":
            val = stringToByteArray("d");   

            break;
          case "startMovesense":
            // frequency is 52 and IMU6 is used
            //"/Meas/IMU6/52" ascii to bytes
            val = new Uint8Array([1, 99, 47, 77, 101, 97, 115, 47, 73, 77, 85, 54, 47, 53, 50]);
            break;
          case "stopMovesense":
            val = new Uint8Array([2, 99]);

            break;
          case "startForceplate":
            val = new Uint8Array([241, 2]);

            break;
          case "stopForceplate":
          val = new Uint8Array([241, 0]);
          break;
          case "tareForceplate":
          val = new Uint8Array([253, 48]);
          break;
          case "setGain1":
            val = new Uint8Array([253, 65, 5, 140]);   // 0xFD41058C
            break;
          case "setGain2":
            val = new Uint8Array([253, 66, 5, 200]);   // 0xFD4205C8
          break;
          case "savetoflash":
            val = new Uint8Array([ 253, 85 ]);
          break;
          default:
            console.log("wrong command");
            break;
        }
        await characteristic.writeValue(val);
        console.log("Wrote to device");
        
      } catch (error) {
        console.error("Failed to write to device: " + error);
      }
    }
  }

  async function stopNotificationService() {
    if (device) {
      try {
        // const service = await device.gatt.getPrimaryService(primaryService);
        // const characteristic = await service.getCharacteristic(notifications);
        await characteristic.stopNotifications();
        console.log("Stopped notification service");
      } catch (error) {
        console.error("Failed to stop notification service: " + error);
      }
    }
  }

  function stringToByteArray(str) {
    if (!str) {
      return new Uint8Array();
    }
  
    var byteArray = [];
    for (var i = 0; i < str.length; i++) {
      var charCode = str.charCodeAt(i);
      byteArray.push(charCode);
    }
    //console.log(byteArray);
    return new Uint8Array(byteArray);
  }

  function Save(name) {
    switch (name) {
      case "ForcePlate":
        SaveToFile(exportForceTimeForcePlate);
        break;
      case "Progressor":
        SaveToFile(exportForceTimeTindeq);
        break;
      case "Movesense":
        SaveToFile(exportDataTimeMovesense);
        break;
      default:
        console.log("wrong input");
        break;
    }
  }

  function Mean(name) {
    switch (name) {
      case "ForcePlate":
        setMean1(calculateMean(force1ForcePlate));
        setMean2(calculateMean(force2ForcePlate));

        var sum = force1ForcePlate.map(function (num, idx) {
          return num + force2ForcePlate[idx];
        });

        setMean3(calculateMean(sum));
        break;
        case "Progressor":
          setMean1(calculateMean(forceTindeq));
          break;
      default:
        console.log("wrong input");
        break;
    }
  }
  function calculateMean(arr) {
    if (!Array.isArray(arr)) {
      throw new Error("Input is not an array.");
    }
  
    if (arr.length === 0) {
      throw new Error("Array is empty.");
    }
  
    const sum = arr.reduce((acc, val) => acc + val, 0);
    return sum / arr.length;
  }
  return (
    <div>
      <button onClick={() => connectToDevice()}>
        Connect to Bluetooth Device
      </button>
      <p>Device connected: {deviceConnected ? "Yes" : "No"}</p>
      {deviceConnected && (
         <div>
          <ChartGeneral
          name={namePrefix}
          />
          <div>
            <button onClick={() => startNotificationService()}>
              Start Notification Service
            </button>
            <button onClick={() => stopNotificationService()}>
              Stop Notification Service
            </button>
            <button onClick={() => writetoDevice(start)}> 
              Start Measurement
            </button>
            <button onClick={() => writetoDevice(stop)}> 
              Stop Measurement
            </button>
            <button onClick={() => writetoDevice(tare)}> 
              Tare
            </button>
            <div>
            <button onClick={() => writetoDevice(gain1)}> 
              set gain 1
            </button>
            <button onClick={() => writetoDevice(gain2)}> 
              set gain 2
            </button>
            <button onClick={() => writetoDevice(save)}> 
              save to flash
            </button>
            </div>
          </div>
          <button onClick={() => Save(namePrefix)}> 
              Save
            </button>
            <div>
            <p>Mean right: {mean1}</p>
            <p>Mean left: {mean2}</p>
            <p>Mean combined: {mean3}</p>
            <button onClick={() => Mean(namePrefix)}>
              update mean values
            </button>
          </div>
          </div>
        )}
      </div>
        );
}

export default BluetoothDevice;
