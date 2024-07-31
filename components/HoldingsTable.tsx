"use client";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import type { StockHoldings } from "@/types/Portfolio";

export default function HoldingsTable({
  holdings,
}: {
  holdings: StockHoldings[];
}) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="stock holdings table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 600 }}>Symbol</TableCell>
            <TableCell align="right" sx={{ fontWeight: 600 }}>
              Shares
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: 600 }}>
              Price
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: 600 }}>
              Total Value
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: 600 }}>
              Change
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: 600 }}>
              Total Change
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {holdings.map((holding) => (
            <TableRow key={holding.symbol}>
              <TableCell
                component="th"
                scope="row"
                sx={{ textDecoration: "underline", color: "blue" }}
              >
                {holding.symbol}
              </TableCell>
              <TableCell align="right">{holding.shares}</TableCell>
              <TableCell align="right">{holding.price}</TableCell>
              <TableCell align="right">{holding.totalValue}</TableCell>
              <TableCell align="right">{holding.change}</TableCell>
              <TableCell align="right">{holding.totalChange}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
