import styles from "./newportfolio.module.scss";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function NewPortfolio() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>New Portfolio</h1>

      <div className={styles.input_section}>
        <TextField label="Portfolio Name" variant="outlined" />
      </div>
      <div className={styles.input_section}>
        <TextField label="Balance ($)" variant="outlined" type="number" />
      </div>
      <div className={styles.input_section} style={{ marginTop: "40px" }}>
        <Button variant="contained">Create Portfolio</Button>
      </div>
    </main>
  );
}
