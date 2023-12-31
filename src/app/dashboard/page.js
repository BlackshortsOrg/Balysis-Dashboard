import DataCard from "@/components/Dashboard/DataCard";
import DeployedStrategies from "@/components/Dashboard/DeployedStrategies";
import SecurityCards from "@/components/Dashboard/SecurityCards";

export default function dashboard() {
  return (
    <div className="bg-[#FBFEFF] w-full h-[100vh]">
      <h1 className="pt-10 pl-[50px] font-bold text-2xl">Admin Dashboard</h1>
      <SecurityCards />
      <div className="flex flex-row">
        <div className="flex flex-col">
          <DataCard />
          <DataCard />
        </div>
        <DeployedStrategies />
      </div>
    </div>
  );
}
