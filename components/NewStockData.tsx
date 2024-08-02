"use client";
import styles from "./styles/NewStockData.module.scss";
import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import CheckBox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function NewStockData() {
  const [modalOpen, setModalOpen] = useState(false);
  const [newStockChecked, setNewStockChecked] = useState(false);

  return (
    <>
      <Button variant="contained" onClick={() => setModalOpen(true)}>
        + New Data
      </Button>

      <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
        <DialogTitle
          sx={{
            fontWeight: 600,
          }}
        >
          New Stock Data
        </DialogTitle>
        <DialogContent>
          <div className={styles.container}>
            <TextField
              fullWidth
              label="Symbol"
              variant="outlined"
              margin="dense"
              autoComplete="off"
            />

            {/* Checkbox that says this is a new stock */}
            <FormControlLabel
              control={
                <CheckBox
                  checked={newStockChecked}
                  onChange={(e) => {
                    setNewStockChecked(e.target.checked);
                  }}
                />
              }
              label="New Stock"
              sx={{ marginBottom: "8px" }}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date"
                sx={{ marginTop: "8px", marginBottom: "4px", width: "100%" }}
              />
            </LocalizationProvider>
            <TextField
              fullWidth
              label="Open"
              variant="outlined"
              margin="dense"
              autoComplete="off"
            />
            <TextField
              fullWidth
              label="High"
              variant="outlined"
              margin="dense"
              autoComplete="off"
            />
            <TextField
              fullWidth
              label="Low"
              variant="outlined"
              margin="dense"
              autoComplete="off"
            />
            <TextField
              fullWidth
              label="Close"
              variant="outlined"
              margin="dense"
              autoComplete="off"
            />
            <TextField
              fullWidth
              label="Volume"
              variant="outlined"
              margin="dense"
              autoComplete="off"
            />
            <Button variant="contained" sx={{ marginTop: "25px" }}>
              Add Data
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
