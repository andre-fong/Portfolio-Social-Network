"use client";
import styles from "./styles/Holdings.module.scss";
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import CheckBox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { LineChart } from "@mui/x-charts/LineChart";
import type {
  StockHoldings,
  DateRange,
  StockDetails,
  StockDaysData,
} from "@/types/Portfolio";

export default function HoldingsTable({
  holdings,
}: {
  holdings: StockHoldings[];
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [openStock, setOpenStock] = useState<string | null>(null);
  const [timeframe, setTimeframe] = useState<DateRange>("1W");
  const [futureChecked, setFutureChecked] = useState(false);

  // Reset timeframe once stock details modal is closed
  useEffect(() => {
    if (!modalOpen) {
      setTimeframe("1W");
    }
  }, [modalOpen]);

  function handleOpenStockDetails(openStock: string) {
    setOpenStock(openStock);
    setModalOpen(true);
  }

  function handleTimeframeChange(
    event: React.MouseEvent<HTMLElement>,
    value: DateRange
  ) {
    setTimeframe((oldVal) => (!!value ? value : oldVal));
  }

  const stockDetails: StockDetails = {
    symbol: "AAPL",
    price: 34.25,
    change: 0.32,
    changePercent: 0.94,
    open: 34.25,
    high: 35.8,
    low: 32.79,
    volume: 1000,
  };

  const stockHistory: StockDaysData[] = [
    {
      date: new Date("2021-10-01"),
      close: 34.25,
    },
    {
      date: new Date("2021-10-02"),
      close: 35.8,
    },
    {
      date: new Date("2021-10-03"),
      close: 32.79,
    },
    {
      date: new Date("2021-10-04"),
      close: 33.25,
    },
    {
      date: new Date("2021-10-05"),
      close: 34.25,
    },
    {
      date: new Date("2021-10-06"),
      close: 35.8,
    },
    {
      date: new Date("2021-10-07"),
      close: 32.79,
    },
    {
      date: new Date("2021-10-08"),
      close: 33.25,
    },
    {
      date: new Date("2021-10-09"),
      close: 34.25,
    },
    {
      date: new Date("2021-10-10"),
      close: 35.8,
    },
    {
      date: new Date("2021-10-11"),
      close: 32.79,
    },
    {
      date: new Date("2021-10-12"),
      close: 33.25,
    },
  ];

  return (
    <>
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
                  sx={{
                    fontWeight: "500",
                  }}
                  align="left"
                >
                  <Button
                    fullWidth
                    sx={{
                      marginLeft: "-10px",
                      fontWeight: 600,
                      color: holding.change >= 0 ? "green" : "red",
                    }}
                    onClick={() => handleOpenStockDetails(holding.symbol)}
                  >
                    {holding.symbol}
                  </Button>
                </TableCell>
                <TableCell align="center">{holding.shares}</TableCell>
                <TableCell align="right">{holding.price.toFixed(2)}</TableCell>
                <TableCell align="right">
                  {holding.totalValue.toFixed(2)}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    color: holding.change >= 0 ? "green" : "red",
                  }}
                >
                  {holding.change.toFixed(2)}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    color: holding.totalChange >= 0 ? "green" : "red",
                  }}
                >
                  {holding.totalChange.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        maxWidth="lg"
      >
        <DialogTitle
          sx={{
            fontWeight: 600,
          }}
        >
          Stock Details
        </DialogTitle>
        <DialogContent>
          <div className={styles.container}>
            <h2 className={styles.symbol}>{openStock}</h2>
            <h3
              className={styles.price}
              style={{ color: stockDetails.change >= 0 ? "green" : "red" }}
            >
              {stockDetails.price.toFixed(2)}
            </h3>
            <p
              className={styles.change}
              style={{
                color: stockDetails.change >= 0 ? "darkgreen" : "darkred",
              }}
            >
              {stockDetails.change >= 0 ? "+" : "-"}
              {stockDetails.change.toFixed(2)} (
              {stockDetails.changePercent.toFixed(2)}%)
            </p>

            <ToggleButtonGroup
              value={timeframe}
              exclusive
              onChange={handleTimeframeChange}
              color="primary"
            >
              <ToggleButton value="1W">1W</ToggleButton>
              <ToggleButton value="1M">1M</ToggleButton>
              <ToggleButton value="3M">3M</ToggleButton>
              <ToggleButton value="6M">1Y</ToggleButton>
              <ToggleButton value="1Y">5Y</ToggleButton>
            </ToggleButtonGroup>

            <LineChart
              xAxis={[
                {
                  scaleType: "time",
                  data: stockHistory.map((day) => day.date),
                  valueFormatter: (value) =>
                    new Date(value).toLocaleDateString("en-US"),
                  label: "Date",
                },
              ]}
              yAxis={[{ label: "Close Price ($)" }]}
              series={[
                {
                  curve: "linear",
                  data: stockHistory.map((day) => day.close),
                  valueFormatter: (value) => `$${value?.toFixed(2)}`,
                  color: "green",
                },
              ]}
              width={500}
              height={300}
            />

            <FormControlLabel
              control={
                <CheckBox
                  checked={futureChecked}
                  onChange={() => setFutureChecked((oldChecked) => !oldChecked)}
                />
              }
              sx={{ marginBottom: "20px" }}
              label="Show Future Prediction"
            />

            <div className={styles.details}>
              <div className={styles.details_list}>
                <div className={styles.detail}>
                  <p style={{ fontWeight: 500 }}>Open</p>
                  <p>{stockDetails.open.toFixed(2)}</p>
                </div>
                <div className={styles.detail}>
                  <p style={{ fontWeight: 500 }}>High</p>
                  <p>{stockDetails.high.toFixed(2)}</p>
                </div>
                <div className={styles.detail}>
                  <p style={{ fontWeight: 500 }}>Low</p>
                  <p>{stockDetails.low.toFixed(2)}</p>
                </div>
                <div className={styles.detail}>
                  <p style={{ fontWeight: 500 }}>Close</p>
                  <p>{stockDetails.price.toFixed(2)}</p>
                </div>
                <div className={styles.detail}>
                  <p style={{ fontWeight: 500 }}>Volume</p>
                  <p>{stockDetails.volume}</p>
                </div>
              </div>

              <div className={styles.details_list}>
                <div className={styles.detail}>
                  <p style={{ fontWeight: 500 }}>COV</p>
                  <p>0.43</p>
                </div>
                <div className={styles.detail}>
                  <p style={{ fontWeight: 500 }}>Beta</p>
                  <p>1.02</p>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
