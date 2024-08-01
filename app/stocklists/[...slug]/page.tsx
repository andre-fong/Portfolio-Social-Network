import { notFound } from "next/navigation";
import styles from "./stocklist.module.scss";
import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import HoldingsTable from "@/components/HoldingsTable";
import StockMatrix from "@/components/StockMatrix";
import Reviews from "@/components/Reviews";
import ShareAccess from "@/components/ShareAccess";
import EditListings from "@/components/EditListings";
import type { StockHoldings } from "@/types/Portfolio";

export default function StockList({ params }: { params: { slug: string[] } }) {
  const owner = params.slug[0];
  const listName = params.slug[1];

  if (!owner || !listName) notFound();

  const portfolioValue = 200;
  const listings: StockHoldings[] = [
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
      change: 0.5,
      totalChange: 150,
    },
  ];
  const isOwner = true;
  const isPublic = true;

  return (
    <main className={styles.container}>
      <div className={styles.top_row}>
        <div className={styles.row}>
          <div className={styles.title_container}>
            <h1 className={styles.title}>{listName}</h1>
            {isPublic && (
              <PublicRoundedIcon fontSize="large" sx={{ color: "gray" }} />
            )}
          </div>
        </div>

        {isOwner && <ShareAccess />}
      </div>

      <div className={styles.owner_row}>
        <AccountCircleRoundedIcon />
        <p className={styles.owner}>{owner}</p>
      </div>

      <div className={styles.top_row} style={{ marginBottom: "20px" }}>
        <h2 className={styles.section_title} style={{ marginBottom: 0 }}>
          Listings
        </h2>

        <EditListings listings={listings} />
      </div>

      <HoldingsTable holdings={listings} />

      <div className={styles.row} />

      <StockMatrix />

      <Reviews />
    </main>
  );
}
