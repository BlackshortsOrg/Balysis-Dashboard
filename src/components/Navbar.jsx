import "./Navbar.css"
import Image from 'next/image'

export default function Navbar(){
    return(
        <div className="w-[15vw] h-[100vh] shadow flex flex-col pt-5">
            <Image src="/logo.png" width="200" height="100" alt="balysis" />
            <h1 className="text-[22px] font-bold mb-9 pl-6">Dashboard</h1>
            <div className="pl-9">
            <h1 className="text-[16px] font-medium mb-6">Accounts</h1>
            <h1 className="text-[16px] font-medium mb-6">Client Positions</h1>
            <h1 className="text-[16px] font-medium mb-6">Manual Trade</h1>
            <h1 className="text-[16px] font-medium mb-6">Algo Trade</h1>
            <h1 className="text-[16px] font-medium mb-6">Transaction History</h1>
            <h1 className="text-[16px] font-medium mb-6">Historical data</h1>
            </div>
            <h1 className="text-[16px] text-[#41AFFF] font-bold mb-6 pl-9 mt-[30vh]">Log Out</h1>
        </div>
    )
}