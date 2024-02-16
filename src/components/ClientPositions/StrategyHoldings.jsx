export default function StrategyHoldings({ stock, data }) {
  return (
    <div className="mx-12 py-4 bg-[#EAF6FF] font-semibold border border-t-0 border-[#41AFFF]">
      <div className="mx-8 grid grid-cols-12">
        <div className="col-span-5">
          {data.netqty < 0 ? (
            <span className="text-red-600 font-bold bg-red-200 p-1 mr-2">
              SHORT
            </span>
          ) : (
            <span className="text-green-600 font-bold bg-green-200 p-1 mr-2">
              LONG
            </span>
          )}
          <span className="font-bold text-xl">{stock}</span>
          <div className="flex flex-row">
            <div className="ml-20 text-sm px-2 mt-2 text-gray-500 border border-gray-500 w-fit">
              QTY: {data.netqty}
            </div>
            <div className="text-sm px-2 mt-2 text-gray-500 border border-gray-500 w-fit">
              AVG PRICE: {data.avgprice}
            </div>
          </div>
        </div>
        <div className="col-span-7 flex flex-row justify-between">
          <div>{data.ltp}</div>
          <div>{data.unrealizedpnl}</div>
          <div>{data.realizedpnl}</div>
          <div className="">
            {parseFloat(data.unrealizedpnl) + parseFloat(data.realizedpnl)}
          </div>
        </div>
      </div>
    </div>
  );
}
