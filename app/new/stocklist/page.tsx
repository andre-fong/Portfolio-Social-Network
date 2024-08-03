"use client";
import { useState, useEffect } from "react";
import styles from "./newstocklist.module.scss";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";

export default function NewStockList() {
  const router = useRouter();
  const [yourName, setYourName] = useState("");

  useEffect(() => {
    fetch("/api/you", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setYourName(data.username);
      });
  }, []);

  function handleCreateStockList() {
    const name = document.getElementById("name") as HTMLInputElement;
    fetch("/api/stocklists", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ name: name.value }),
    }).then((res) => {
      if (res.ok) {
        router.push("/stocklists/" + yourName + "/" + name.value);
      }
    });
  }

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>New Stock List</h1>

      <div className={styles.input_section}>
        <TextField label="Stock List Name" variant="outlined" id="name" />
      </div>
      <div className={styles.input_section} style={{ marginTop: "40px" }}>
        <Button variant="contained" onClick={handleCreateStockList}>
          Create Stock list
        </Button>
      </div>
    </main>
  );
}
