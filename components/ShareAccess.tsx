"use client";
import { useEffect, useState } from "react";
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

export default function ShareAccess({
  owner,
  listName,
  isPublic,
}: {
  owner: string;
  listName: string;
  isPublic: boolean;
}) {
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [publicChecked, setPublicChecked] = useState(isPublic);
  const [sharedWith, setSharedWith] = useState<{ username: string }[]>([]);

  useEffect(() => {
    fetch(`/api/shared-with?owner=${owner}&name=${listName}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setSharedWith(data);
        });
      }
    });
  }, []);

  function togglePublicity() {
    fetch(`/api/shared-with`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isPublic: !isPublic,
        owner,
        name: listName,
      }),
    }).then(() => {
      location.reload();
    });
  }

  function addSharedWith() {
    const newShare = document.getElementById("new-share") as HTMLInputElement;
    fetch(`/api/shared-with`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        owner,
        name: listName,
        shareUsername: newShare.value,
      }),
    }).then(() => {
      location.reload();
    });
  }

  function removeSharedWith(username: string) {
    fetch(`/api/shared-with`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        owner,
        name: listName,
        shareUsername: username,
      }),
    }).then(() => {
      location.reload();
    });
  }

  return (
    <>
      <Button
        endIcon={<PeopleAltRoundedIcon />}
        onClick={() => setShareModalOpen(true)}
        variant="contained"
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
              id="new-share"
            />

            <div className={styles.full_row}>
              <Button variant="contained" onClick={addSharedWith}>
                Share
              </Button>
            </div>

            <FormControlLabel
              control={
                <CheckBox
                  checked={publicChecked}
                  onChange={() => {
                    setPublicChecked((oldChecked) => !oldChecked);
                    togglePublicity();
                  }}
                />
              }
              label="Make Public"
            />

            <h3 className={styles.shared_with}>Shared With</h3>

            {sharedWith.map((sharedWith) => (
              <div
                className={styles.shared_with_user}
                key={sharedWith.username}
              >
                <div className={styles.user_info}>
                  <AccountCircleRoundedIcon />
                  <p>{sharedWith.username}</p>
                </div>

                <IconButton
                  title={`Remove access from ${sharedWith.username}`}
                  onClick={() => removeSharedWith(sharedWith.username)}
                >
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
