"use client";
import { activeClientPositionsAPI } from "@/api/activePositions";
import { getDeployedStrategies } from "@/api/getDeployedStrategies";
import DataCard from "@/components/Dashboard/DataCard";
import DeployedStrategies from "@/components/Dashboard/DeployedStrategies";
import SecurityCards from "@/components/Dashboard/SecurityCards";
import { useEffect, useState } from "react";
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { DateRangePicker } from "react-date-range";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FaRegCalendarAlt } from "react-icons/fa";

export default function dashboard() {
  const [daily, setDaily] = useState(true);
  const [total_data, setTotalData] = useState({
    "Total P&L": 0,
    "Realized P&L": 0,
    "Unrealized P&L": 0,
    "Equity P&L": 0,
    "Derivative P&L": 0,
    "Commodity P&L": 0,
  });
  const [individualPnlData, setIndividualPnlData] = useState([]);
  const [strategies, setStrategies] = useState([]);
  async function checkLogin() {
    if (localStorage.getItem("token") === null) {
      window.location.href = "/login";
    } else {
      const tkn = sessionStorage.getItem("token");
      return tkn;
    }
  }
  const [dateRangeState, setDateRangeState] = useState([{ startDate: new Date(), endDate: new Date(), key: 'selection' }])

  async function callAPI(token, daily) {
    const start_time = dateRangeState[0].startDate ? dateRangeState[0].startDate : new Date(0);
    start_time.setHours(0, 0, 0)
    const start = start_time.getTime() / 1000
    const end_time = dateRangeState[0].endDate
    const end = end_time.getTime() / 1000
    end_time.setHours(23, 59, 59)
    const resp = await activeClientPositionsAPI(token, start, end);

    let totalEquityPnl = 0;
    let totalDerivativePnl = 0;
    let totalCommodityPnl = 0;
    let individualPnlDataArray = [];
    let totalRealizedPnl = resp.totalMetrics.total_realised_pnl;
    let totalUnrealizedPnl = resp.totalMetrics.total_unrealised_pnl;

    for (const usr in resp.userPnl) {
      const usrPnlDetails = resp.userPnl[usr];
      totalEquityPnl += usrPnlDetails.total_equity_pnl;
      totalDerivativePnl +=
        usrPnlDetails.total_futures_pnl + usrPnlDetails.total_options_pnl;
      totalCommodityPnl += usrPnlDetails.total_commodity_pnl;
      individualPnlDataArray.push({
        name: usrPnlDetails.name,
        totalPnl: parseFloat(
          usrPnlDetails.total_realised_pnl + usrPnlDetails.total_unrealised_pnl
        ).toFixed(2),
      });
    }

    setTotalData({
      "Total P&L": parseFloat(totalRealizedPnl + totalUnrealizedPnl).toFixed(2),
      "Realized P&L": parseFloat(totalRealizedPnl).toFixed(2),
      "Unrealized P&L": parseFloat(totalUnrealizedPnl).toFixed(2),
      "Equity P&L": parseFloat(totalEquityPnl).toFixed(2),
      "Derivative P&L": parseFloat(totalDerivativePnl).toFixed(2),
      "Commodity P&L": parseFloat(totalCommodityPnl).toFixed(2),
    });
    individualPnlDataArray.sort((a, b) => {
      return b.totalPnl - a.totalPnl;
    });
    setIndividualPnlData(individualPnlDataArray);
  }

  async function getStrategies(token) {
    const resp = await getDeployedStrategies(token);
    let deployedStrategies = [];
    for (const strategy in resp) {
      if (resp[strategy].name === "manual") continue;
      deployedStrategies.push({
        id: resp[strategy].id,
        name: resp[strategy].name,
        acount: resp[strategy].acount,
        scout: resp[strategy].scount,
      });
    }
    setStrategies(deployedStrategies);
  }
  function toggleDaily() {
    setDaily(!daily);
  }

  useEffect(() => {
    checkLogin().then((token) => {
      callAPI(token, daily);
      getStrategies(token);
    });
    const interval = setInterval(() => {
      checkLogin().then((token) => {
        callAPI(token, daily);
        getStrategies(token);
      });
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, [dateRangeState]);

  return (
    <div className="bg-[#FBFEFF] w-full h-[100vh] overflow-auto">
      <h1 className="pt-10 pl-[50px] font-bold text-2xl">Admin Dashboard</h1>
      <div className="flex items-center justify-end pr-[50px]">
        <div className="flex gap-2">
          <div>
            {dateRangeState[0].startDate ? dateRangeState[0].startDate.toDateString() : "Start"} - {dateRangeState[0].endDate.toDateString()}
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="addUser"><FaRegCalendarAlt />Change Date Range</Button>
            </DialogTrigger>
            <DialogContent className="min-w-[600px]">
              <DateRangePicker
                onChange={item => setDateRangeState([item.selection])}
                showPreview={true}
                moveRangeOnFirstSelection={false}
                months={1}
                ranges={dateRangeState}
                direction="horizontal"
              />
            </DialogContent>
          </Dialog>
        </div>
        {/* <label */}
        {/*   htmlFor="toggle" */}
        {/*   class="inline-flex items-center cursor-pointer text-gray-900 dark:text-gray-300" */}
        {/* > */}
        {/*   All Time */}
        {/*   <input */}
        {/*     type="checkbox" */}
        {/*     id="toggle" */}
        {/*     checked={daily} */}
        {/*     onChange={toggleDaily} */}
        {/*     class="sr-only peer" */}
        {/*   /> */}
        {/*   <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div> */}
        {/*   <span class="text-gray-900 dark:text-gray-300">Daily</span> */}
        {/* </label> */}
      </div>
      <SecurityCards metrics={total_data} />
      <div className="flex flex-row">
        <div className="flex flex-col">
          <DataCard typ="Gainer" details={{ individualPnlData }} />
          <DataCard typ="Loser" details={{ individualPnlData }} />
        </div>
        <DeployedStrategies strategies={strategies} />
      </div>
    </div>
  );
}
