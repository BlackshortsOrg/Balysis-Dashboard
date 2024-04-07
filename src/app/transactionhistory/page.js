"use client";
import React, { useEffect, useState } from "react";
import { TxTable } from "@/components/TransactionHistory/table";
import Image from "next/image";
import { getTransactionHistoryAPI } from "@/api/getTransactionHistory";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { Listbox } from "@headlessui/react";



const transactionhistory = () => {
  const [daily, setDaily] = useState(true);
  const [data, setData] = useState([]);

  const all_strategies = [
    "",
    ...new Set(data.map((item) => item.strategy_name)),
  ];
  const status_options = ["PENDING", "TRADED", "REJECTED", "FAILED", ""];
  const all_users = ["", ...new Set(data.map((item) => item.name))];

  const columns = [
    // {
    //   header: "Transaction ID",
    //   accessorKey: "transaction_id",
    //   width: "auto",
    // },
    {
      id: "id",
      accessorKey: "id",
    },
    {
      header: "Time",
      accessorKey: "created_at",
      cell: ({ cell }) => {
        const date = moment(new Date(cell.getValue())).format(
          "DD/MM/YYYY hh:mm:ss A"
        );
        return <p className="">{date}</p>;
      },
    },
    {
      header: "Symbol",
      cell: ({ cell, row }) => (
        <div>
          {`${row.original.symbol} | ${row.original.segment} | ${row.original.product_type}`}
        </div>
      ),
    },
    {
      header: "Order Type",
      cell: ({ cell, row }) => <div>{row.original.order_type}</div>,
    },
    {
      header: "Limit Price",
      accessorKey: "limit_price",
      cell: ({ cell }) => {
        const val = cell.getValue();
        return (
          <div className="text-center">
            {val == -1 || val == 0 ? "--" : val}
          </div>
        );
      },
    },
    {
      header: "Stop Price",
      accessorKey: "stop_price",
      cell: ({ cell }) => {
        const val = cell.getValue();
        return (
          <div className="text-center">
            {val == -1 || val == 0 ? "--" : val}
          </div>
        );
      },
    },
    {
      header: "Side",
      accessorKey: "side",
      cell: ({ cell }) => {
        return <div>{cell.getValue() == 1 ? "BUY" : "SELL"}</div>;
      },
    },
    // {
    //   header: "Signal ID",
    //   accessorKey: "id",
    //   cell: ({ cell, row }) => {
    //     console.log(row);
    //     return (
    //       <HoverCard>
    //         <HoverCardTrigger>
    //           <p className="text-blue-500 cursor-pointer">{cell.getValue()}</p>
    //         </HoverCardTrigger>
    //         <HoverCardContent>
    //           <div className="flex flex-col">
    //             <p className="text-xs font-semibold">
    //               Signal Type: {row.original.signal_type}
    //             </p>
    //             <p className="text-xs">Order Type: {row.original.order_type}</p>
    //             <p className="text-xs">Ref ID: {row.original.ref_id}</p>
    //             <p className="text-xs">
    //               Ticker:{" "}
    //               {`${row.original.exchange}:${row.original.symbol}-${row.original.exchange}-${row.original.product_type}`}
    //             </p>
    //             <p className="text-xs">Limit Price: {row.original.limit_price}</p>
    //             <p className="text-xs">Stop Price: {row.original.stop_price}</p>
    //           </div>
    //         </HoverCardContent>
    //       </HoverCard>
    //     );
    //   },
    // },
    {
      header: ({ table }) => (
        <div className="flex flex-row">
          <div>Name</div>
          <div className="ml-2">
            <div className="relative">
              <Listbox
                value={table.getColumn("name")?.getFilterValue() ?? ""}
                onChange={(value) => {
                  table.getColumn("name")?.setFilterValue(value);
                }}
              >
                <Listbox.Button className="border shadow-sm rounded-md px-2 py-1 flex flex-col">
                  <FontAwesomeIcon icon={faFilter} />
                </Listbox.Button>
                <Listbox.Options className="absolute border-2 border-blue-400 z-10 mt-1 bg-white rounded-md shadow-lg text-center">
                  {all_users.map((option) => (
                    <Listbox.Option
                      className={`p-1 border-1 uppercase rounded-md cursor-pointer ${
                        option ===
                        table.getColumn("strategy_name")?.getFilterValue()
                          ? "bg-blue-400 text-white"
                          : "hover:bg-blue-400 hover:text-white"
                      }`}
                      key={option}
                      value={option}
                    >
                      {option ? option : "None"}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Listbox>
            </div>
          </div>
        </div>
      ),
      accessorKey: "name",
      cell: ({ cell }) => (
        <div className="flex flex-row items-center mx-1">
          <Image
            className="rounded-full"
            src="/images/dummy.png"
            width={40}
            height={40}
          />
          <p className="ml-2">{cell.getValue()}</p>
        </div>
      ),
    },
    {
      header: ({ table }) => (
        <div className="flex flex-row">
          <div>Strategy</div>
          <div className="ml-2">
            <div className="relative">
              <Listbox
                value={table.getColumn("strategy_name")?.getFilterValue() ?? ""}
                onChange={(value) => {
                  table.getColumn("strategy_name")?.setFilterValue(value);
                }}
              >
                <Listbox.Button className="border shadow-sm rounded-md px-2 py-1 flex flex-col">
                  <FontAwesomeIcon icon={faFilter} />
                </Listbox.Button>
                <Listbox.Options className="absolute border-2 border-blue-400 z-10 mt-1 bg-white rounded-md shadow-lg text-center">
                  {all_strategies.map((option) => (
                    <Listbox.Option
                      className={`p-1 border-1 uppercase rounded-md cursor-pointer ${
                        option ===
                        table.getColumn("strategy_name")?.getFilterValue()
                          ? "bg-blue-400 text-white"
                          : "hover:bg-blue-400 hover:text-white"
                      }`}
                      key={option}
                      value={option}
                    >
                      {option ? option : "None"}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Listbox>
            </div>
          </div>
        </div>
      ),
      accessorKey: "strategy_name",
    },
    {
      header: ({ table }) => (
        <div className="flex flex-row">
          <div>Status</div>
          <div className="ml-2">
            <div className="relative">
              <Listbox
                value={table.getColumn("status")?.getFilterValue() ?? ""}
                onChange={(value) => {
                  table.getColumn("status")?.setFilterValue(value);
                }}
              >
                <Listbox.Button className="border shadow-sm rounded-md px-2 py-1 flex flex-col">
                  <FontAwesomeIcon icon={faFilter} />
                </Listbox.Button>
                <Listbox.Options className="absolute border-2 border-blue-400 z-10 mt-1 bg-white rounded-md shadow-lg text-center">
                  {status_options.map((option) => (
                    <Listbox.Option
                      className={`p-1 border-1 uppercase rounded-md cursor-pointer ${
                        option === table.getColumn("status")?.getFilterValue()
                          ? "bg-blue-400 text-white"
                          : "hover:bg-blue-400 hover:text-white"
                      }`}
                      key={option}
                      value={option}
                    >
                      {option ? option : "None"}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Listbox>
            </div>
          </div>
        </div>
      ),
      accessorKey: "status",
      cell: ({ cell }) => {
        switch (cell.getValue()) {
          case "PENDING":
            return (
              <div>
                <p className="bg-yellow-200 text-yellow-600 font-semibold text-xs border-yellow-600 py-1 border text-center rounded-sm">
                  PENDING
                </p>
              </div>
            );
          case "TRADED":
            return (
              <div>
                <p className="bg-green-200 text-green-600 font-semibold text-xs border-green-600 py-1 border text-center rounded-sm">
                  TRADED
                </p>
              </div>
            );
          case "FILLED":
            return (
              <div>
                <p className="bg-green-200 text-green-600 font-semibold text-xs border-green-600 py-1 text-center border rounded-sm">
                  FILLED
                </p>
              </div>
            );
          case "REJECTED":
            return (
              <div>
                <p className="bg-red-200 text-red-600 font-semibold text-xs border-red-600 py-1 border text-center rounded-sm">
                  REJECTED
                </p>
              </div>
            );
          case "FAILED":
            return (
              <div>
                <p className="bg-red-200 text-red-600 font-semibold text-xs border-red-600 py-1 border text-center rounded-sm">
                  FAILED
                </p>
              </div>
            );
          case "CANCELLED":
            return (
              <div>
                <p className="bg-red-200 text-red-600 font-semibold text-xs border-red-600 py-1 text-center border rounded-sm">
                  CANCELLED
                </p>
              </div>
            );
        }
      },
    },
    {
      header: "Traded Price",
      accessorKey: "traded_price",
      cell: ({ cell }) => {
        const val = cell.getValue();
        return (
          <div className="text-center">
            {val == -1 || val == 0 ? "--" : val}
          </div>
        );
      },
    },
    {
      header: "Traded Qty",
      accessorKey: "filledqty",
      cell: ({ cell }) => {
        const val = cell.getValue();
        return (
          <div className="text-center">
            {val == -1 || val == 0 ? "--" : val}
          </div>
        );
      },
    },
    {
      header: "Message",
      accessorKey: "message",
      maxWidth: "20px",
      overflow: "auto",
      cell: ({ cell }) => {
        return (
          <div className="max-w-[100px] max-h-[40px] overflow-auto">
            {cell.getValue()}
          </div>
        );
      },
    },
  ];
  async function checkLogin() {
    if (localStorage.getItem("token") === null) {
      window.location.href = "/login";
    } else {
      return localStorage.getItem("token");
    }
  }

  
  async function callAPI(token) {
    const data = await getTransactionHistoryAPI(token, daily);
    setData(data);
  }

  useEffect(() => {
    checkLogin().then((token) => {
      callAPI(token);
    });
  }, [daily]);

  return (
    <div className="h-screen w-full mx-8 overflow-auto">
      <h1 className="text-4xl my-4 font-semibold">Transaction History</h1>
      <TxTable
        columns={columns}
        data={data}
        daily={daily}
        setDaily={setDaily}
      />
    </div>
  );
};

export default transactionhistory;
