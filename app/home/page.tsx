import Link from "next/link";
import Image from "next/image";
import styles from "./home.module.scss";
import Button from "@mui/material/Button";
import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";

export default function Home() {
  const yourUsername = "mandre";
  const portfolioNames = ["Tech", "Healthcare", "Energy"];
  const stockListNames = [
    { name: "Farmers", isPublic: true },
    { name: "Tech", isPublic: false },
    { name: "Retail", isPublic: true },
  ];
  const sharedStockListNames = [
    { name: "Auto", owner: "zanesun", isPublic: false },
    { name: "Retail", owner: "zobiebuttz", isPublic: true },
    { name: "Finance", owner: "victo", isPublic: false },
  ];

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Welcome, mandre.</h1>

      <div className={styles.section}>
        <div className={styles.row}>
          <h2 className={styles.section_title} id="portfolios">
            Your Portfolios
          </h2>
          <Button
            variant="contained"
            href="/new/portfolio"
            title="New portfolio"
          >
            + New
          </Button>
        </div>

        <div className={styles.list}>
          {portfolioNames.map((name) => (
            <Link href={`/portfolios/${name}`} key={name}>
              <div className={styles.portfolio_card}>
                <Image
                  src="/portfolio-asset.png"
                  width={100}
                  height={70}
                  alt="Portfolio asset"
                />
                <h3 className={styles.portfolio_name}>{name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.row}>
          <h2 className={styles.section_title} id="stocklists">
            Your Stock Lists
          </h2>
          <Button
            variant="contained"
            href="/new/stock-list"
            title="New stock list"
          >
            + New List
          </Button>
        </div>

        <div className={styles.stocklist_list}>
          {stockListNames.map((stockList) => (
            <Link
              href={`/stocklists/${yourUsername}/${stockList.name}`}
              key={stockList.name}
            >
              <div className={styles.stocklist_card}>
                <Image
                  src="/stocklist-asset.png"
                  width={85}
                  height={80}
                  alt="Stock list asset"
                />
                <div className={styles.stocklist_info}>
                  {stockList.isPublic && <PublicRoundedIcon fontSize="small" />}
                  <h3 className={styles.stocklist_name}>{stockList.name}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.section_title} id="stocklists_shared">
          Stock Lists Shared With You
        </h2>

        <div className={styles.stocklist_list}>
          {sharedStockListNames.map((stockList) => (
            <Link
              href={`/stocklists/${stockList.owner}/${stockList.name}`}
              key={stockList.name}
            >
              <div className={styles.stocklist_card}>
                <div className={styles.stocklist_asset}>
                  <Image
                    src="/stocklist-asset.png"
                    width={85}
                    height={80}
                    alt="Stock list asset"
                  />
                  <div className={styles.profile_icon}>
                    <AccountCircleRoundedIcon fontSize="large" />
                  </div>
                </div>
                <div className={styles.stocklist_info}>
                  {stockList.isPublic && <PublicRoundedIcon fontSize="small" />}
                  <h3 className={styles.stocklist_name}>{stockList.name}</h3>
                </div>

                <h4 className={styles.stocklist_author}>({stockList.owner})</h4>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
