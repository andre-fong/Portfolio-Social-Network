"use client";
import { useState } from "react";
import styles from "./styles/EditListings.module.scss";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import type { StockHoldings } from "@/types/Portfolio";

export default function EditListings({
  listings,
}: {
  listings: StockHoldings[];
}) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Button variant="contained" onClick={() => setModalOpen(true)}>
        Edit Listings
      </Button>

      <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
        <DialogTitle sx={{ fontWeight: 600 }}>Edit Stock Listings</DialogTitle>
        <DialogContent>
          <div className={styles.container}>
            <div className={styles.row}>
              <h4 className={styles.header}>Symbol</h4>
              <h4 className={styles.header}>Shares</h4>
            </div>

            <div className={styles.table}>
              <div className={styles.symbols}>
                {listings.map((listing) => (
                  <p key={listing.symbol}>{listing.symbol}</p>
                ))}
              </div>
              <div className={styles.shares}>
                {listings.map((listing) => (
                  <div className={styles.input} key={listing.symbol}>
                    <TextField
                      defaultValue={listing.shares}
                      type="number"
                      variant="outlined"
                      size="small"
                      title={`Shares of ${listing.symbol}`}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Button variant="contained" style={{ marginTop: "10px" }}>
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
