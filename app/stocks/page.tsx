import styles from "./stocks.module.scss";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Dialog from "@mui/material/Dialog";
import NewStockData from "@/components/NewStockData";
import type { Stock } from "@/types/Stocks";

export default function Stocks() {
  const stocks: Stock[] = [
    {
      symbol: "AAPL",
      recentDate: new Date("2021-10-01"),
      open: 34.25,
      high: 34.25,
      low: 34.25,
      close: 34.25,
      volume: 1000,
    },
    {
      symbol: "TSLA",
      recentDate: new Date("2021-10-01"),
      open: 34.25,
      high: 34.25,
      low: 34.25,
      close: 34.25,
      volume: 1000,
    },
    {
      symbol: "AMZN",
      recentDate: new Date("2021-10-01"),
      open: 34.25,
      high: 34.25,
      low: 34.25,
      close: 34.25,
      volume: 1000,
    },
    {
      symbol: "GOOGL",
      recentDate: new Date("2021-10-01"),
      open: 34.25,
      high: 34.25,
      low: 34.25,
      close: 34.25,
      volume: 1000,
    },
    {
      symbol: "MSFT",
      recentDate: new Date("2021-10-01"),
      open: 34.25,
      high: 34.25,
      low: 34.25,
      close: 34.25,
      volume: 1000,
    },
  ];

  return (
    <main className={styles.container}>
      <div className={styles.row}>
        <h1 className={styles.title}>All Stocks</h1>

        <NewStockData />
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="stock holdings table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Symbol</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>
                Recent Date
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>
                Open
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>
                High
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>
                Low
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>
                Close
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>
                Volume
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {stocks.map((stock) => (
              <TableRow key={stock.symbol}>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{
                    color: "darkblue",
                    fontWeight: "600",
                  }}
                  align="left"
                >
                  {stock.symbol}
                </TableCell>
                <TableCell align="right">
                  {/* format to date string mm/dd/yyyy */}
                  {stock.recentDate.toLocaleDateString("en-US")}
                </TableCell>
                <TableCell align="right">{stock.open.toFixed(2)}</TableCell>
                <TableCell align="right">{stock.high.toFixed(2)}</TableCell>
                <TableCell align="right">{stock.low.toFixed(2)}</TableCell>
                <TableCell align="right">{stock.close.toFixed(2)}</TableCell>
                <TableCell align="right">{stock.volume}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </main>
  );
}
