"use client"
import StrategyCardHeader from "./StrategyCardHeader";
import StrategyHoldings from "./StrategyHoldings";

import { useState } from "react";

export default function StrategyCard({ strategy, user_id, daily, ltps }) {
  const [show, setShow] = useState(false);
  return (
    <div>
      <StrategyCardHeader
        name={strategy.name}
        unrealizedpnl={strategy.unrealizedpnl}
        realizedpnl={strategy.realizedpnl}
        setShow={setShow}
        show={show}
        numpositions={Object.entries(strategy.positions).filter(([stock, data]) => data.netqty !== 0).length + Object.entries(strategy.holdings).filter(([stock, data]) => data.netqty !== 0).length}
        active={strategy.active}
        subscribed={strategy.subscribed}
        user_id={user_id}
        strategy_id={strategy.id}
        daily={daily}
      />
      {show && Object.keys(strategy.holdings).length > 0 && <div className="mx-12 py-2 bg-[#EAF6FF] font-semibold border border-t-0 border-[#41AFFF]">
        <div className="ml-12 font-bold text-xl">HOLDINGS</div>
      </div>}
      {show && Object.entries(strategy.holdings).map(([stock, data]) => <StrategyHoldings key={stock} stock={stock} data={data} ltp={ltps[data.name].toFixed(2)} />)}
      {show && Object.keys(strategy.positions).length > 0 && <div className="mx-12 py-2 bg-[#EAF6FF] font-semibold border border-t-0 border-[#41AFFF]">
        <div className="ml-12 font-bold text-xl">POSITIONS</div>
      </div>}
      {show && Object.entries(strategy.positions).map(([stock, data]) => <StrategyHoldings key={stock} stock={stock} data={data} ltp={ltps[data.name].toFixed(2)} />)}
    </div>
  )
}
