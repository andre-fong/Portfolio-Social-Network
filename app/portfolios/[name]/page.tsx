import styles from "./portfolio.module.scss";
import StockMatrix from "@/components/StockMatrix";
import HoldingsTable from "@/components/HoldingsTable";
import type { StockHoldings } from "@/types/Portfolio";
import NewTrade from "@/components/NewTrade";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";

export default async function Portfolio({
  params,
}: {
  params: { name: string };
}) {
  const res = await fetch(
    "http://localhost:3000/api/portfolios/" + params.name,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies().toString(),
      },
      credentials: "include",
      next: {
        revalidate: 0,
      },
    }
  );
  if (!res.ok) return notFound();
  const data = (await res.json())[0];

  const estimatedRes = await fetch(
    "http://localhost:3000/api/portfolios/" + params.name + "/estimatedValue",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies().toString(),
      },
      credentials: "include",
      next: {
        revalidate: 0,
      },
    }
  );
  const estimatedData = (await estimatedRes.json())[0];

  const holdingsRes = await fetch(
    "http://localhost:3000/api/portfolios/" +
      params.name +
      "/getPortfolioHoldings",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies().toString(),
      },
      credentials: "include",
      next: {
        revalidate: 0,
      },
    }
  );
  const holdingsData = (await holdingsRes.json()) as StockHoldings[];

  const balance = 314;

  const stocksQuery =
    "?stocks=" + holdingsData.map((stock) => stock.symbol).join("&stocks=");

  const correlationMatrixRes = await fetch(
    "http://localhost:3000/api/statistics/getCorrelationMatrix" + stocksQuery,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies().toString(),
      },
      credentials: "include",
      next: {
        revalidate: 0,
      },
    }
  );
  const correlationMatrixData = await correlationMatrixRes.json();

  const covarianceMatrixRes = await fetch(
    "http://localhost:3000/api/statistics/getCovarianceMatrix" + stocksQuery,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies().toString(),
      },
      credentials: "include",
      next: {
        revalidate: 0,
      },
    }
  );
  const covarianceMatrixData = await covarianceMatrixRes.json();

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>{data.name}</h1>

      <div className={styles.value_row}>
        <h2 className={styles.section_title}>Current portfolio value</h2>
        <p className={styles.helper_text}>(est. value)</p>
      </div>

      <h2 className={styles.value}>
        {estimatedData.totalValue?.toFixed(2) || "0.00"}
      </h2>

      <div className={styles.row}>
        <h2 className={styles.section_title}>Holdings</h2>

        <NewTrade name={params.name} />
      </div>

      <HoldingsTable holdings={holdingsData} />

      <div className={styles.row}>
        <h2 className={styles.section_title}>Cash Account</h2>
      </div>
      <h3 className={styles.balance}>
        Balance:{" "}
        <span className={styles.money}>${data.balance?.toFixed(2)}</span>
      </h3>

      <StockMatrix
        symbols={holdingsData.map((holding) => holding.symbol)}
        correlationData={correlationMatrixData}
        covarianceData={covarianceMatrixData}
      />
    </main>
  );
}
