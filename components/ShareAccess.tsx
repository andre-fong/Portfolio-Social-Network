"use client";
import { useState } from "react";
import styles from "./styles/ShareAccess.module.scss";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import CheckBox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

export default function ShareAccess() {
  const [shareModalOpen, setShareModalOpen] = useState(false);
  // TODO: set to true if stock list is public
  const [publicChecked, setPublicChecked] = useState(false);

  const isOwner = true;
  const sharedWith = ["zanesun", "victo", "zobiebuttz"];

  return (
    <>
      <Button
        endIcon={<PeopleAltRoundedIcon />}
        onClick={() => setShareModalOpen(true)}
        variant="contained"
        sx={{ marginBottom: "30px" }}
      >
        Share
      </Button>

      <Dialog open={shareModalOpen} onClose={() => setShareModalOpen(false)}>
        <DialogTitle sx={{ fontWeight: 600 }}>
          Share Stock List Access
        </DialogTitle>
        <DialogContent>
          <div className={styles.container}>
            <TextField
              label="Share with"
              variant="outlined"
              placeholder="Enter a username"
              fullWidth
            />

            <div className={styles.full_row}>
              <Button variant="contained">Share</Button>
            </div>

            <FormControlLabel
              control={
                <CheckBox
                  checked={publicChecked}
                  onChange={() => setPublicChecked((oldChecked) => !oldChecked)}
                />
              }
              label="Make Public"
            />

            <h3 className={styles.shared_with}>Shared With</h3>

            {sharedWith.map((username) => (
              <div className={styles.shared_with_user} key={username}>
                <div className={styles.user_info}>
                  <AccountCircleRoundedIcon />
                  <p>{username}</p>
                </div>

                <IconButton title={`Remove access from ${username}`}>
                  <CloseRoundedIcon />
                </IconButton>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
