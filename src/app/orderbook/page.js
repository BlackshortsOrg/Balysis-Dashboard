"use client"
import { useState, useEffect } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";
import { Button } from "@/components/ui/button";
import moment from "moment";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getCompleteOrderbookAPI } from "@/api/getCompleteOrderbook";
import { API_BASE_URL } from "@/api/constants";
import { getJournal } from "@/api/getJournal";

export default function OrderBookPage() {
  const [token, setToken] = useState(null);
  const [orderbookData, setOrderbookData] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedStrategy, setSelectedStrategy] = useState(null);
  const [dateRangeState, setDateRangeState] = useState([
    { startDate: new Date(), endDate: new Date(), key: "selection" },
  ]);

  async function checkLogin() {
    if (localStorage.getItem("token") === null) {
      window.location.href = "/login";
    } else {
      const tk = localStorage.getItem("token");
      setToken(tk);
      return tk;
    }
  }

  async function callAPI(token) {
    const start_time = dateRangeState[0].startDate
      ? dateRangeState[0].startDate
      : new Date(0);
    start_time.setHours(0, 0, 0);
    const start = start_time.getTime() / 1000;
    const end_time = dateRangeState[0].endDate;
    end_time.setHours(23, 59, 59);
    const end = end_time.getTime() / 1000;
    const resp = await getCompleteOrderbookAPI(token, start, end)
    //Todo handle empty response
    setOrderbookData(resp);
    console.log(resp)
  }

  useEffect(() => {
    checkLogin().then((token) => {
      callAPI(token);
    });
    const interval = setInterval(() => {
      checkLogin().then((token) => {
        callAPI(token);
      });
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, [dateRangeState]);

  return (
    <div className="h-screen w-full mx-8 overflow-auto">
      <div className="flex">
        <h1 className="text-4xl my-4 font-semibold">Orderbook</h1>
        <div className="flex-grow"></div>
        <div className="flex gap-2">
          <div className="pt-8" e>
            {dateRangeState[0].startDate
              ? dateRangeState[0].startDate.toDateString()
              : "Start"}{" "}
            - {dateRangeState[0].endDate.toDateString()}
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="addUser" className="mt-8">
                <FaRegCalendarAlt />
                Change Date Range
              </Button>
            </DialogTrigger>
            <DialogContent className="min-w-[600px]">
              <DateRangePicker
                onChange={(item) => setDateRangeState([item.selection])}
                showPreview={true}
                moveRangeOnFirstSelection={false}
                months={1}
                ranges={dateRangeState}
                direction="horizontal"
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <Tabs defaultValue="" className="">
        <TabsList>
          {orderbookData.users && Object.entries(orderbookData.users).map(([user_id, user_obj]) => <TabsTrigger value={user_id} onValueChange={(e) => {
            setSelectedStrategy(null)
            setSelectedUser(e)
          }}>{user_obj.username}</TabsTrigger>)}
        </TabsList>
        {orderbookData.users && Object.entries(orderbookData.users).map(([user_id, user_obj]) => <TabsContent value={user_id}>
          <Tabs defaultValue="" className="">
            <TabsList>
              {user_obj.strategies && Object.entries(user_obj.strategies).map(([strategy_id, strategy_obj]) => <TabsTrigger value={strategy_id} onValueChange={(e) => setSelectedStrategy(e)}>{strategy_obj.strategy_name}</TabsTrigger>)}
            </TabsList>
            {user_obj.strategies && Object.entries(user_obj.strategies).map(([strategy_id, strategy_obj]) => <TabsContent value={strategy_id}>
              <Table>
                <TableCaption>
                  Orders for current user based on this strategy
                </TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="">
                      Order Placement Time
                    </TableHead>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Order Type</TableHead>
                    <TableHead>Limit Price</TableHead>
                    <TableHead>Stop Price</TableHead>
                    <TableHead>Modified</TableHead>
                    <TableHead>Side</TableHead>
                    <TableHead>Current Status</TableHead>
                    <TableHead>Order Execution Time</TableHead>
                    <TableHead className="">
                      Trade Price
                    </TableHead>
                    <TableHead className="">
                      Trade Qty
                    </TableHead>
                    <TableHead className="">
                      SL Calculated
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.values(strategy_obj.orders).filter((x) => x.cancelled === false).map(
                    (order_obj) => {
                      return (
                        <TableRow>
                          <TableCell>
                            {order_obj.placed_time
                              ? moment(
                                new Date(order_obj.placed_time),
                              ).format("DD MMM hh:mm:ss")
                              : "-"}
                          </TableCell>
                          <TableCell>{order_obj.symbol}</TableCell>
                          <TableCell>{order_obj.order_type}</TableCell>
                          <TableCell>{order_obj.limit_price}</TableCell>
                          <TableCell>{order_obj.stop_price}</TableCell>
                          <TableCell>
                            {order_obj.modified ? "yes" : "no"}
                          </TableCell>
                          <TableCell>{order_obj.side}</TableCell>
                          <TableCell>
                            {order_obj.current_status}
                          </TableCell>
                          <TableCell>
                            {order_obj.last_modified_time
                              ? moment(
                                new Date(
                                  order_obj.last_modified_time,
                                ),
                              ).format("DD MMM hh:mm:ss")
                              : "-"}
                          </TableCell>
                          <TableCell>
                            {order_obj.traded_price || "-"}
                          </TableCell>
                          <TableCell>
                            {order_obj.traded_qty || "-"}
                          </TableCell>
                          <TableCell>
                            {order_obj.sl_b || "-"}
                          </TableCell>
                        </TableRow>
                      );
                    },
                  )}
                </TableBody>
              </Table>
            </TabsContent>)}
          </Tabs>
        </TabsContent>)}
      </Tabs>
      <Button variant="addUser" onClick={(e) => {
        getJournal(token).then((response) => response.blob()
        ).then((bob) => {
          let objectURL = URL.createObjectURL(bob);
          let a = document.createElement("a");
          a.href = objectURL
          a.download = "journal.csv"
          a.click()
          window.URL.revokeObjectURL(objectURL)
        })
      }}>Journal</Button>
    </div>
  )
}
