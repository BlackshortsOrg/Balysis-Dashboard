import SecurityCards from "@/components/Dashboard/SecurityCards";
import Image from "next/image";

export default function client() {
  return (
    <div className="bg-[#F8FCFF] w-full h-[100vh]">
      <div className="flex flex-row w-full pt-10">
        <h1 className="pl-[50px] font-bold text-2xl">Nandini Arora</h1>
        <div className="px-4">
          <Image src="/images/dummy.png" height={40} width={40} />
        </div>
      </div>
      <SecurityCards />
      <div className="mx-12 mt-4 py-4 bg-[#EAF6FF] font-semibold">
        <div className="mx-8 grid grid-cols-12">
          <div className="col-span-5">Strategies</div>
          <div className="col-span-7 flex flex-row justify-between">
            <div>LTP</div>
            <div>Unrealized P/L</div>
            <div>Realized P/L</div>
            <div className="">P/L</div>
          </div>
        </div>
      </div>
      <div className="mx-12 bg-white mt-4 rounded-md shadow-md">
        <div className="mx-8 grid grid-cols-12 py-4">
          <div className="col-span-7 text-3xl font-bold">MANUAL</div>
          <div className="col-span-5 flex flex-row justify-between">
            <div className="text-red-400">-652.5</div>
            <div>0</div>
            <div className="text-red-400 pr-2">-652.5</div>
          </div>
        </div>
        <div className="mx-8 flex flex-row pb-4">
          <div className="basis-5/6 flex flex-row">
            <button className="bg-[#41AFFF] text-white shadow-sm py-2 px-6 mx-2 rounded-md">
              Add
            </button>
            <button className="bg-[#41AFFF] text-white shadow-sm py-2 px-6 mx-2 rounded-md">
              Notes
            </button>
            <button className="bg-[#41AFFF] text-white shadow-sm py-2 px-6 mx-2 rounded-md">
              Exit(2)
            </button>
          </div>
          <div className="basis-1/6">
            <button className="border border-[#41AFFF] text-[#41AFFF] px-8 py-2">
              (2) Positions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
