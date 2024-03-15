"use client";
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
import moment from "moment";
export default function StrategyBox({
  id,
  name,
  total_unrealised_pnl,
  total_realised_pnl,
  disabled,
}) {
  const [signals, setSignals] = useState([]);
  async function checkLogin() {
    if (sessionStorage.getItem("token") === null) {
      window.location.href = "/login";
    } else {
      return sessionStorage.getItem("token");
    }
  }
  useEffect(() => {
    checkLogin().then((token) => {
      getStrategySignals(id, token).then((data) => {
        console.log(data);
        setSignals(data);
      });
    });
  }, []);
  return (
    <div className="mx-12 bg-white mt-8 rounded-md shadow-md">
      <div className="mx-8 grid grid-cols-12 py-4">
        <a
          className="col-span-7 text-3xl font-bold hover:underline"
          href={`/algotrade/${id}`}
        >
          {name}
          {disabled ? (
            <span className="ml-2 border-red-900 text-sm text-red-500">
              DISABLED
            </span>
          ) : (
            ""
          )}
        </a>
        <div className="col-span-5 flex flex-row justify-between">
          <div className="text-red-400">{total_unrealised_pnl.toFixed(2)}</div>
          <div>{total_realised_pnl.toFixed(2)}</div>
          <div className="text-red-400 pr-2">
            {(total_realised_pnl + total_unrealised_pnl).toFixed(2)}
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
            <DialogContent className="sm:max-w-[1025px] max-h-[800px] overflow-auto">
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
                      <TableHead>Signal Type</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Product Type</TableHead>
                      <TableHead>Order Type</TableHead>
                      <TableHead>Qty</TableHead>
                      <TableHead>Side</TableHead>
                      <TableHead>Limit Price</TableHead>
                      <TableHead>Stop Price</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {signals.map((signal) => (
                      <TableRow>
                        <TableCell>
                          {moment(new Date(signal.created_at)).format(
                            "DD MMM hh:mm:ss",
                          )}
                        </TableCell>
                        <TableCell>{signal.signal_type}</TableCell>
                        <TableCell>
                          {signal.symbol
                            ? `${signal.exchange}:${signal.symbol}-${signal.segment}`
                            : ""}
                        </TableCell>
                        <TableCell>{signal.product_type}</TableCell>
                        <TableCell>{signal.order_type}</TableCell>
                        <TableCell>
                          {signal.quantity == -1 ? "" : signal.quantity}
                        </TableCell>
                        <TableCell>
                          {signal.side == 0
                            ? ""
                            : signal.side == 1
                              ? "BUY"
                              : "SELL"}
                        </TableCell>
                        <TableCell>{signal.limit_price}</TableCell>
                        <TableCell>{signal.stop_price}</TableCell>
                      </TableRow>
                    ))}
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
  );
}
