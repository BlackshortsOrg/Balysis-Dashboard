import DataCard from "@/components/Dashboard/DataCard";
import SecurityCards from "@/components/Dashboard/SecurityCards";

export default function dashboard(){
    return(
        <div className="bg-[#FBFEFF] w-full">
            <SecurityCards/>
            <div className="flex flex-row">
                <div className="flex flex-col">
                    <DataCard/>
                    <DataCard/>
                </div>
            </div>
        </div>
    )
}