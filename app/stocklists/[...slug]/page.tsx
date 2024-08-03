import { notFound } from "next/navigation";
import styles from "./stocklist.module.scss";
import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import HoldingsTable from "@/components/HoldingsTable";
import StockMatrix from "@/components/StockMatrix";
import Reviews from "@/components/Reviews";
import ShareAccess from "@/components/ShareAccess";
import EditListings from "@/components/EditListings";
import DeleteStockList from "@/components/DeleteStockList";
import { cookies } from "next/headers";
import type { StockHoldings } from "@/types/Portfolio";

export default async function StockList({
  params,
}: {
  params: { slug: string[] };
}) {
  const owner = params.slug[0];
  const listName = params.slug[1];

  if (!owner || !listName) notFound();

  const res = await fetch(
    "http://localhost:3000/api/stocklists/" + owner + "/" + listName,
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
  if (!data) notFound();

  const youRes = await fetch("http://localhost:3000/api/you", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookies().toString(),
    },
    credentials: "include",
    next: {
      revalidate: 0,
    },
  });
  const you = await youRes.json();
  const isOwner = you.username === owner;

  const listings: StockHoldings[] = [
    {
      symbol: "A",
      shares: 5,
      price: 100,
      totalValue: 500,
      change: 0.5,
      totalChange: 50,
    },
    {
      symbol: "AAPL",
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
  // const isOwner = true;
  const isPublic = true;

  return (
    <main className={styles.container}>
      <div className={styles.top_row}>
        <div className={styles.row}>
          <div className={styles.title_container}>
            <h1 className={styles.title}>{listName}</h1>
            {data.isPublic && (
              <PublicRoundedIcon fontSize="large" sx={{ color: "gray" }} />
            )}
          </div>
        </div>

        <div className={styles.actions}>
          {isOwner && (
            <>
              <ShareAccess />
              <DeleteStockList owner={owner} listName={listName} />
            </>
          )}
        </div>
      </div>

      <div className={styles.owner_row}>
        <AccountCircleRoundedIcon />
        <p className={styles.owner}>
          {owner} {isOwner && "(you)"}
        </p>
      </div>

      <div className={styles.top_row} style={{ marginBottom: "20px" }}>
        <h2 className={styles.section_title} style={{ marginBottom: 0 }}>
          Listings
        </h2>

        {isOwner && (
          <EditListings listings={listings} owner={owner} listName={listName} />
        )}
      </div>

      <HoldingsTable holdings={listings} />

      <div className={styles.row} />

      <StockMatrix />

      <Reviews ownerUsername={owner} listName={listName} isOwner={isOwner} />
    </main>
  );
}
