import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAllUsers } from "@/api/getAllUsers";
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

export default function OpenOrders() {
  const [activeTab, setActiveTab] = useState(0);
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState("");
  const [userOrders, setUserOrders] = useState({});
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
    setUserOrders({ ...userOrders, [user_id]: data });
  }
  useEffect(() => {
    checkLogin().then((token) => {
      setToken(token);
      getAllUsers(token).then((data) => {
        setUsers(data);
      });
    });
  }, []);
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
            <TabsContent value={user.id}>
              <Table>
                <TableCaption>
                  All list of your recent manual signals
                </TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Time</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Signal Type</TableHead>
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
                        <TableCell className="">{signal.signal_type}</TableCell>
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
                          <Pencil2Icon />
                        </TableCell>
                        <TableCell>
                          <TrashIcon
                            onClick={() =>
                              cancelTradeAPI(signal, token).then((res) => {
                                toast("Cancelled Order");
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
