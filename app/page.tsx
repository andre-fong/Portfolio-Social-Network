import styles from "./page.module.scss";
import Button from "@mui/material/Button";

export default function Home() {
  return (
    <main className={styles.bg}>
      <h1 className={styles.title}>Stocks Social Network</h1>
      <h2 className={styles.subtitle}>CSCC43 Project</h2>
      <p className={styles.authors}>
        Created by{" "}
        <a href="https://github.com/andre-fong" target="_blank">
          Andre
        </a>{" "}
        &{" "}
        <a href="https://github.com/MatthewSnelgrove" target="_blank">
          Matthew
        </a>
      </p>

      <Button variant="contained" href="/login">
        Login
      </Button>
    </main>
  );
}
