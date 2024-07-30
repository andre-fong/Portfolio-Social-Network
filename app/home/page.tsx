import Link from "next/link";
import styles from "./home.module.scss";
import Button from "@mui/material/Button";

export default function Home() {
  const portfolioNames = ["Tech", "Healthcare", "Energy"];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Dashboard</h1>

      <div className={styles.section}>
        <div className={styles.row}>
          <h2 className={styles.section_title}>Your Portfolios</h2>
          <Button variant="contained" href="/new/portfolio">
            + New
          </Button>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.row}>
          <h2 className={styles.section_title}>Your Stock Lists</h2>
          <Button variant="contained" href="/new/stock-list">
            + New
          </Button>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.section_title}>Stock Lists Shared With You</h2>
      </div>
    </div>
  );
}
