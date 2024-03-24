"use client";
import { AlgoTradeTable } from "@/components/AlgoTrade/AlgoTradeTable";
import TrxJournals, { TrnxJournals } from "@/components/AlgoTrade/TrnxJournals";
import Variable from "@/components/AlgoTrade/Variable";
import Breadcrumbs from "@/components/Breadcrumb";
import SecurityCards from "@/components/Dashboard/SecurityCards";
import { Tabs } from "@/components/Tab";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
export default function algo() {
  const [metrics, setMetrics] = useState({
    totalpnl: 100000,
    realizedpnl: 100000,
    unrealizedpnl: 100000,
    equitypnl: 100000,
    dertivativepnl: 100000,
    commoditypnl: 100000,
  });

  const searchParams = useSearchParams();

  const [activeTab, setActiveTab] = useState("MULTIPLIER");

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
          <div
            className="ml-2">
            {cell.getValue()}
          </div>
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
    {
      header: 'Unrealized PnL',
      accessorKey: 'unrealizedPnL',
      cell: ({cell, row}) => (
        <div className={`flex flex-row items-center ${cell.getValue()<0? 'text-red-500':'text-green-500'}`}>{cell.getValue()}</div>
      )
    },
    {
      header: 'Realized PnL',
      accessorKey: 'realizedPnL',
      cell: ({cell, row}) => (
        <div className={`flex flex-row items-center ${cell.getValue()<0? 'text-red-500':'text-green-500'}`}>{cell.getValue()}</div>
      )
    },
    {
      id: "actions",
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex flex-row items-center">
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.625 2.5C8.625 3.12132 8.12132 3.625 7.5 3.625C6.87868 3.625 6.375 3.12132 6.375 2.5C6.375 1.87868 6.87868 1.375 7.5 1.375C8.12132 1.375 8.625 1.87868 8.625 2.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM7.5 13.625C8.12132 13.625 8.625 13.1213 8.625 12.5C8.625 11.8787 8.12132 11.375 7.5 11.375C6.87868 11.375 6.375 11.8787 6.375 12.5C6.375 13.1213 6.87868 13.625 7.5 13.625Z"
                    fill="currentColor"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </MenubarTrigger>
              <MenubarContent>
                <MenubarItem>Square Off</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Reduce QTY by Half</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Convert NRML to MIS</MenubarItem>
                <MenubarItem>Convert MIS to NRML</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
      ),
    },
  ];

  //* Expected format of data from backend
  const data = [
    {
      id: 1,
      name: "Esharky",
      unrealizedPnL: "-90",
      realizedPnL: '+5000'
    },
    {
      id: 2,
      name: "Aadeesh",
      unrealizedPnL:'+10',
      realizedPnL: '+500'
    },
    {
      id: 3,
      name: "Abhishek",
      unrealizedPnL: '+100',
      realizedPnL: '+1000'
    },
  ];

  const AlgoTabs = [
    { label: "Multiplier", value: "MULTIPLIER" },
    { label: "Variables", value: "VARIABLES" },
    { label: "Trnx Journals", value: "TRNX_JOURNALS" },
  ];

  const ALGO_CONFIG = {
    MULTIPLIER: "MULTIPLIER",
    VARIABLES: "VARIABLES",
    TRNX_JOURNALS: "TRNX_JOURNALS",
  };

  async function checkLogin() {
    if (sessionStorage.getItem("token") === null) {
      window.location.href = "/login";
    } else {
      const tk = sessionStorage.getItem("token");
      // setToken(tk);
      return tk;
    }
  }
  async function fetchCombinedStrategyMetrics(token) {
    //* TODO: Add api
    return;
    // setMetrics(global_metrics);
  }

  useEffect(() => {
    checkLogin().then((token) => {
      fetchCombinedStrategyMetrics(token);
    });
  }, []);

  return (
    <div className="bg-[#F8FCFF] w-full h-[100vh] relative overflow-auto">
      <div className="flex flex-row w-full pt-10">
        <Breadcrumbs
          crumbs={[
            { text: "Algo Trade", path: "/algotrade" },
            { text: searchParams.get('strategy_name') },
          ]}
        />
      </div>
      <div className="mx-12">
        {/* Tabs for Multiplier, Variables, and Transaction Journals */}
        <div className="py-6">
          <Tabs
            {...AlgoTabs[0]}
            onClick={setActiveTab}
            currentValue={activeTab}
          />
          <Tabs
            {...AlgoTabs[1]}
            onClick={setActiveTab}
            currentValue={activeTab}
          />
          <Tabs
            {...AlgoTabs[2]}
            onClick={setActiveTab}
            currentValue={activeTab}
          />
        </div>

        <div className="py-6 w-full h-full">
          {/* Conditionally render content based on the active tab */}
          {activeTab === ALGO_CONFIG.MULTIPLIER && (
            <AlgoTradeTable columns={column} data={data} />
          )}
          {activeTab === ALGO_CONFIG.VARIABLES && <Variable />}
          {activeTab === ALGO_CONFIG.TRNX_JOURNALS && <TrxJournals />}
        </div>
      </div>
    </div>
  );
}
