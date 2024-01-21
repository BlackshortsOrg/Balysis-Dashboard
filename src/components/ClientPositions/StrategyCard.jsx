"use client"
import StrategyCardHeader from "./StrategyCardHeader";
import StrategyHoldings from "./StrategyHoldings";

import { useState } from "react";

export default function StrategyCard({ strategy }) {
  const [show, setShow] = useState(false);
  return (
    <div>
      <StrategyCardHeader
        name={strategy.name}
        unrealizedpnl={strategy.unrealizedpnl}
        realizedpnl={strategy.realizedpnl}
        setShow={setShow}
        show={show}
        numpositions={Object.entries(strategy.positions).length + Object.entries(strategy.holdings).length}
      />
      {show && <div className="mx-12 py-2 bg-[#EAF6FF] font-semibold border border-t-0 border-[#41AFFF]">
        <div className="ml-12 font-bold text-xl">HOLDINGS</div>
      </div>}
      {show && Object.entries(strategy.holdings).map(([stock, data]) => <StrategyHoldings stock={stock} data={data} />)}
      {show && <div className="mx-12 py-2 bg-[#EAF6FF] font-semibold border border-t-0 border-[#41AFFF]">
        <div className="ml-12 font-bold text-xl">POSITIONS</div>
      </div>}
      {show && Object.entries(strategy.positions).map(([stock, data]) => <StrategyHoldings stock={stock} data={data} />)}
    </div>
  )
}
