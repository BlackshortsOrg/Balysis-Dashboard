"use client";
import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { subscribeStrategyAPI } from "@/api/subscribeStrategy";
import { toast } from "sonner";
import { squareOffStrategyForUserAPI } from "@/api/squareOffStrategyForUser";

export function AlgoTradeTable({
  columns,
  data,
  event,
  setEvent,
  token,
  strategy_id,
  strategy_name,
  multiplierChanges,
}) {
  const [multiplier, setMultiplier] = React.useState(0);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [otp, setOTP] = React.useState("");
  const [newMultiplier, setNewMultiplier] = React.useState(1);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      multiplier,
    },
  });
  async function subscribeNewUser() {
    const res = await subscribeStrategyAPI(
      token,
      [event.id],
      strategy_id,
      [newMultiplier],
      strategy_name,
      otp,
    );
    if (res.status !== 200) {
      toast.error("Failed to subscribe user");
      setDialogOpen(false);
    } else {
      toast.success("User Subscribed Successfully");
      setDialogOpen(false);
    }
  }
  async function squareOffUserToday() {
    const resp = await squareOffStrategyForUserAPI(
      token,
      event.id,
      strategy_id,
      false,
      otp,
    );
    if (resp.status === 200) {
      toast.success("Disabled User Successfully!");
    } else {
      toast.error("Failed to disable user!");
    }
    setDialogOpen(false);
  }
  async function shutdownUser() {
    const resp = await squareOffStrategyForUserAPI(
      token,
      event.id,
      strategy_id,
      true,
      otp,
    );
    if (resp.status === 200) {
      toast.success("Disabled User Successfully!");
    } else {
      toast.error("Failed to disable user!");
    }
    setDialogOpen(false);
  }
  async function updateSubscription() {
    let users = [];
    let newMults = [];
    for (const [k, v] of Object.entries(multiplierChanges)) {
      users.push(k);
      newMults.push(v);
    }
    const res = await subscribeStrategyAPI(
      token,
      users,
      strategy_id,
      newMults,
      strategy_name,
      otp,
    );
    if (res.status !== 200) {
      toast.error("Failed to subscribe users");
      setDialogOpen(false);
    } else {
      toast.success("Users Subscribed Successfully");
      setDialogOpen(false);
    }
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <div className="h-full w-full gap-5 flex flex-col">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    // data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex justify-end">
          <DialogTrigger asChild>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md w-36 "
              onClick={(e) => setEvent({ event: "Update" })}
            >
              Save
            </button>
          </DialogTrigger>
        </div>
      </div>
      {event.event == "Squareoff" && (
        <DialogContent>
          <DialogHeader>
            Squareoff Strategy for User - {event.name}
          </DialogHeader>
          <div className="flex gap-4">
            <p>Enter PIN- </p>
            <InputOTP maxLength={6} value={otp} onChange={setOTP}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <Button variant="addUser" onClick={squareOffUserToday}>
            Confirm
          </Button>
        </DialogContent>
      )}
      {event.event == "Shutdown" && (
        <DialogContent>
          <DialogHeader>Shutdown Strategy for User - {event.name}</DialogHeader>
          <div className="flex gap-4">
            <p>Enter PIN- </p>
            <InputOTP maxLength={6} value={otp} onChange={setOTP}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <Button variant="addUser" onClick={shutdownUser}>
            Confirm
          </Button>
        </DialogContent>
      )}
      {event.event == "Subscribe" && (
        <DialogContent>
          <DialogHeader>
            Subscribe Strategy for User - {event.name}
          </DialogHeader>
          <div className="">
            <Label>Multiplier</Label>
            <Input
              type="number"
              value={newMultiplier}
              onChange={(e) => setNewMultiplier(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <p>Enter PIN - </p>
            <InputOTP maxLength={6} value={otp} onChange={setOTP}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <Button variant="addUser" onClick={subscribeNewUser}>
            Confirm
          </Button>
        </DialogContent>
      )}
      {event.event == "Update" && (
        <DialogContent>
          <DialogHeader>Update Subscriptions</DialogHeader>
          <div className="flex gap-4">
            <p>Enter PIN - </p>
            <InputOTP maxLength={6} value={otp} onChange={setOTP}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <Button variant="addUser" onClick={updateSubscription}>
            Confirm
          </Button>
        </DialogContent>
      )}
    </Dialog>
  );
}
