"use client";
import { useState } from "react";
import styles from "./styles/NewTrade.module.scss";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import TextField from "@mui/material/TextField";
import type { LogType, TransactionType, TradeType } from "@/types/Portfolio";

export default function NewTrade() {
  const [modalOpen, setModalOpen] = useState(false);

  const [type, setType] = useState<LogType>("trade");
  const [transactionType, setTransactionType] =
    useState<TransactionType | null>(null);
  const [tradeType, setTradeType] = useState<TradeType | null>(null);

  function handleTypeChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newType = event.target.value as LogType;
    setType(newType);
  }
  function handleTransactionTypeChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const newType = event.target.value as TransactionType;
    setTransactionType(newType);
  }
  function handleTradeTypeChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newType = event.target.value as TradeType;
    setTradeType(newType);
  }

  return (
    <>
      <Button
        variant="contained"
        title="Log a new stock trade"
        onClick={() => setModalOpen(true)}
      >
        + New Trade
      </Button>

      <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
        <DialogTitle sx={{ fontWeight: 600 }}>New Trade Entry</DialogTitle>
        <DialogContent>
          <div className={styles.container}>
            <FormControl>
              <FormLabel>Entry Type</FormLabel>
              <RadioGroup
                defaultValue="trade"
                name="trade-type"
                value={type}
                onChange={handleTypeChange}
              >
                <FormControlLabel
                  value="trade"
                  control={<Radio />}
                  label="Trade (buy, sell stocks)"
                />
                <FormControlLabel
                  value="transaction"
                  control={<Radio />}
                  label="Transaction (deposit, withdraw)"
                />
                <FormControlLabel
                  value="transfer"
                  control={<Radio />}
                  label="Transfer (between portfolio accounts)"
                />
              </RadioGroup>
            </FormControl>

            <h3 className={styles.section_title}>
              {type.charAt(0).toUpperCase() + type.slice(1)}:
            </h3>

            {type === "trade" && (
              <>
                <div style={{ marginBottom: "20px" }}>
                  <TextField label="Symbol" variant="outlined" />
                </div>

                <FormControl>
                  <RadioGroup
                    name="trade-stocks-type"
                    value={tradeType}
                    onChange={handleTradeTypeChange}
                  >
                    <FormControlLabel
                      value="buy"
                      control={<Radio />}
                      label="Buy"
                    />
                    <FormControlLabel
                      value="sell"
                      control={<Radio />}
                      label="Sell"
                    />
                  </RadioGroup>
                </FormControl>

                <div style={{ marginBottom: "30px", marginTop: "20px" }}>
                  <TextField label="Shares" variant="outlined" />
                </div>

                {tradeType !== null && (
                  <>
                    <Button variant="contained">Submit</Button>
                    <p className={styles.footnote}>
                      <span className={styles.note}>Note</span>: This will
                      update your portfolio account balance accordingly.
                    </p>
                  </>
                )}
              </>
            )}

            {type === "transaction" && (
              <>
                <FormControl>
                  <RadioGroup
                    name="transaction-type"
                    value={transactionType}
                    onChange={handleTransactionTypeChange}
                  >
                    <FormControlLabel
                      value="deposit"
                      control={<Radio />}
                      label="Deposit"
                    />
                    <FormControlLabel
                      value="withdraw"
                      control={<Radio />}
                      label="Withdraw"
                    />
                  </RadioGroup>
                </FormControl>

                <div style={{ marginBottom: "30px", marginTop: "20px" }}>
                  <TextField label="Amount ($)" variant="outlined" />
                </div>

                {transactionType !== null && (
                  <>
                    <Button variant="contained">Submit</Button>
                    <p className={styles.footnote}>
                      <span className={styles.note}>Note</span>: This will
                      update your portfolio account balance accordingly.
                    </p>
                  </>
                )}
              </>
            )}

            {type === "transfer" && (
              <>
                <div style={{ marginBottom: "20px", marginTop: "20px" }}>
                  <TextField label="From" variant="outlined" />
                </div>
                <div style={{ marginBottom: "30px", marginTop: "20px" }}>
                  <TextField label="To" variant="outlined" />
                </div>
                <div style={{ marginBottom: "30px", marginTop: "20px" }}>
                  <TextField
                    label="Amount ($)"
                    variant="outlined"
                    autoComplete="off"
                  />
                </div>

                <Button variant="contained">Submit</Button>
                <p className={styles.footnote}>
                  <span className={styles.note}>Note</span>: This will update
                  your portfolio accounts&apos; balances accordingly.
                </p>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
