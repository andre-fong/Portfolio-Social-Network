"use client";
import { useState } from "react";
import styles from "./styles/EditListings.module.scss";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import type { StockHoldings } from "@/types/Portfolio";
import type { Listings } from "@/types/StockList";

export default function EditListings({
  listings,
  owner,
  listName,
}: {
  listings: StockHoldings[];
  owner: string;
  listName: string;
}) {
  const [modalOpen, setModalOpen] = useState(false);

  function editListings() {
    const updatedListings: Listings[] = [];

    listings.forEach(({ symbol }) => {
      const shares = parseInt(
        (document.getElementById(symbol) as HTMLInputElement).value
      );

      updatedListings.push({ symbol, shares });
    });

    const newSymbol = (document.getElementById("new") as HTMLInputElement)
      .value;
    const newShares = parseInt(
      (document.getElementById("new_shares") as HTMLInputElement).value
    );
    if (newSymbol && newShares) {
      updatedListings.push({ symbol: newSymbol, shares: newShares });
    }

    console.log(updatedListings);

    fetch(`/api/stocklists/${owner}/${listName}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ shares: updatedListings }),
    }).then(() => {
      location.reload();
    });
  }

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
                      id={listing.symbol}
                    />
                  </div>
                ))}
              </div>
            </div>
            <TextField
              label="Add Symbol"
              variant="outlined"
              size="small"
              id="new"
              sx={{ marginBottom: "10px" }}
            />

            <TextField
              label="Shares"
              variant="outlined"
              size="small"
              id="new_shares"
            />

            <div>
              <Button
                variant="contained"
                style={{ marginTop: "10px" }}
                onClick={editListings}
              >
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
