"use client";
import "./Navbar.css";
import Image from "next/image";
import Link from "next/link";
import {
  AiOutlineTeam,
  AiOutlineStock,
  AiFillCaretRight,
  AiFillSliders,
  AiFillFund,
  AiOutlineCodeSandbox,
} from "react-icons/ai";

export default function Navbar() {
  function logout() {
    window.localStorage.removeItem("token");
    window.location.href = "/login";
  }
  return (
    <div className="w-[15vw] h-[100vh] shadow drop-shadow-lg flex flex-col pt-5 justify-between">
      {/*TODO Replace logo with better quality logo */}
      <div className="basis-3/12">
        <Image
          src="/images/balysislogo.png"
          width="200"
          height="100"
          alt="balysis"
          className=""
        />
        <Link href="/dashboard" className="">
          <h1 className="text-[22px] font-bold my-9 pl-6">Dashboard</h1>
        </Link>
      </div>
      <div className="basis-4/6">
        <Link className="flex flex-row" href="/accounts">
          <h1 className="text-[13px] font-medium w-full py-3 hover:shadow-2xl hover:rounded-lg pl-4 hover:border-[2px] hover:bg-slate-800 hover:text-white mx-2 flex flex-row">
            <AiOutlineTeam className="mr-2 mt-1 scale-[1.50]" />
            <p>Accounts</p>
          </h1>
        </Link>
        {/* <Link className="flex flex-row" href="/sets"> */}
        {/*   <h1 className="text-[16px] font-medium w-full py-4 hover:shadow-2xl hover:rounded-lg pl-6 hover:border-[2px] hover:bg-slate-800 hover:text-white mx-2 flex flex-row"> */}
        {/*     <AiOutlineCodeSandbox className="mr-2 mt-1 scale-[1.50]" /> */}
        {/*     Sets */}
        {/*   </h1> */}
        {/* </Link> */}
        <Link className="flex flex-row" href="/clientpositions">
          <h1 className="text-[13px] font-medium w-full py-3 hover:shadow-2xl hover:rounded-lg pl-4 hover:border-[2px] hover:bg-slate-800 hover:text-white mx-2 flex flex-row">
            <AiOutlineStock className="mr-2 mt-1 scale-[1.50]" />
            Client Positions
          </h1>
        </Link>
        <Link className="flex flex-row" href="/manualtrade">
          <h1 className="text-[13px] font-medium w-full py-3 hover:shadow-2xl hover:rounded-lg pl-4 hover:border-[2px] hover:bg-slate-800 hover:text-white mx-2 flex flex-row">
            <AiFillCaretRight className="mr-2 mt-1 scale-[1.50]" />
            Manual Trade
          </h1>
        </Link>
        <Link className="flex flex-row" href="/algotrade">
          <h1 className="text-[13px] font-medium w-full py-3 hover:shadow-2xl hover:rounded-lg pl-4 hover:border-[2px] hover:bg-slate-800 hover:text-white mx-2 flex flex-row">
            <AiFillSliders className="mr-2 mt-1 scale-[1.50]" />
            Algo Trade
          </h1>
        </Link>
        <Link className="flex flex-row" href="/transactionhistory">
          <h1 className="text-[13px] font-medium w-full py-3 hover:shadow-2xl hover:rounded-lg pl-4 hover:border-[2px] hover:bg-slate-800 hover:text-white mx-2 flex flex-row">
            <AiFillFund className="mr-2 mt-1 scale-[1.50]" />
            Transaction History
          </h1>
        </Link>
        <Link className="flex flex-row" href="/orderbook">
          <h1 className="text-[13px] font-medium w-full py-3 hover:shadow-2xl hover:rounded-lg pl-4 hover:border-[2px] hover:bg-slate-800 hover:text-white mx-2 flex flex-row">
            <AiFillFund className="mr-2 mt-1 scale-[1.50]" />
            Orderbook
          </h1>
        </Link>
        <Link className="flex flex-row" href="">
          <h1 className="text-[13px] font-medium w-full py-3 hover:shadow-2xl hover:rounded-lg pl-4 hover:border-[2px] hover:bg-slate-800 hover:text-white mx-2 flex flex-row">
            <AiFillFund className="mr-2 mt-1 scale-[1.50]" />
            Backtest & Report
          </h1>
        </Link>
      </div>
      <h1
        className="basis-1/6 align-middle text-[16px] text-[#41AFFF] font-bold pl-10 hover:cursor-pointer"
        onClick={logout}
      >
        Log Out
      </h1>
    </div>
  );
}
