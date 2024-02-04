import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusIcon, Pencil2Icon, GearIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Combobox } from "@headlessui/react";
import SegmentCarousel from "./SegmentCarousel";
import { getEquityTickersAPI } from "@/api/getEquityTickers";

const stocks = [
  {
    ticker: "RELIANCE",
    name: "Reliance Industries Ltd.",
  },
  {
    ticker: "HDFCBANK",
    name: "HDFC Bank Ltd.",
  },
  {
    ticker: "INFY",
    name: "Infosys Ltd.",
  },
];

const TradeButton = ({ rowSelection, data }) => {
  const [segment, setSegment] = useState("Equity");
  const [orderType, setOrderType] = useState("MARKET_ORDER");
  const [price, setPrice] = useState(0.0);
  const [qty, setQty] = useState(0);
  const [side, setSide] = useState(1);
  const [stocks, setStocks] = useState([]);

  async function setEquityData() {
    const data = await getEquityTickersAPI();
    console.log(data);
    setStocks(data);
  }

  useEffect(() => {
    setEquityData();
  }, []);

  const newTradeAPICall = (e) => {
    console.log(rowSelection);
    var selectedIds = [];
    for (const [rownum, state] of Object.entries(rowSelection)) {
      selectedIds.push(data[rownum].id);
    }
    console.log(selectedIds);
    e.preventDefault();
    const tradeData = {
      ticker: selectedPerson,
      order_type: orderType,
      price: price,
      qty: qty,
      side: side,
    };
    console.log(tradeData);
  };

  const [selectedStock, setSelectedStock] = useState(stocks[0]);
  const [query, setQuery] = useState("");

  const filteredStocks =
    query === ""
      ? stocks.slice(0, 50)
      : stocks
          .filter((stock) => {
            return stock.name.toLowerCase().includes(query.toLowerCase());
          })
          .slice(0, 50);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="addUser">
          <Pencil2Icon />
          <span className="mx-2">Trade</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[825px]">
        <DialogHeader className="">
          <DialogTitle>Trade</DialogTitle>
        </DialogHeader>
        <div className="px-6">
          <Carousel className="max-w-[725px]">
            <CarouselContent>
              <CarouselItem>
                <SegmentCarousel segment={segment} setSegment={setSegment} />
              </CarouselItem>
              <CarouselItem>
                <Card>
                  <CardHeader>
                    <CardTitle>Chose Stock</CardTitle>
                    <CardContent>
                      <Combobox
                        value={selectedStock}
                        onChange={_.debounce(setSelectedStock, 200)}
                      >
                        <Combobox.Input
                          onSubmit={(event) => setQuery(event.target.value)}
                          className="w-full bg-slate-50 border-slate-200 border rounded-xl px-4 py-2 mt-4"
                        />
                        <Combobox.Options className="bg-slate-50 py-1 rounded-xl mt-2 overflow-auto">
                          {filteredStocks.map((stock) => (
                            <Combobox.Option
                              key={stock.ticker}
                              value={stock}
                              className=""
                            >
                              <div className="hover:bg-[#41AFFF] pl-4 py-2 hover:text-white rounded-xl">
                                {stock.exchange_id} , {stock.fyers_ticker},{" "}
                                {stock.zerodha_instrument_token},{" "}
                                {stock.zerodha_tradingsymbol}
                              </div>
                            </Combobox.Option>
                          ))}
                        </Combobox.Options>
                      </Combobox>
                    </CardContent>
                  </CardHeader>
                </Card>
              </CarouselItem>
              <CarouselItem>
                <Card>
                  <CardHeader>
                    <CardTitle>Chose Order Type</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 text-center gap-2">
                      {orderType === "MARKET_ORDER" ? (
                        <div className="text-white bg-[#41AFFF] col-span-1 py-4 shadow-gray-50 border-slate-200 border rounded-xl">
                          Market Order
                        </div>
                      ) : (
                        <div
                          className="col-span-1 py-4 shadow-gray-50 border-slate-200 border rounded-xl hover:bg-slate-100"
                          onClick={() => setOrderType("MARKET_ORDER")}
                        >
                          Market Order
                        </div>
                      )}
                      {orderType === "LIMIT_ORDER" ? (
                        <div className="text-white bg-[#41AFFF] col-span-1 py-4 shadow-gray-50 border-slate-200 border rounded-xl">
                          Limit Order
                        </div>
                      ) : (
                        <div
                          className="col-span-1 py-4 shadow-gray-50 border-slate-200 border rounded-xl hover:bg-slate-100"
                          onClick={() => setOrderType("LIMIT_ORDER")}
                        >
                          Limit Order
                        </div>
                      )}
                      {orderType === "STOP_ORDER" ? (
                        <div className="text-white bg-[#41AFFF] col-span-1 py-4 shadow-gray-50 border-slate-200 border rounded-xl">
                          Stop Order
                        </div>
                      ) : (
                        <div
                          className="col-span-1 py-4 shadow-gray-50 border-slate-200 border rounded-xl hover:bg-slate-100"
                          onClick={() => setOrderType("STOP_ORDER")}
                        >
                          Stop Order
                        </div>
                      )}
                      {orderType === "STOP_LIMIT_ORDER" ? (
                        <div className="text-white bg-[#41AFFF] col-span-1 py-4 shadow-gray-50 border-slate-200 border rounded-xl">
                          Stop Limit Order
                        </div>
                      ) : (
                        <div
                          className="col-span-1 py-4 shadow-gray-50 border-slate-200 border rounded-xl hover:bg-slate-100"
                          onClick={() => setOrderType("STOP_LIMIT_ORDER")}
                        >
                          Stop Limit Order
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
              <CarouselItem>
                <Card>
                  <CardHeader>
                    <CardTitle>Place Order</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="">
                      <span className="bg-green-300 px-4 py-2 rounded-lg mr-2">
                        Buy
                      </span>
                      <Switch
                        checked={side !== 1}
                        onCheckedChange={(state) =>
                          state ? setSide(-1) : setSide(1)
                        }
                      />
                      <span className="bg-red-300 px-4 py-2 rounded-lg ml-2">
                        Sell
                      </span>
                    </div>
                    <div className="w-20">
                      <Label htmlFor="email">Price</Label>
                      <Input
                        type="number"
                        step=".05"
                        id="email"
                        placeholder="Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </div>
                    <div className="w-20">
                      <Label htmlFor="qty">Qty</Label>
                      <Input
                        type="number"
                        id="qty"
                        placeholder="Qty"
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      />
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        <DialogFooter>
          <Button variant="addUser" type="submit" onClick={newTradeAPICall}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TradeButton;
