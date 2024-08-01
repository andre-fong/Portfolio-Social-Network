"use client";
import styles from "./friends.module.scss";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AccountCircleRounded from "@mui/icons-material/AccountCircleRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import DeleteRounded from "@mui/icons-material/DeleteRounded";

export default function Friends() {
  const outgoing = ["User1"];
  const incoming = ["User2"];
  const friends = ["victo", "zobiebuttz", "zanesun"];

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Friends</h1>

      <div className={styles.row}>
        <TextField
          id="username"
          label="Search by username"
          variant="outlined"
          autoComplete="off"
        />
        <Button variant="contained" sx={{ height: "56px" }}>
          Send
        </Button>
      </div>

      <h2 className={styles.section_title}>Pending</h2>
      <div className={styles.section}>
        {incoming.map((username) => (
          <div className={styles.request} key={username}>
            <div className={styles.user}>
              <AccountCircleRounded
                fontSize="large"
                sx={{ fontSize: "3em", color: "gray" }}
              />
              <div className={styles.user_details}>
                <p className={styles.username}>{username}</p>
                <p className={styles.request_type} style={{ fontWeight: 600 }}>
                  Incoming
                </p>
              </div>
            </div>
            <div className={styles.actions}>
              <IconButton title="Accept friend request">
                <CheckRoundedIcon sx={{ color: "green" }} />
              </IconButton>
              <IconButton title="Decline friend request">
                <CloseRoundedIcon sx={{ color: "red" }} />
              </IconButton>
            </div>
          </div>
        ))}

        {outgoing.map((username) => (
          <div className={styles.request} key={username}>
            <div className={styles.user}>
              <AccountCircleRounded
                fontSize="large"
                sx={{ fontSize: "3em", color: "gray" }}
              />
              <div className={styles.user_details}>
                <p className={styles.username}>{username}</p>
                <p className={styles.request_type}>Outgoing</p>
              </div>
            </div>
            <IconButton title="Cancel friend request">
              <CloseRoundedIcon sx={{ color: "red" }} />
            </IconButton>
          </div>
        ))}
      </div>

      <h2 className={styles.section_title}>All Friends</h2>
      <div className={styles.section}>
        {friends.map((username) => (
          <div className={styles.request} key={username}>
            <div className={styles.user}>
              <AccountCircleRounded
                fontSize="large"
                sx={{ fontSize: "3em", color: "darkblue" }}
              />
              <div className={styles.user_details}>
                <p className={styles.username} style={{ fontWeight: 600 }}>
                  {username}
                </p>
              </div>
            </div>
            <IconButton title="Remove friend">
              <DeleteRounded sx={{ color: "darkred" }} />
            </IconButton>
          </div>
        ))}
      </div>
    </main>
  );
}
