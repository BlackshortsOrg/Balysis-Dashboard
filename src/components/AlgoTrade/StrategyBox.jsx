"use client";
import { getStrategyNotes } from "@/api/getStrategyNotes";
import { getStrategySignals } from "@/api/getStrategySignals";
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
import { updateStrategyNote } from "@/api/updateStrategyNote";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import _ from "lodash";
import moment from "moment";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";

export default function StrategyBox({
  id,
  name,
  total_unrealised_pnl,
  total_realised_pnl,
  active,
}) {
  const [signals, setSignals] = useState([]);
  const [daily, setDaily] = useState(true);
  const [notes, setNotes] = useState("");
  const [token, setToken] = useState("");
  async function checkLogin() {
    if (localStorage.getItem("token") === null) {
      window.location.href = "/login";
    } else {
      const tk = localStorage.getItem("token");
      setToken(tk);
      return tk;
    }
  }
  useEffect(() => {
    checkLogin().then((token) => {
      getStrategySignals(id, token, daily).then((data) => {
        console.log(data);
        setSignals(data);
      });
      getStrategyNotes(token, id).then((data) => {
        setNotes(data["notes"] || "");
      });
    });
  }, [daily]);
  return (
    <div className="mx-12 bg-white mt-8 rounded-md shadow-md">
      <div className="mx-8 grid grid-cols-12 py-4">
        <a
          className="col-span-7 text-3xl font-bold hover:underline"
          href={`/algotrade/${id}?strategy_name=${name}`}
        >
          {name}
          {active == 0 ? (
            <span className="ml-2 border-red-900 text-sm text-red-500">
              INACTIVE
            </span>
          ) : (
            <span className="ml-2 text-sm text-green-500">
              Active Users = {active}
            </span>
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
                Signals
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[1225px] max-h-[800px] overflow-auto">
              <DialogHeader>
                <DialogTitle>Orderbook</DialogTitle>
              </DialogHeader>
              <div className="">
                <div>
                  <Tabs
                    defaultValue="daily"
                    value={daily ? "daily" : "alltime"}
                    onValueChange={(e) => {
                      setDaily(e === "daily");
                    }}
                    className=""
                  >
                    <TabsList>
                      <TabsTrigger value="daily">Daily</TabsTrigger>
                      <TabsTrigger value="alltime">All Time</TabsTrigger>
                    </TabsList>
                  </Tabs>
                  {/* <button className="border border-slate-500 hover:bg-slate-500 hover:text-white px-1"> */}
                  {/*   All Time */}
                  {/* </button> */}
                  {/* <button className="border border-slate-500 hover:bg-slate-500 hover:text-white px-1"> */}
                  {/*   Daily */}
                  {/* </button> */}
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
                            "DD MMM hh:mm:ss"
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
            Square Off Today
          </button>
          <button className="bg-[#41AFFF] text-white shadow-sm py-2 px-6 mx-2 rounded-md">
            Shutdown
          </button>
          <Dialog>
            <DialogTrigger asChild>
              <button className="bg-[#41AFFF] text-white shadow-sm py-2 px-6 mx-2 rounded-md">
                Notes
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[825px] max-h-[1000px] overflow-auto">
              <DialogHeader>
                <DialogTitle>Notes</DialogTitle>
              </DialogHeader>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
              <Button
                variant="addUser"
                onClick={() =>
                  updateStrategyNote(token, id, notes).then(() => {
                    toast("Updated");
                  })
                }
              >
                Update
              </Button>
            </DialogContent>
          </Dialog>
          {/* <button className="bg-[#41AFFF] text-white shadow-sm py-2 px-6 mx-2 rounded-md"> */}
          {/*   Notes */}
          {/* </button> */}
        </div>
      </div>
    </div>
  );
}
