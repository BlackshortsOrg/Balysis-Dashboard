"use client";
import { AlgoTradeTable } from "@/components/AlgoTrade/AlgoTradeTable";
import { useState } from "react";
export default function algo() {
  const name = "STR-V5 50";
  const unrealizedpnl = 123.3;
  const realizedpnl = 12.3;
  const numpositions = 3;

  

  const column = [
    {
      header: "ID",
      accessorKey: "id",
    },
    {
      header: "Name",
      accessorKey: "name",
      cell: ({ cell, row }) => (
        <div className="flex flex-row items-center">
          <img
            className="rounded-full"
            src="/images/dummy.png"
            width={40}
            height={40}
            alt="Dummy Image"
          />
          <a
            className="ml-2 hover:underline"
            href={`/clientpositions/${row.original.id}`}
          >
            {cell.getValue()}
          </a>
        </div>
      ),
    },
    {
      header: "Multiplier",
      accessorKey: "multiplier",
      cell: ({ value }) => {
        const [multi, setMultiplier] = useState(1);
        return (
          <input
            type="number"
            value={multi}
            onChange={(e) => setMultiplier(e.target.value)}
          />
        );
      },
    },
  ];

  const data = [
    {
      id: 1,
      name: "Esharky",
      
    },
    {
      id: 2,
      name: "Aadeesh",
      
    },
    {
      id: 3,
      name: "Abhishek",
     
    },
  ];

  return (
    <div className="bg-[#F8FCFF] w-full h-[100vh] overflow-auto">
      <div className="flex flex-row w-full pt-10">
        <h1 className="pl-[50px] font-bold text-2xl">STR V1 50</h1>
      </div>
      <div className="mx-12">
        <div>
          <AlgoTradeTable columns={column} data={data} />
        </div>
      </div>
    </div>
  );
}
