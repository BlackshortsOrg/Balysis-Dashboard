import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { getMultiplierUserStrategy } from "@/api/getMultiplierUserStrategy";
import { subscribeStrategyAPI } from "@/api/subscribeStrategy";
import { squareOffStrategyForUserAPI } from "@/api/squareOffStrategyForUser";
import { toast } from "sonner";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { getStrategyOrderbookAPI } from "@/api/getStrategyOrderbook";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import moment from "moment";

export default function StrategyCardHeader({
  name,
  setShow,
  show,
  realizedpnl,
  unrealizedpnl,
  numpositions,
  active,
  subscribed,
  user_id,
  strategy_id,
  start,
  end,
}) {
  const [token, setToken] = useState("");
  const [multiplier, setMultiplier] = useState(1);
  const [otp, setOTP] = useState("");
  const [orderbook, setOrderbook] = useState({ users: {} });
  const [selectedUser, setSelectedUser] = useState(null);
  async function changeSubscription() {
    const res = await subscribeStrategyAPI(
      token,
      [user_id],
      strategy_id,
      [multiplier],
      name,
      otp,
    );
    if (res.status === 200) {
      toast.success("Multiplier Updated");
    } else {
      toast.error("Error Updating Multiplier");
    }
  }
  async function checkLogin() {
    if (sessionStorage.getItem("token") === null) {
      window.location.href = "/login";
    } else {
      const tk = sessionStorage.getItem("token");
      setToken(tk);
      return tk;
    }
  }
  useEffect(() => {
    if (!subscribed) return;
    checkLogin().then((token) => {
      getMultiplierUserStrategy(token, user_id, strategy_id).then((res) => {
        console.log([user_id, strategy_id, res[0].multiplier]);
        setMultiplier(res[0].multiplier);
      });
      getStrategyOrderbookAPI(token, strategy_id, start, end).then((res) => {
        console.log("Orderbook ", res);
        setOrderbook(res);
      });
    });
  }, [start, end]);
  async function squareOffToday() {
    const res = await squareOffStrategyForUserAPI(
      token,
      user_id,
      strategy_id,
      false,
      otp,
    );
    if (res.status === 200) {
      toast.success("Squared Off for Today");
    } else {
      toast.error("Error Squaring Off");
    }
  }
  async function shutdown() {
    const res = await squareOffStrategyForUserAPI(
      token,
      user_id,
      strategy_id,
      true,
      otp,
    );
    if (res.status === 200) {
      toast.success("Shutdown Strategy");
    } else {
      toast.error("Error Shutting Down Strategy");
    }
  }
  const totalpnl = parseFloat(realizedpnl) + parseFloat(unrealizedpnl);
  return (
    <div className="mx-12 bg-white mt-8 rounded-md shadow-md">
      <div className="mx-8 grid grid-cols-12 py-4">
        <div className="col-span-7 text-3xl font-bold">
          <span>{name}</span>
          {subscribed && !active && (
            <span className="text-sm  text-red-600 border-1 border border-red-600 ml-2">
              DISABLED TODAY
            </span>
          )}
          {!subscribed && (
            <span className="text-sm text-red-600 border-1 border border-red-600 ml-2">
              UNSUBSCRIBED
            </span>
          )}
        </div>
        <div className="col-span-5 flex flex-row justify-between">
          <div></div>
          <div
            className={
              unrealizedpnl < 0
                ? "text-red-500 font-semibold"
                : "text-green-500 font-semibold"
            }
          >
            {unrealizedpnl}
          </div>
          <div
            className={
              realizedpnl < 0
                ? "text-red-500 font-semibold"
                : "text-green-500 font-semibold"
            }
          >
            {realizedpnl}
          </div>
          <div
            className={
              totalpnl < 0
                ? "text-red-500 font-semibold"
                : "text-green-500 font-semibold"
            }
          >
            {(parseFloat(realizedpnl) + parseFloat(unrealizedpnl)).toFixed(2)}
          </div>
        </div>
      </div>
      <div className="ml-4 flex flex-row pb-4">
        <div className="basis-[90%] flex flex-row">
          {subscribed && (
            <Dialog>
              <DialogTrigger asChild>
                <button className="bg-[#41AFFF] text-white shadow-sm px-6 mx-2 rounded-md  ">
                  {active ? "Edit Multiplier" : "Enable"}
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit Multiplier</DialogTitle>
                  <DialogDescription>
                    NOTE - This is brought to effect immediately
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="multiplier" className="text-right">
                      Multiplier
                    </Label>
                    <Input
                      type="number"
                      value={multiplier}
                      onChange={(e) => {
                        setMultiplier(e.target.value);
                      }}
                      id="multiplier"
                      className="col-span-3"
                    />
                  </div>
                </div>
                <div className="mx-auto">
                  <Label>Enter OTP</Label>
                  <InputOTP maxLength={6} value={otp} onChange={setOTP}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                <DialogFooter>
                  <Button
                    variant="addUser"
                    type="submit"
                    onClick={changeSubscription}
                  >
                    Save changes
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
          <Dialog>
            <DialogTrigger asChild>
              <button className="bg-[#41AFFF] text-white shadow-sm px-6 mx-2 rounded-md  ">
                Orderbook
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[1225px] max-h-[800px] overflow-auto">
              <DialogHeader>
                <DialogTitle>Orderbook - {name}</DialogTitle>
              </DialogHeader>

              <Tabs
                value={selectedUser}
                onValueChange={(e) => {
                  setSelectedUser(e);
                }}
                defaultValue=""
                className=""
              >
                <TabsList>
                  {Object.keys(orderbook.users).map((user) => (
                    <TabsTrigger value={user.id}>
                      {orderbook.users[user].username}
                    </TabsTrigger>
                  ))}
                </TabsList>
                <TabsContent value="">-</TabsContent>
                {Object.keys(orderbook.users).map((user) => (
                  <TabsContent value={user.id}>
                    <div className="">
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
                            <TableHead className="text-right">
                              Trade Price
                            </TableHead>
                            <TableHead className="text-right">
                              Trade Qty
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {Object.entries(orderbook.users[user].orders).map(
                            ([signal, order_obj]) => {
                              console.log(orderbook.users[user].orders);
                              console.log(order_obj);
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
                                </TableRow>
                              );
                            },
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </DialogContent>
          </Dialog>
          {active && (
            <Dialog>
              <DialogTrigger asChild>
                <button
                  className="bg-[#E01133] text-white shadow-sm px-6 mx-2 rounded-md  "
                  // onClick={squareOffToday}
                >
                  Square Off Today({numpositions})
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Square Off {name} for Today</DialogTitle>
                  <DialogDescription>
                    NOTE - This is brought to effect immediately
                  </DialogDescription>
                </DialogHeader>
                <InputOTP maxLength={6} value={otp} onChange={setOTP}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
                <DialogFooter>
                  <Button
                    variant="addUser"
                    type="submit"
                    onClick={squareOffToday}
                  >
                    Save changes
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
          {name !== "manual" && subscribed && (
            <Dialog>
              <DialogTrigger asChild>
                <button className="bg-[#E01133] text-white shadow-sm px-6 mx-2 rounded-md  ">
                  Shutdown
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Shutdown {name}</DialogTitle>
                  <DialogDescription>
                    NOTE - This is brought to effect immediately
                  </DialogDescription>
                </DialogHeader>
                <InputOTP maxLength={6} value={otp} onChange={setOTP}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
                <DialogFooter>
                  <Button variant="addUser" type="submit" onClick={shutdown}>
                    Save changes
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
        <div className="basis-[20%]">
          <button
            className="flex flex-row border border-[#41AFFF] text-[#41AFFF] px-8 py-2"
            onClick={() => setShow(!show)}
          >
            ({numpositions}) Positions
            <svg
              className="scale-150"
              width="20"
              height="20"
              viewBox="-9 -4 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.18179 6.18181C4.35753 6.00608 4.64245 6.00608 4.81819 6.18181L7.49999 8.86362L10.1818 6.18181C10.3575 6.00608 10.6424 6.00608 10.8182 6.18181C10.9939 6.35755 10.9939 6.64247 10.8182 6.81821L7.81819 9.81821C7.73379 9.9026 7.61934 9.95001 7.49999 9.95001C7.38064 9.95001 7.26618 9.9026 7.18179 9.81821L4.18179 6.81821C4.00605 6.64247 4.00605 6.35755 4.18179 6.18181Z"
                fill="currentColor"
                fill-rule="evenodd"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
