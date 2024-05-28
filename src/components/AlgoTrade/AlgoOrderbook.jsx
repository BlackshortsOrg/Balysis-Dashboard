"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
export default function AlgoOrderbook() {
  const [orderbook, setOrderbook] = useState([]);
  useEffect(() => {}, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-[#41AFFF] text-white shadow-sm py-2 px-6 mx-2 rounded-md">
          Orderbook
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1225px] max-h-[800px] overflow-auto">
        <DialogHeader>
          <DialogTitle>Orderbook</DialogTitle>
        </DialogHeader>
        <div className="">
          <div></div>
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
              {/* {signals.map((signal) => ( */}
              {/*   <TableRow> */}
              {/*     <TableCell> */}
              {/*       {moment(new Date(signal.created_at)).format( */}
              {/*         "DD MMM hh:mm:ss", */}
              {/*       )} */}
              {/*     </TableCell> */}
              {/*     <TableCell>{signal.signal_type}</TableCell> */}
              {/*     <TableCell> */}
              {/*       {signal.symbol */}
              {/*         ? `${signal.exchange}:${signal.symbol}-${signal.segment}` */}
              {/*         : ""} */}
              {/*     </TableCell> */}
              {/*     <TableCell>{signal.product_type}</TableCell> */}
              {/*     <TableCell>{signal.order_type}</TableCell> */}
              {/*     <TableCell> */}
              {/*       {signal.quantity == -1 ? "" : signal.quantity} */}
              {/*     </TableCell> */}
              {/*     <TableCell> */}
              {/*       {signal.side == 0 ? "" : signal.side == 1 ? "BUY" : "SELL"} */}
              {/*     </TableCell> */}
              {/*     <TableCell>{signal.limit_price}</TableCell> */}
              {/*     <TableCell>{signal.stop_price}</TableCell> */}
              {/*   </TableRow> */}
              {/* ))} */}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
}
