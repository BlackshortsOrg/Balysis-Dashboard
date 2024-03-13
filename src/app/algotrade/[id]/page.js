"use client";
import { AlgoTradeTable } from "@/components/AlgoTrade/AlgoTradeTable";
import TrxJournals, { TrnxJournals } from "@/components/AlgoTrade/TrnxJournals";
import Variable from "@/components/AlgoTrade/Variable";
import Breadcrumbs from "@/components/Breadcrumb";
import SecurityCards from "@/components/Dashboard/SecurityCards";
import { Tabs } from "@/components/Tab";
import { useCallback, useEffect, useState } from "react";
export default function algo() {
  const [metrics, setMetrics] = useState({
    totalpnl: 100000,
    realizedpnl: 100000,
    unrealizedpnl: 100000,
    equitypnl: 100000,
    dertivativepnl: 100000,
    commoditypnl: 100000,
  });

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
    <div className="bg-[#F8FCFF] w-full h-[100vh] relative">
      <div className="flex flex-row w-full pt-10">
        <Breadcrumbs
          crumbs={[
            { text: "Algo Trade", path: "/algotrade" },
            { text: "STR V1 50" },
          ]}
        />
      </div>
      <SecurityCards metrics={metrics} />
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
