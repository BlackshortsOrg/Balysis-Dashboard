"use client";
import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
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
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { squareOffUser } from "@/api/squareOffUsers";
import { toast } from "sonner";

export function ClientPositionsTable({ columns, data, daily, token }) {
  async function squareOffUserToday(user_id) {
    const resp = await squareOffUser(token, otp, user_id, false);
    if (resp.status === 200) {
      toast("Disabled User Successfully!");
    } else {
      toast("Failed to disable user!");
    }
  }
  const [rowSelection, setRowSelection] = React.useState({});
  const [menuOpen, setMenuOpen] = React.useState({});
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [squareoffuser, setSquareoffUser] = React.useState({});
  const [otp, setOTP] = React.useState("");
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
      dailyState: daily,
    },
    meta: {
      menuOpen,
      setMenuOpen,
      setSquareoffUser,
    },
    enableRowSelection: true,
  });

  return (
    <div className="rounded-md border">
      <Dialog
        open={dialogOpen}
        onOpenChange={(o) => {
          console.log("Open now: ", o);
          setDialogOpen(o);
        }}
      >
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead className="text-center" key={header.id}>
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
                  className="text-center"
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
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
        <DialogContent>
          <DialogTitle>
            Enter PIN For Disabling User - {squareoffuser.name}
          </DialogTitle>
          <DialogDescription className="mx-auto">
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
          </DialogDescription>
          <Button
            variant="addUser"
            onClick={() => {
              squareOffUserToday(squareoffuser.id);
            }}
          >
            Confirm
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
