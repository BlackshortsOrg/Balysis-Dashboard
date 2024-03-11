"use client";
import "./Navbar.css";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineTeam, AiOutlineStock, AiFillCaretRight, AiFillSliders, AiFillFund, AiOutlineCodeSandbox } from "react-icons/ai"

export default function Navbar() {
  function logout() {
    window.sessionStorage.removeItem("token");
    window.location.href = "/login";
  }
  return (
    <div className="w-[15vw] h-[100vh] shadow drop-shadow-lg flex flex-col pt-5 justify-evenly">
      {/*TODO Replace logo with better quality logo */}
      <Image
        src="/images/balysislogo.png"
        width="200"
        height="100"
        alt="balysis"
        className=""
      />
      <Link href="/dashboard" className="">
        <h1 className="text-[22px] font-bold mb-9 pl-6">Dashboard</h1>
      </Link>
      <div className="">
        <Link className="flex flex-row" href="/accounts">
          <h1 className="text-[16px] font-medium w-full py-4 hover:shadow-2xl hover:rounded-lg pl-6 hover:border-[2px] hover:bg-slate-800 hover:text-white mx-2 flex flex-row">
            <AiOutlineTeam className="mr-2 mt-1 scale-[1.50]" />
            <p>Accounts</p>
          </h1>
        </Link>
        <Link className="flex flex-row" href="/clientpositions">
          <h1 className="text-[16px] font-medium w-full py-4 hover:shadow-2xl hover:rounded-lg pl-6 hover:border-[2px] hover:bg-slate-800 hover:text-white mx-2 flex flex-row">
            <AiOutlineStock className="mr-2 mt-1 scale-[1.50]" />
            Client Positions
          </h1>
        </Link>
        <Link className="flex flex-row" href="/manualtrade">
          <h1 className="text-[16px] font-medium w-full py-4 hover:shadow-2xl hover:rounded-lg pl-6 hover:border-[2px] hover:bg-slate-800 hover:text-white mx-2 flex flex-row">
            <AiFillCaretRight className="mr-2 mt-1 scale-[1.50]" />
            Manual Trade
          </h1>
        </Link>
        <Link className="flex flex-row" href="/algotrade">
          <h1 className="text-[16px] font-medium w-full py-4 hover:shadow-2xl hover:rounded-lg pl-6 hover:border-[2px] hover:bg-slate-800 hover:text-white mx-2 flex flex-row">
            <AiFillSliders className="mr-2 mt-1 scale-[1.50]" />
            Algo Trade
          </h1>
        </Link>
        <Link className="flex flex-row" href="/transactionhistory">
          <h1 className="text-[16px] font-medium w-full py-4 hover:shadow-2xl hover:rounded-lg pl-6 hover:border-[2px] hover:bg-slate-800 hover:text-white mx-2 flex flex-row">
            <AiFillFund className="mr-2 mt-1 scale-[1.50]" />
            Transaction History
          </h1>
        </Link>
        <Link className="flex flex-row" href="/sets">
          <h1 className="text-[16px] font-medium w-full py-4 hover:shadow-2xl hover:rounded-lg pl-6 hover:border-[2px] hover:bg-slate-800 hover:text-white mx-2 flex flex-row">
            <AiOutlineCodeSandbox className="mr-2 mt-1 scale-[1.50]" />
            Sets
          </h1>
        </Link>
      </div>
      <h1
        className="text-[16px] text-[#41AFFF] font-bold mb-6 pl-9 mt-[30vh] hover:cursor-pointer"
        onClick={logout}
      >
        Log Out
      </h1>
    </div>
  );
}
