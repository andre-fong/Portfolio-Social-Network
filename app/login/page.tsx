"use client";
import Card from "@mui/material/Card";
import styles from "./login.module.scss";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import Link from "next/link";

async function handleLogin(e: any) {
  e.preventDefault();
  const username = e.target.username.value;
  const password = e.target.password.value;

  const uid = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ username: username, password: password }),
  }).catch((err) => {
    console.log(err);
    alert(err);
  });
  console.log("signed into account with uid", uid);

  // TODO: Send login request
}

export default function Login() {
  const isLoggedIn = false;
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className={styles.content}>
      <Card
        sx={{
          padding: "40px 60px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          background: "rgba(255, 255, 255, 0.9)",
          borderRadius: "20px",
        }}
      >
        <h1 className={styles.title}>Log in</h1>

        <form className={styles.form} onSubmit={handleLogin}>
          <TextField id="username" label="Username" variant="outlined" />
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            type="password"
            sx={{ marginBottom: "20px" }}
          />

          <Button variant="contained" type="submit">
            Log in
          </Button>
        </form>

        <Link className={styles.link} href="/register">
          Register here
        </Link>
      </Card>
    </main>
  );
}
