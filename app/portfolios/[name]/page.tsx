import styles from "./portfolio.module.scss";
import StockMatrix from "@/components/StockMatrix";
import HoldingsTable from "@/components/HoldingsTable";
import type { StockHoldings } from "@/types/Portfolio";
import NewTrade from "@/components/NewTrade";

export default async function Portfolio({
  params,
}: {
  params: { name: string };
}) {
  const res = await fetch(
    "http://localhost:3000/api/portfolio/" + params.name,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      next: {
        revalidate: 0,
      },
    }
  );
  const data = await res.json();

  const portfolioValue = 220;
  const holdings: StockHoldings[] = [
    {
      symbol: "AAPL",
      shares: 5,
      price: 100,
      totalValue: 500,
      change: 0.5,
      totalChange: 50,
    },
    {
      symbol: "TSLA",
      shares: 5,
      price: 200,
      totalValue: 1000,
      change: 0.5,
      totalChange: 100,
    },
    {
      symbol: "AMZN",
      shares: 5,
      price: 300,
      totalValue: 1500,
      change: -0.5,
      totalChange: -150,
    },
  ];
  const balance = 314;

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>{data.login}</h1>

      <div className={styles.value_row}>
        <h2 className={styles.section_title}>Current portfolio value</h2>
        <p className={styles.helper_text}>(est. value)</p>
      </div>

      <h2 className={styles.value}>{balance.toFixed(2)}</h2>

      <div className={styles.row}>
        <h2 className={styles.section_title}>Holdings</h2>

        <NewTrade />
      </div>

      <HoldingsTable holdings={holdings} />

      <div className={styles.row}>
        <h2 className={styles.section_title}>Cash Account</h2>
      </div>
      <h3 className={styles.balance}>
        Balance: <span className={styles.money}>${balance.toFixed(2)}</span>
      </h3>

      <StockMatrix />
    </main>
  );
}
