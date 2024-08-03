import styles from "./stocks.module.scss";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import NewStockData from "@/components/NewStockData";
import type { Stock } from "@/types/Stocks";

export default async function Stocks() {
  const stockRes = await fetch(
    "http://localhost:3000/api/stock/getAllStocksRecentData",
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      next: {
        revalidate: 0,
      },
    }
  );
  const stockData: Stock[] = await stockRes.json();

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
            {stockData.map((stock) => (
              <TableRow key={stock.tickerSymbol}>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{
                    color: "darkblue",
                    fontWeight: "600",
                  }}
                  align="left"
                >
                  {stock.tickerSymbol}
                </TableCell>
                <TableCell align="right">
                  {/* format to date string mm/dd/yyyy */}
                  {new Date(stock.timestamp).toLocaleDateString("en-US")}
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
