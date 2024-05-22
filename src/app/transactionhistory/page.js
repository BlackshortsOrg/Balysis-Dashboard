"use client";
import React, { useEffect, useState } from "react";
import { TxTable } from "@/components/TransactionHistory/table";
import Image from "next/image";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
} from "@tanstack/react-table";
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
import { FaRegCalendarAlt } from "react-icons/fa";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const transactionhistory = () => {
  const [daily, setDaily] = useState(true);
  const [data, setData] = useState([]);
  const [dateRangeState, setDateRangeState] = useState([
    { startDate: new Date(), endDate: new Date(), key: "selection" },
  ]);

  const status_options = ["PENDING", "TRADED", "FAILED", "CANCELLED", ""];

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
          "DD/MM/YYYY hh:mm:ss A",
        );
        return <p className="">{date}</p>;
      },
    },
    {
      id: "symbol",
      header: ({ table, column }) => {
        const all_symbols = [
          "",
          ...new Set(
            column
              .getFacetedRowModel()
              .flatRows.map((item) => item.original.symbol),
          ),
        ];
        return (
          <div className="flex flex-row">
            <div>Symbol</div>
            <div className="ml-2">
              <div className="relative">
                <Listbox
                  value={table.getColumn("symbol")?.getFilterValue() ?? ""}
                  onChange={(value) => {
                    table.getColumn("symbol")?.setFilterValue(value);
                  }}
                >
                  <Listbox.Button className="border shadow-sm rounded-md px-2 py-1 flex flex-col">
                    <FontAwesomeIcon icon={faFilter} />
                  </Listbox.Button>
                  <Listbox.Options className="absolute border-2 border-blue-400 z-10 mt-1 bg-white rounded-md shadow-lg text-center">
                    {all_symbols.map((option) => (
                      <Listbox.Option
                        className={`p-1 border-1 uppercase rounded-md cursor-pointer ${
                          option === table.getColumn("symbol")?.getFilterValue()
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
        );
      },
      accessorKey: "symbol",
      cell: ({ cell, row }) => (
        <div>{`${row.original.symbol}-${row.original.product_type}`}</div>
      ),
    },
    {
      header: "Order Type",
      cell: ({ cell, row }) => {
        switch (row.original.order_type) {
          case "MARKET_ORDER":
            return "Market";
          case "LIMIT_ORDER":
            return "Limit";
          case "STOP_ORDER":
            return "SL-M";
          case "STOP_LIMIT_ORDER":
            return "SL";
          default:
            return row.original.order_type;
        }
      },
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
        if (cell.getValue() == 1) {
          return (
            <div className="text-green-600 font-semibold bg-green-200 border-[1px] px-2 border-green-600">
              BUY
            </div>
          );
        } else {
          return (
            <div className="text-red-600 font-semibold bg-red-200 border-[1px] px-2 border-red-600">
              SELL
            </div>
          );
        }
      },
    },
    {
      header: ({ table, column }) => {
        const all_users = [
          "",
          ...new Set(
            column
              .getFacetedRowModel()
              .flatRows.map((item) => item.original.name),
          ),
        ];
        console.log("All Users", all_users);
        return (
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
        );
      },
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
      header: ({ table, column }) => {
        const all_strategies = [
          "",
          ...new Set(
            column
              .getFacetedRowModel()
              .flatRows.map((item) => item.original.strategy_name),
          ),
        ];
        return (
          <div className="flex flex-row">
            <div>Strategy</div>
            <div className="ml-2">
              <div className="relative">
                <Listbox
                  value={
                    table.getColumn("strategy_name")?.getFilterValue() ?? ""
                  }
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
        );
      },
      accessorKey: "strategy_name",
    },
    {
      header: ({ table }) => (
        <div className="flex flex-row">
          <div>Status</div>
          <div className="ml-2">
            <div className="relative">
              <Listbox
                value={table.getColumn("status")?.getFilterValue() ?? "TRADED"}
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
      id: "status",
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

  const [rowSelection, setRowSelection] = React.useState({});
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({ id: false });

  const table = useReactTable({
    data,
    columns,
    columnResizeMode: "onChange",
    columnResizeDirection: "ltr",
    getCoreRowModel: getCoreRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    onRowSelectionChange: setRowSelection,
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      rowSelection,
      columnFilters,
      columnVisibility,
    },
    initialState: {
      pagination: {
        pageSize: 12,
      },
    },
    enableRowSelection: true,
  });

  async function checkLogin() {
    if (localStorage.getItem("token") === null) {
      window.location.href = "/login";
    } else {
      return localStorage.getItem("token");
    }
  }

  async function callAPI(token) {
    const start_time = dateRangeState[0].startDate
      ? dateRangeState[0].startDate
      : new Date(0);
    start_time.setHours(0, 0, 0);
    const start = start_time.getTime() / 1000;
    const end_time = dateRangeState[0].endDate;
    const end = end_time.getTime() / 1000;
    end_time.setHours(23, 59, 59);
    const data = await getTransactionHistoryAPI(token, start, end);
    setData(data);
  }

  useEffect(() => {
    checkLogin().then((token) => {
      callAPI(token);
    });
  }, [dateRangeState]);

  return (
    <div className="h-screen w-full mx-8 overflow-auto">
      <div className="flex">
        <h1 className="text-4xl my-4 font-semibold">Transaction History</h1>
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
      <TxTable
        table={table}
        columns={columns}
        data={data}
        daily={daily}
        setDaily={setDaily}
      />
    </div>
  );
};

export default transactionhistory;
