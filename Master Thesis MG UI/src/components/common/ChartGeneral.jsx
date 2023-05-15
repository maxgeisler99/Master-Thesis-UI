import React from "react";
import LineChart from "./LineChart";
import * as dataServiceT from "../../services/tindeqService";
import * as dataServiceF  from "../../services/forcePlateService";
import * as dataServiceM from "../../services/movesenseService";


export default function ChartGeneral({name}) {
  const TindeqForces = dataServiceT.combineForcesT();
  const ForceplateForces = dataServiceF.combineForcesF();
  const MovesenseData = dataServiceM.combineDataM();
  let inputname = name;


  switch (inputname) {
    case "ForcePlate":
      return (
        <div>
          <p className="header">ForcePlate</p>
          <LineChart
            labels={ForceplateForces.map((t) => t.time)}
            datasets={[
              {
                label: "Force right",
                data: ForceplateForces.map((f) => f.force.force1)
              },
              {
                label: "Force left",
                data: ForceplateForces.map((f) => f.force.force2)
              }
            ]}
          /> 
        </div>
      );
      
    case "Progressor":
      return (
        <div>
          <p className="header">Tindeq</p>
          <LineChart
            labels={TindeqForces.map((t) => t.time)}
            datasets={[
              {
                label: "Force",
                data: TindeqForces.map((f) => f.force.force1)
              },
              {
                label: "",
                data: []
              }
            ]}
          />
        </div>
      );
      
    case "Movesense":
      return (
        <div>
          <p className="header">Movesense</p>
          <LineChart
            labels={MovesenseData.map((t) => t.time)}
            datasets={[
              // {
              //   label: "AccX",
              //   data: MovesenseData.map((f) => f.data.AccX)
              // },
              // {
              //   label: "AccY",
              //   data: MovesenseData.map((f) => f.data.AccY)
              // },
              // {
              //   label: "AccZ",
              //   data: MovesenseData.map((f) => f.data.AccZ)
              // },
              // {
              //   label: "GyroX",
              //   data: MovesenseData.map((f) => f.data.GyroX)
              // },
              {
                label: "GyroY",
                data: MovesenseData.map((f) => f.data.GyroY)
              },
              {
                label: "GyroZ",
                data: MovesenseData.map((f) => f.data.GyroZ)
              },
            ]}
          />
        </div>
      );
      
    default:
      console.log("wrong input");
      break;
  }
  
}


