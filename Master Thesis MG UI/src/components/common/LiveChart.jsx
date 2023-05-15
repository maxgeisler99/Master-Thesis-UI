import React from "react";
import { ForcePlateHandler } from "../forcePlates/ForcePlateHandler";
import { Tindeq } from "../tindeq/tindeq";
import { Movesense } from "../movesense/Movesense";

export default function LiveChart() {
  return (
    <div>
      <div>
        <p className="header">Connect to Force Plates</p>
        <ForcePlateHandler></ForcePlateHandler>
      </div>
      <div>
        <p className="header">Connect to Tindeq</p>
        <Tindeq></Tindeq>
      </div>
      <div>
        <p className="header">Connect to Movesense</p>
        <Movesense></Movesense>
      </div>
    </div>
  );
}
