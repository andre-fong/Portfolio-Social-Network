"use client";
import styles from "./newportfolio.module.scss";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";

export default function NewPortfolio() {
  const router = useRouter();

  function handleCreatePortfolio() {
    const name = document.getElementById("name") as HTMLInputElement;
    const balance = document.getElementById("balance") as HTMLInputElement;
    fetch("/api/portfolios", {
      method: "POST",
      body: JSON.stringify({ name: name.value, balance: balance.value }),
    }).then((res) => {
      if (res.ok) {
        router.push("/portfolios/" + name.value);
      }
    });
  }

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>New Portfolio</h1>

      <div className={styles.input_section}>
        <TextField label="Portfolio Name" variant="outlined" id="name" />
      </div>
      <div className={styles.input_section}>
        <TextField
          label="Balance ($)"
          variant="outlined"
          type="number"
          id="balance"
        />
      </div>
      <div className={styles.input_section} style={{ marginTop: "40px" }}>
        <Button variant="contained" onClick={handleCreatePortfolio}>
          Create Portfolio
        </Button>
      </div>
    </main>
  );
}
