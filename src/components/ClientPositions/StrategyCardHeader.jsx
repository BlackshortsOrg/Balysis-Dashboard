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
import { squareOffStrategyForUserAPI } from "@/api/squareOffStrategy";
import { toast } from "sonner";

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
  daily
}) {
  const [token, setToken] = useState("")
  const [multiplier, setMultiplier] = useState(1)
  async function changeSubscription() {
    await subscribeStrategyAPI(token, [user_id], strategy_id, [multiplier], name)
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
        console.log([user_id, strategy_id, res[0].multiplier])
        setMultiplier(res[0].multiplier)
      })
    })
  }, [daily])
  async function squareOffToday() {
    squareOffStrategyForUserAPI(token, user_id, strategy_id, false).then((resp) => {
      toast("Squared off Strategy for Today")
    })
  }
  async function shutdown() {
    squareOffStrategyForUserAPI(token, user_id, strategy_id, true).then((resp) => {
      toast("Shutdown Strategy")
    })
  }
  const totalpnl = parseFloat(realizedpnl) + parseFloat(unrealizedpnl)
  return (
    <div className="mx-12 bg-white mt-8 rounded-md shadow-md">
      <div className="mx-8 grid grid-cols-12 py-4">
        <div className="col-span-7 text-3xl font-bold">
          <span>{name}</span>
          {!active && <span className="text-sm text-red-600 border-1 border border-red-600 ml-2">DISABLED TODAY</span>}
          {!subscribed && <span className="text-sm text-red-600 border-1 border border-red-600 ml-2">UNSUBSCRIBED</span>}
        </div>
        <div className="col-span-5 flex flex-row justify-between">
          <div></div>
          <div className={unrealizedpnl < 0 ? "text-red-500 font-semibold" : "text-green-500 font-semibold"}>{unrealizedpnl}</div>
          <div className={realizedpnl < 0 ? "text-red-500 font-semibold" : "text-green-500 font-semibold"}>{realizedpnl}</div>
          <div className={totalpnl < 0 ? "text-red-500 font-semibold" : "text-green-500 font-semibold"}>
            {parseFloat(realizedpnl) + parseFloat(unrealizedpnl)}
          </div>
        </div>
      </div>
      <div className="ml-4 flex flex-row pb-4">
        <div className="basis-[95%] flex flex-row">
          {subscribed &&
            <Dialog>
              <DialogTrigger asChild>
                <button className="bg-[#41AFFF] text-white shadow-sm py-2 px-6 mx-2 rounded-md">
                  Multiplier
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
                        setMultiplier(e.target.value)
                      }}
                      id="multiplier"
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="addUser" type="submit" onClick={changeSubscription}>
                    Save changes
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          }
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
                    <TableRow>
                      <TableCell className="font-medium">
                        18-Jul-2023 11:44:29
                      </TableCell>
                      <TableCell>abcde-asd-asd</TableCell>
                      <TableCell>NIFTY23JANFUT</TableCell>
                      <TableCell>NRML</TableCell>
                      <TableCell>MARKET ORDER</TableCell>
                      <TableCell>23</TableCell>
                      <TableCell>BUY</TableCell>
                      <TableCell>PENDING</TableCell>
                      <TableCell className="text-right">Rs 250.00</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        18-Jul-2023 11:44:29
                      </TableCell>
                      <TableCell>abcde-asd-asd</TableCell>
                      <TableCell>NIFTY23JANFUT</TableCell>
                      <TableCell>NRML</TableCell>
                      <TableCell>MARKET ORDER</TableCell>
                      <TableCell>23</TableCell>
                      <TableCell>BUY</TableCell>
                      <TableCell>FILLED</TableCell>
                      <TableCell className="text-right">Rs 250.00</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              {/* <DialogFooter> */}
              {/*   <Button variant="addUser" type="submit">Save changes</Button> */}
              {/* </DialogFooter> */}
            </DialogContent>
          </Dialog>
          {active && <button className="bg-[#41AFFF] text-white shadow-sm py-2 px-6 mx-2 rounded-md" onClick={squareOffToday}>
            Square Off Today({numpositions})
          </button>}
          {subscribed && <button className="bg-[#41AFFF] text-white shadow-sm py-2 px-6 mx-2 rounded-md" onClick={shutdown}>
            Shutdown
          </button>}
        </div>
        <div className="basis-[15%]">
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
