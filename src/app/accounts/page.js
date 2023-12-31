import React from "react";
import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { UserTable } from "@/components/Accounts/table";

const data = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "728ed42f",
    amount: 120,
    status: "complete",
    email: "abc@gmail.com",
  },
];

const columns = [
  {
    header: "ID",
    accessorKey: "id",
  },
  {
    header: "Amount",
    accessorKey: "amount",
  },
  {
    header: "Status",
    accessorKey: "status",
  },
  {
    header: "Email",
    accessorKey: "email",
  },
];

const accounts = () => {
  return (
    <div className="h-screen w-full mx-8">
      <h1 className="text-4xl font-semibold">Client Positions</h1>
      <Button variant="addUser">
        <PlusIcon />
        <span>Add User</span>
      </Button>
      <UserTable columns={columns} data={data} />
    </div>
  );
};

export default accounts;
