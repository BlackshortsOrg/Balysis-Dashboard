import { Button } from "@/components/ui/button";
import _ from "lodash";
import {
  Dialog,
  DialogContent,
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
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { Combobox } from "@headlessui/react";
import SegmentCarousel from "./SegmentCarousel";
import { getEquityTickersAPI, getFuturesTickersAPI, getOptionsTickersAPI } from "@/api/getTickers";
import OrderTypeCarousel from "./orderTypeCarousel";
import PlaceOrderCarousel from "./placeOrderCarousel";

const TradeButton = ({ rowSelection, data }) => {
  const [segment, setSegment] = useState("Equity");
  const [orderType, setOrderType] = useState("MARKET_ORDER");
  const [limit_price, setLimitPrice] = useState(0.0);
  const [stop_price, setStopPrice] = useState(0.0);
  const [product_type, setProductType] = useState("INTRADAY");
  const [qty, setQty] = useState(0);
  const [side, setSide] = useState(1);
  const [stocks, setStocks] = useState([]);

  async function setEquityData() {
    const data = await getEquityTickersAPI();
    console.log(data);
    setStocks(data);
  }
  async function setOptionsData() {
    const data = await getOptionsTickersAPI();
    console.log(data);
    setStocks(data);
  }
  async function setFuturesData() {
    const data = await getFuturesTickersAPI();
    console.log(data);
    setStocks(data);
  }

  useEffect(() => {
    switch (segment) {
      case "Equity":
        setEquityData();
        break;
      case "Futures":
        setFuturesData();
        break;
      case "Options":
        setOptionsData();
        break;
      default:
        break;
    }
  }, [segment]);

  const newTradeAPICall = (e) => {
    console.log(rowSelection);
    var selectedIds = [];
    for (const [rownum, state] of Object.entries(rowSelection)) {
      selectedIds.push(data[rownum].id);
    }
    console.log(selectedIds);
    e.preventDefault();
    const tradeData = {
      exchange: selectedStock.exchange,
      symbol: selectedStock.symbol,
      segment: segment,
      signal_type: "NEW_ORDER",
      order_type: orderType,
      limit_price: limit_price,
      stop_price: stop_price,
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
          return stock.symbol.toLowerCase().includes(query.toLowerCase());
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
                        onChange={setSelectedStock}
                      >
                        <Combobox.Input
                          onChange={(event) => setQuery(event.target.value)}
                          displayValue={(stock) => stock.fyers_ticker}
                          className="w-full bg-slate-50 border-slate-200 border rounded-xl px-4 py-2 mt-4"
                        />
                        <Combobox.Options className="bg-slate-50 py-1 rounded-xl mt-2 overflow-auto h-[200px]">
                          {filteredStocks.map((stock) => (
                            <Combobox.Option
                              key={stock.ticker}
                              value={stock}
                              className=""
                            >
                              <div className="hover:bg-[#41AFFF] pl-4 py-2 hover:text-white rounded-xl">
                                {stock.fyers_ticker},
                                {segment === 'Futures' || segment === 'Options' ? (new Date(stock.expiry)).toString() : ""} {" "},
                                {segment === 'Futures' || segment === 'Options' ? stock.lotsize : ""} {" "},
                                {stock.name}, {" "}
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
                <OrderTypeCarousel orderType={orderType} setOrderType={setOrderType} />
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
