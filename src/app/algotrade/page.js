"use client";
import { getAllStrategyMetrics } from "@/api/getAllStrategyMetrics";
import StrategiesHeader from "@/components/AlgoTrade/StrategiesHeader";
import StrategyBox from "@/components/AlgoTrade/StrategyBox";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaRegCalendarAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { DateRangePicker } from "react-date-range";
import moment from "moment";

export default function algotrade() {
  const [dateRangeState, setDateRangeState] = useState([{ startDate: new Date(), endDate: new Date(), key: 'selection' }])
  const [daily, setDaily] = useState(true);
  const [strategies_data, setStrategiesData] = useState({});
  const start_time = dateRangeState[0].startDate ? dateRangeState[0].startDate : new Date(0);
  start_time.setHours(0, 0, 0)
  const start = start_time.getTime() / 1000
  const end_time = dateRangeState[0].endDate
  end_time.setHours(23, 59, 59)
  const end = end_time.getTime() / 1000
  async function checkLogin() {
    if (localStorage.getItem("token") === null) {
      console.log("No token found");
      window.location.href = "/login";
    } else {
      console.log("token found");
      return localStorage.getItem("token");
    }
  }
  useEffect(() => {
    checkLogin().then((token) => {
      getAllStrategyMetrics(token, start, end).then((data) => {
        setStrategiesData(data);
      });
    });
    const interval = setInterval(() => {
      checkLogin().then((token) => {
        getAllStrategyMetrics(token, start, end).then((data) => {
          setStrategiesData(data);
        });
      });
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, [dateRangeState]);
  return (
    <div className="bg-[#F8FCFF] w-full h-[100vh] overflow-auto">
      <div className="flex flex-row w-full pt-10">
        <h1 className="pl-[50px] font-bold text-2xl">Algo Trade</h1>
        <div className="basis-[70%]"></div>
        {/* <Tabs */}
        {/*   defaultValue="daily" */}
        {/*   value={daily ? "daily" : "alltime"} */}
        {/*   onValueChange={(e) => { */}
        {/*     setDaily(e === "daily"); */}
        {/*   }} */}
        {/*   className="" */}
        {/* > */}
        {/*   <TabsList> */}
        {/*     <TabsTrigger value="daily">Daily</TabsTrigger> */}
        {/*     <TabsTrigger value="alltime">All Time</TabsTrigger> */}
        {/*   </TabsList> */}
        {/* </Tabs> */}
        <div className="">
          <p> {moment(dateRangeState[0].startDate).format("Do MMM YY")} - {moment(dateRangeState[0].endDate).format("Do MMM YY")}</p>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="addUser"><FaRegCalendarAlt />Change Date Range</Button>
            </DialogTrigger>
            <DialogContent className="min-w-[1000px]">
              <DateRangePicker
                onChange={item => setDateRangeState([item.selection])}
                showPreview={true}
                moveRangeOnFirstSelection={false}
                months={2}
                ranges={dateRangeState}
                direction="horizontal"
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <StrategiesHeader />
      {Object.keys(strategies_data)
        .filter((k) => k != "manual" && k != "ltps")
        .map((k) => (
          <StrategyBox
            start={start}
            end={end}
            key={strategies_data[k].id}
            id={strategies_data[k].id}
            name={k}
            total_realised_pnl={strategies_data[k].total_realised_pnl}
            total_unrealised_pnl={strategies_data[k].total_unrealised_pnl}
            active={strategies_data[k].active}
          />
        ))}
    </div>
  );
}
