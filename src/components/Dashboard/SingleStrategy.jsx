import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const SingleStrategy = ({ strategy }) => {
  console.log(strategy);
  const columns = [
    { header: "Name", accessorKey: "name" },
    { header: "Active", accessorKey: "acount" },
    { header: "Deployed", accessorKey: "scout" },
  ];

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                className="text-xl font-bold"
                key={column.accessorKey}
              >
                {column.header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {strategy.map((row) => (
            <TableRow key={row.id}>
              {columns.map((column) => (
                <TableCell key={column.accessorKey}>
                  {row[column.accessorKey]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SingleStrategy;
