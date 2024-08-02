"use client";
import { useEffect, useState } from "react";
import styles from "./friends.module.scss";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AccountCircleRounded from "@mui/icons-material/AccountCircleRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import DeleteRounded from "@mui/icons-material/DeleteRounded";

export default function Friends() {
  const [outgoing, setOutgoing] = useState<string[]>([]);
  const [incoming, setIncoming] = useState<string[]>([]);
  const [friends, setFriends] = useState<string[]>([]);

  useEffect(() => {
    // Fetch outgoing and populate state
    fetch("/api/friends/getPendingFriendsOutgoing", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setOutgoing(data);
        console.log(data);
      });
  }, []);

  useEffect(() => {
    // Fetch incoming and populate state
    fetch("/api/friends/getPendingFriendsIncoming", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setIncoming(data);
        console.log(data);
      });
  }, []);

  useEffect(() => {
    // Fetch outgoing and populate state
    fetch("/api/friends/getActiveFriends", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setFriends(data);
        console.log(data);
      });
  }, []);

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
        <Button
          variant="contained"
          sx={{ height: "56px" }}
          onClick={() => {
            fetch("/api/friends/sendAcceptFriend", {
              method: "POST",
              credentials: "include",
              body: JSON.stringify({
                username: (
                  document.getElementById("username") as HTMLInputElement
                ).value,
              }),
            }).then((res) => location.reload());
          }}
        >
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
              <IconButton
                title="Accept friend request"
                onClick={() =>
                  fetch("/api/friends/sendAcceptFriend", {
                    method: "POST",
                    credentials: "include",
                    body: JSON.stringify({ username }),
                  }).then((res) => location.reload())
                }
              >
                <CheckRoundedIcon sx={{ color: "green" }} />
              </IconButton>
              <IconButton
                title="Decline friend request"
                onClick={() =>
                  fetch("/api/friends/cancelRejectRemoveFriend", {
                    method: "POST",
                    credentials: "include",
                    body: JSON.stringify({ username }),
                  }).then((res) => location.reload())
                }
              >
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
            <IconButton
              title="Cancel friend request"
              onClick={() =>
                fetch("/api/friends/cancelRejectRemoveFriend", {
                  method: "POST",
                  credentials: "include",
                  body: JSON.stringify({ username }),
                }).then((res) => location.reload())
              }
            >
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
            <IconButton
              title="Remove friend"
              onClick={() =>
                fetch("/api/friends/cancelRejectRemoveFriend", {
                  method: "POST",
                  credentials: "include",
                  body: JSON.stringify({ username }),
                }).then((res) => location.reload())
              }
            >
              <DeleteRounded sx={{ color: "darkred" }} />
            </IconButton>
          </div>
        ))}
      </div>
    </main>
  );
}
