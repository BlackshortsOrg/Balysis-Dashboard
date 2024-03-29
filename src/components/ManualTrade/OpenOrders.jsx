import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAllUsers } from "@/api/getAllUsers";
import OrderTypeCarousel from "./orderTypeCarousel";
import PlaceOrderCarousel from "./placeOrderCarousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getOpenOrders } from "@/api/getOpenOrders";
import moment from "moment";
import { Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import { cancelTradeAPI } from "@/api/cancelOrder";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import _ from "lodash";
import { placeTradeAPI } from "@/api/placeTrade";

export default function OpenOrders({ refresh, setRefresh }) {
  const [activeTab, setActiveTab] = useState(0);
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState("");
  const [userOrders, setUserOrders] = useState({});
  const [carouselApi, setCarouselAPI] = useState()
  const [newOrderType, setNewOrderType] = useState("")
  const [side, setSide] = useState(1)
  const [limit_price, setLimitPrice] = useState(0)
  const [stop_price, setStopPrice] = useState(0)
  const [product_type, setProductType] = useState("INTRADAY")
  const [qty, setQty] = useState(0)
  async function checkLogin() {
    if (sessionStorage.getItem("token") === null) {
      window.location.href = "/login";
    } else {
      const tk = sessionStorage.getItem("token");
      setToken(tk);
      return tk;
    }
  }
  async function getOrders(token, user_id) {
    const data = await getOpenOrders(token, 1, user_id);
    setUserOrders({ ...userOrders, [user_id]: data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) });
  }
  async function modifyTrade(org_signal) {
    if (newOrderType == "") {
      toast.error("Set New Order Type")
      return
    }
    const tradeData = {
      exchange: org_signal.exchange,
      symbol: org_signal.symbol,
      segment: org_signal.segment,
      signal_type: "MODIFY_ORDER",
      product_type: product_type,
      order_type: newOrderType,
      limit_price: parseFloat(limit_price),
      stop_price: parseFloat(stop_price),
      users: [activeTab],
      quantity: qty,
      side: side,
    };
    const res = await placeTradeAPI(tradeData, token)
    if (res.status === 200) {
      toast.success("Modified Order Succesfully")
    } else {
      toast.error("Failed Modifying Order")
    }
  }
  useEffect(() => {
    checkLogin().then((token) => {
      setToken(token);
      getAllUsers(token).then((data) => {
        setUsers(data);
      });
    });
  }, [refresh]);
  return (
    <div>
      <Tabs
        value={activeTab}
        onValueChange={(e) => {
          console.log(e);
          setActiveTab(e);
          getOrders(token, e).then(() => {
            console.log(userOrders);
          });
        }}
        defaultValue="account"
        className=""
      >
        <TabsList>
          {users.map((user) => {
            return <TabsTrigger value={user.id}>{user.name}</TabsTrigger>;
          })}
        </TabsList>
        <TabsContent value="">-</TabsContent>
        {users.map((user) => {
          return (
            <TabsContent key={user.id} value={user.id}>
              <Table>
                <TableCaption>
                  All list of your recent manual signals
                </TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Time</TableHead>
                    <TableHead>Stock</TableHead>
                    {/* <TableHead>Signal Type</TableHead> */}
                    <TableHead>Order Type</TableHead>
                    <TableHead>Limit Price</TableHead>
                    <TableHead>Stop Price</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Side</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userOrders[user.id] &&
                    userOrders[user.id].map((signal) => (
                      <TableRow key={signal.signal_id}>
                        <TableCell className="">
                          {moment(new Date(signal.created_at)).format(
                            "DD MMM hh:mm:ss A",
                          )}
                        </TableCell>
                        <TableCell>{`${signal.exchange}:${signal.symbol}-${signal.segment}`}</TableCell>
                        {/* <TableCell className="">{signal.signal_type}</TableCell> */}
                        <TableCell>{signal.order_type}</TableCell>
                        <TableCell>
                          {signal.limit_price == -1 ? "-" : signal.limit_price}
                        </TableCell>
                        <TableCell>
                          {signal.stop_price == -1 ? "-" : signal.stop_price}
                        </TableCell>
                        <TableCell>
                          {signal.quantity == -1 ? "-" : signal.quantity}
                        </TableCell>
                        <TableCell>
                          {signal.side === 1 ? "BUY" : "SELL"}
                        </TableCell>
                        <TableCell>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Pencil2Icon
                                className="hover:cursor-pointer"
                              />
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[825px]">
                              <div className="px-6">
                                <Carousel setApi={setCarouselAPI} className="max-w-[825px]">
                                  <CarouselContent>
                                    <CarouselItem>
                                      <OrderTypeCarousel
                                        orderType={newOrderType}
                                        setOrderType={setNewOrderType}
                                        carouselApi={carouselApi}
                                      />
                                    </CarouselItem>
                                    <CarouselItem>
                                      <PlaceOrderCarousel
                                        side={side}
                                        setSide={setSide}
                                        limit_price={limit_price}
                                        setLimitPrice={setLimitPrice}
                                        stop_price={stop_price}
                                        setStopPrice={setStopPrice}
                                        product_type={product_type}
                                        setProductType={setProductType}
                                        qty={qty}
                                        setQty={setQty}
                                      />
                                    </CarouselItem>
                                  </CarouselContent>
                                  <CarouselPrevious />
                                  <CarouselNext />
                                </Carousel>
                              </div>
                              <DialogFooter onClick={() => modifyTrade(signal)}>
                                <DialogClose asChild>
                                  <Button variant="addUser" type="submit" >
                                    Modify
                                  </Button>
                                </DialogClose>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                        <TableCell>
                          <TrashIcon
                            className="hover:cursor-pointer"
                            onClick={() =>
                              cancelTradeAPI(signal, token).then((res) => {
                                if (res.status === 200) {
                                  toast.success("Cancelled Order");
                                } else {
                                  toast.error("Failed to Cancel Order")
                                }
                                setRefresh(!refresh)
                              })
                            }
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
