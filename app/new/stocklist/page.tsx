import styles from "./newstocklist.module.scss";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function NewStockList() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>New Stock List</h1>

      <div className={styles.input_section}>
        <TextField label="Stock List Name" variant="outlined" />
      </div>
      <div className={styles.input_section} style={{ marginTop: "40px" }}>
        <Button variant="contained">Create Stock list</Button>
      </div>
    </main>
  );
}
