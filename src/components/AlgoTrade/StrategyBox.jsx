"use client"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { getStrategySignals } from "@/api/getStrategySignals";
export default function StrategyBox({ strategy_id, name, unrealizedpnl, realizedpnl }) {
  const [singals, setSignals] = useState([]);
  async function checkLogin() {
    if (sessionStorage.getItem("token") === null) {
      window.location.href = "/login";
    } else {
      return sessionStorage.getItem("token");
    }
  }
  useEffect(() => {
    checkLogin().then((token) => {
      getStrategySignals(strategy_id, token).then((data) => {
        setSignals(data)
      });
    });
  }, [])
  return (
    <div className="mx-12 bg-white mt-8 rounded-md shadow-md">
      <div className="mx-8 grid grid-cols-12 py-4">
        <a
          className="col-span-7 text-3xl font-bold hover:underline"
          href={`/algotrade/${1}`}
        >
          {name}
        </a>
        <div className="col-span-5 flex flex-row justify-between">
          <div className="text-red-400">{unrealizedpnl}</div>
          <div>{realizedpnl}</div>
          <div className="text-red-400 pr-2">
            {realizedpnl + unrealizedpnl}
          </div>
        </div>
      </div>
      <div className="mx-8 flex flex-row pb-4">
        <div className="basis-5/6 flex flex-row">
          <Dialog>
            <DialogTrigger asChild>
              <button className="bg-[#41AFFF] text-white shadow-sm py-2 px-6 mx-2 rounded-md">
                Orderbook
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[1025px]">
              <DialogHeader>
                <DialogTitle>Orderbook</DialogTitle>
              </DialogHeader>
              <div className="">
                <div>
                  <button className="border border-slate-500 hover:bg-slate-500 hover:text-white px-1">
                    All Time
                  </button>
                  <button className="border border-slate-500 hover:bg-slate-500 hover:text-white px-1">
                    Daily
                  </button>
                </div>
                <Table>
                  <TableCaption>
                    Orders for current user based on this strategy
                  </TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="">Time</TableHead>
                      <TableHead>Signal ID</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Product Type</TableHead>
                      <TableHead>Order Type</TableHead>
                      <TableHead>Qty</TableHead>
                      <TableHead>Side</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {/* <TableRow> */}
                    {/*   <TableCell className="font-medium"> */}
                    {/*     18-Jul-2023 11:44:29 */}
                    {/*   </TableCell> */}
                    {/*   <TableCell>abcde-asd-asd</TableCell> */}
                    {/*   <TableCell>NIFTY23JANFUT</TableCell> */}
                    {/*   <TableCell>NRML</TableCell> */}
                    {/*   <TableCell>MARKET ORDER</TableCell> */}
                    {/*   <TableCell>23</TableCell> */}
                    {/*   <TableCell>BUY</TableCell> */}
                    {/*   <TableCell>PENDING</TableCell> */}
                    {/*   <TableCell className="text-right">Rs 250.00</TableCell> */}
                    {/* </TableRow> */}
                    {/* <TableRow> */}
                    {/*   <TableCell className="font-medium"> */}
                    {/*     18-Jul-2023 11:44:29 */}
                    {/*   </TableCell> */}
                    {/*   <TableCell>abcde-asd-asd</TableCell> */}
                    {/*   <TableCell>NIFTY23JANFUT</TableCell> */}
                    {/*   <TableCell>NRML</TableCell> */}
                    {/*   <TableCell>MARKET ORDER</TableCell> */}
                    {/*   <TableCell>23</TableCell> */}
                    {/*   <TableCell>BUY</TableCell> */}
                    {/*   <TableCell>FILLED</TableCell> */}
                    {/*   <TableCell className="text-right">Rs 250.00</TableCell> */}
                    {/* </TableRow> */}
                  </TableBody>
                </Table>
              </div>
            </DialogContent>
          </Dialog>
          <button className="bg-[#41AFFF] text-white shadow-sm py-2 px-6 mx-2 rounded-md">
            Stop
          </button>
          <button className="bg-[#41AFFF] text-white shadow-sm py-2 px-6 mx-2 rounded-md">
            Notes
          </button>
        </div>
      </div>
    </div>
  )
}
