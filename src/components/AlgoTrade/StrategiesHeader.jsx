export default function StrategiesHeader() {
  return (
    <div className="mx-12 mt-4 py-4 bg-[#EAF6FF] font-semibold">
      <div className="mx-8 grid grid-cols-12">
        <div className="col-span-7">Strategies</div>
        <div className="col-span-5 flex flex-row justify-between">
          <div>Unrealized P/L</div>
          <div>Realized P/L</div>
          <div className="">P/L</div>
        </div>
      </div>
    </div>
  )
}
