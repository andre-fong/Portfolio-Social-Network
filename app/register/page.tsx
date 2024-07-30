"use client";
import Card from "@mui/material/Card";
import styles from "./register.module.scss";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import Link from "next/link";

function handleRegister(e: any) {
  e.preventDefault();
  const username = e.target.username.value;
  const password = e.target.password.value;

  // TODO: Send login request
}

export default function Register() {
  const isLoggedIn = false;

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
        <h1 className={styles.title}>Register</h1>

        <form className={styles.form} onSubmit={handleRegister}>
          <TextField id="username" label="Username" variant="outlined" />
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            type="password"
            sx={{ marginBottom: "20px" }}
          />

          <Button variant="contained" type="submit">
            Submit
          </Button>
        </form>

        <Link className={styles.link} href="/login">
          Log in here
        </Link>
      </Card>
    </main>
  );
}
