import { Button } from "@/components/ui/button";
import { placeTradeAPI } from "@/api/placeTrade";
import _ from "lodash";
import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { Combobox } from "@headlessui/react";
import SegmentCarousel from "./SegmentCarousel";
import Fuse from "fuse.js";
import {
  getEquityTickersAPI,
  getFuturesTickersAPI,
  getOptionsTickersAPI,
} from "@/api/getTickers";
import OrderTypeCarousel from "./orderTypeCarousel";
import PlaceOrderCarousel from "./placeOrderCarousel";
import { getAllPresets } from "@/api/getAllPresets";
import moment from "moment";

const TradeButton = () => {
  const [stocksList, setStocksList] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null)
  const [token, setToken] = useState("");
  const [query, setQuery] = useState("");
  const [carouselApi, setCarouselAPI] = useState()

  const fuse = new Fuse(stocksList, { keys: ["symbol"] })
  const filteredStocksList = query === "" ? stocksList.slice(0, 50) : fuse.search(query).slice(0, 50)
  console.log(filteredStocksList)

  async function checkLogin() {
    if (sessionStorage.getItem("token") === null) {
      window.location.href = "/login";
    } else {
      const tk = sessionStorage.getItem("token");
      setToken(tk);
      return tk;
    }
  }
  async function fetchStocksData(token) {
    await Promise.all([setEquityData(token), setOptionsData(token), setFuturesData(token)])
  }

  async function setEquityData(token) {
    const data = await getEquityTickersAPI(token);
    setStocksList([...stocksList, ...data])
  }
  async function setOptionsData(token) {
    const data = await getOptionsTickersAPI(token);
    setStocksList([...stocksList, ...data])
  }
  async function setFuturesData(token) {
    const data = await getFuturesTickersAPI(token);
    setStocksList([...stocksList, ...data])
  }

  useEffect(() => {
    checkLogin().then((token) => {
      fetchStocksData(token).then()
    })
  }, [])
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="addUser">
          <Pencil2Icon />
          <span className="mx-2">Trade</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[825px]">
        <DialogHeader>
          <DialogTitle className="">{selectedStock?.symbol}</DialogTitle>
        </DialogHeader>
        <div className="px-6">
          <Carousel setApi={setCarouselAPI} className="max-w-[725px]">
            <CarouselContent>
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
                          displayValue={(stock) => stock?.fyers_ticker}
                          className="w-full bg-slate-50 border-slate-200 border rounded-xl px-4 py-2 mt-4"
                        />
                        <Combobox.Options className="bg-slate-50 py-1 rounded-xl mt-2 overflow-auto h-[200px]">
                          {filteredStocksList.map((stock) => (
                            <Combobox.Option
                              key={stock.item.ticker}
                              value={stock.item}
                              className=""
                            >
                              <div className="hover:bg-[#41AFFF] pl-4 py-2 hover:text-white rounded-xl" onClick={() => carouselApi.scrollNext()}>
                                {stock.item.fyers_ticker + ", "}
                                {stock.item.segment === "FUT" || stock.item.segment === "OPT"
                                  ? (moment(new Date(parseInt(stock.expiry) * 1000)).format("Do MMM") + ", ")
                                  : ""}{""}

                                {stock.item.segment === "FUT" || stock.item.segment === "OPT"
                                  ? (stock.item.lotsize + ", ")
                                  : ""}{" "}
                                {stock.item.name}
                              </div>
                            </Combobox.Option>
                          ))}
                        </Combobox.Options>
                      </Combobox>
                    </CardContent>
                  </CardHeader>
                </Card>
              </CarouselItem>
            </CarouselContent>
          </Carousel>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// const TradeButton = ({rowSelection, data, refresh, setRefresh}) => {
