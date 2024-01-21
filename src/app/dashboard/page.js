import DataCard from "@/components/Dashboard/DataCard";
import DeployedStrategies from "@/components/Dashboard/DeployedStrategies";
import SecurityCards from "@/components/Dashboard/SecurityCards";

export default function dashboard() {
  const metrics =
  {
    "Total P&L": "1,00,000",
    "Realized P&L": "1,00,000",
    "Unrealized P&L": "1,00,000",
    "Equity P&L": "1,00,000",
    "Derivative P&L": "1,00,000",
    "Commodity P&L": "1,00,000",
  }

  return (
    <div className="bg-[#FBFEFF] w-full h-[100vh] overflow-auto">
      <h1 className="pt-10 pl-[50px] font-bold text-2xl">Admin Dashboard</h1>
      <SecurityCards metrics={metrics} />
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