//   const [segment, setSegment] = useState("Equity");
//   const [orderType, setOrderType] = useState("");
//   const [limit_price, setLimitPrice] = useState(0.0);
//   const [stop_price, setStopPrice] = useState(0.0);
//   const [product_type, setProductType] = useState("INTRADAY");
//   const [qty, setQty] = useState(0);
//   const [side, setSide] = useState(1);
//   const [stocks, setStocks] = useState([]);
//
//   const [presets, setPresets] = useState(["None"])
//   const [presetObj, setPresetObj] = useState({})
//
//
//   useEffect(() => {
//     checkLogin().then((token) => {
//       switch (segment) {
//         case "Equity":
//           setEquityData(token);
//           break;
//         case "Futures":
//           setFuturesData(token);
//           break;
//         case "Options":
//           setOptionsData(token);
//           break;
//         default:
//           break;
//       }
//       getAllPresets(token).then((resp) => {
//         setPresetObj(resp)
//         console.log(resp)
//         console.log([...Object.keys(resp), "None"])
//         setPresets([...Object.keys(resp), "None"])
//       })
//     });
//   }, [segment]);
//
//   const newTradeAPICall = (e) => {
//     if (!selectedStock) {
//       toast("Please select a valid stock", {dismissible: true })
//       return
//     }
//     if (!orderType) {
//       toast.error("Please select order Type")
//       return
//     }
//     console.log(rowSelection);
//     var selectedIds = [];
//     for (const [rownum, state] of Object.entries(rowSelection)) {
//       selectedIds.push(parseInt(data[rownum].id));
//     }
//     console.log(selectedIds);
//     e.preventDefault();
//     if (selectedSet === "None") {
//       const tradeData = {
//         exchange: selectedStock.exchange,
//         symbol: selectedStock.symbol,
//         segment: selectedStock.segment,
//         signal_type: "NEW_ORDER",
//         product_type: product_type,
//         order_type: orderType,
//         limit_price: parseFloat(limit_price),
//         stop_price: parseFloat(stop_price),
//         users: selectedIds,
//         quantity: qty,
//         side: side,
//       };
//       console.log(tradeData);
//       if (selectedIds.length === 0) {
//         toast("Please select users or set")
//         return
//       }
//       placeTradeAPI(tradeData, token).then((resp) => {
//         toast("Trade placed successfully");
//       });
//     } else {
//       console.log(selectedSet, presetObj, presetObj[selectedSet])
//       for (const user of presetObj[selectedSet]) {
//         console.log(user)
//         const tradeData = {
//           exchange: selectedStock.exchange,
//           symbol: selectedStock.symbol,
//           segment: selectedStock.segment,
//           signal_type: "NEW_ORDER",
//           product_type: product_type,
//           order_type: orderType,
//           limit_price: parseFloat(limit_price),
//           stop_price: parseFloat(stop_price),
//           users: [user.user_id],
//           quantity: qty * user.multiplier,
//           side: side,
//         };
//         placeTradeAPI(tradeData, token).then((resp) => {
//           toast("Trade placed successfully");
//         });
//       }
//     }
//     setRefresh(!refresh)
//   };
//
//   const [selectedStock, setSelectedStock] = useState(stocks[0]);
//   const [selectedSet, setSelectedSet] = useState(presets[0])
//   const [query, setQuery] = useState("");
//   const [setsQuery, setSetsQuery] = useState("")
//
//   const filteredSets =
//     setsQuery === ""
//       ? presets.slice(0, 50)
//       : presets
//         .filter((preset) => {
//           return preset.toLowerCase().includes(setsQuery.toLowerCase());
//         })
//         .slice(0, 50);
//
//   const filteredStocks =
//     query === ""
//       ? stocks.slice(0, 50)
//       : stocks
//         .filter((stock) => {
//           return stock.symbol.toLowerCase().includes(query.toLowerCase());
//         })
//         .slice(0, 50);
//
//   const [carouselApi, setCarouselAPI] = useState()
//
//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button variant="addUser">
//           <Pencil2Icon />
//           <span className="mx-2">Trade</span>
//         </Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[825px]">
//         <DialogHeader>
//           <DialogTitle className="">Trade - {segment} | {selectedStock ? selectedStock.symbol : ""} | {orderType}</DialogTitle>
//         </DialogHeader>
//         <div className="px-6">
//           <Carousel setApi={setCarouselAPI} className="max-w-[725px]">
//             <CarouselContent>
//               <CarouselItem>
//                 <SegmentCarousel segment={segment} setSegment={setSegment} carouselApi={carouselApi} />
//               </CarouselItem>
//               <CarouselItem>
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Chose Stock</CardTitle>
//                     <CardContent>
//                       <Combobox
//                         value={selectedStock}
//                         onChange={setSelectedStock}
//                       >
//                         <Combobox.Input
//                           onChange={(event) => setQuery(event.target.value)}
//                           displayValue={(stock) => stock.fyers_ticker}
//                           className="w-full bg-slate-50 border-slate-200 border rounded-xl px-4 py-2 mt-4"
//                         />
//                         <Combobox.Options className="bg-slate-50 py-1 rounded-xl mt-2 overflow-auto h-[200px]">
//                           {filteredStocks.map((stock) => (
//                             <Combobox.Option
//                               key={stock.ticker}
//                               value={stock}
//                               className=""
//                             >
//                               <div className="hover:bg-[#41AFFF] pl-4 py-2 hover:text-white rounded-xl" onClick={() => carouselApi.scrollNext()}>
//                                 {stock.fyers_ticker + ", "}
//                                 {segment === "Futures" || segment === "Options"
//                                   ? (moment(new Date(parseInt(stock.expiry) * 1000)).format("Do MMM") + ", ")
//                                   : ""}{""}
//
//                                 {segment === "Futures" || segment === "Options"
//                                   ? (stock.lotsize + ", ")
//                                   : ""}{" "}
//                                 {stock.name}
//                               </div>
//                             </Combobox.Option>
//                           ))}
//                         </Combobox.Options>
//                       </Combobox>
//                     </CardContent>
//                   </CardHeader>
//                 </Card>
//               </CarouselItem>
//               <CarouselItem>
//                 <OrderTypeCarousel
//                   orderType={orderType}
//                   setOrderType={setOrderType}
//                   carouselApi={carouselApi}
//                 />
//               </CarouselItem>
//               <CarouselItem>
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>
//                       Chose Set
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <Combobox
//                       value={selectedSet}
//                       onChange={setSelectedSet}
//                     >
//                       <Combobox.Input
//                         onChange={(event) => setSetsQuery(event.target.value)}
//                         displayValue={(set) => set}
//                         className="w-full bg-slate-50 border-slate-200 border rounded-xl px-4 py-2 mt-4"
//                       />
//                       <Combobox.Options className="bg-slate-50 py-1 rounded-xl mt-2 overflow-auto h-[200px]">
//                         {filteredSets.map((set) => (
//                           <Combobox.Option
//                             key={set}
//                             value={set}
//                             className=""
//                           >
//                             <div className="hover:bg-[#41AFFF] pl-4 py-2 hover:text-white rounded-xl" onClick={() => carouselApi.scrollNext()}>
//                               {set}
//                               {/* {stock.fyers_ticker}, */}
//                               {/* {segment === "Futures" || segment === "Options" */}
//                               {/*   ? new Date(stock.expiry).toString() */}
//                               {/*   : ""}{" "} */}
//                               {/* , */}
//                               {/* {segment === "Futures" || segment === "Options" */}
//                               {/*   ? stock.lotsize */}
//                               {/*   : ""}{" "} */}
//                               {/* ,{stock.name},{" "} */}
//                             </div>
//                           </Combobox.Option>
//                         ))}
//                       </Combobox.Options>
//                     </Combobox>
//                   </CardContent>
//                 </Card>
//               </CarouselItem>
//               <CarouselItem>
//                 <PlaceOrderCarousel
//                   selectedStock={selectedStock}
//                   side={side}
//                   setSide={setSide}
//                   limit_price={limit_price}
//                   setLimitPrice={setLimitPrice}
//                   stop_price={stop_price}
//                   setStopPrice={setStopPrice}
//                   product_type={product_type}
//                   setProductType={setProductType}
//                   qty={qty}
//                   setQty={setQty}
//                 />
//               </CarouselItem>
//             </CarouselContent>
//             <CarouselPrevious />
//             <CarouselNext />
//           </Carousel>
//         </div>
//         <DialogFooter onClick={newTradeAPICall}>
//           <DialogClose asChild>
//             <Button variant="addUser" type="submit" >
//               Submit
//             </Button>
//           </DialogClose>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// };

export default TradeButton;
