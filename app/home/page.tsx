import Link from "next/link";
import Image from "next/image";
import styles from "./home.module.scss";
import Button from "@mui/material/Button";
import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { cookies } from "next/headers";

export default async function Home() {
  const portfolioRes = await fetch(
    "http://localhost:3000/api/dashboard/portfolios",
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
  const portfolioData = await portfolioRes.json();

  const stockListRes = await fetch(
    "http://localhost:3000/api/dashboard/stocklists",
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
  const stockListData = await stockListRes.json();

  const sharedStockListRes = await fetch(
    "http://localhost:3000/api/dashboard/shared-stocklists",
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
  const sharedStockListData = await sharedStockListRes.json();

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
  const youData = await youRes.json();

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Welcome, {youData.username}.</h1>

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
          {portfolioData.map(({ name }: { name: string }) => (
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
            href="/new/stocklist"
            title="New stock list"
          >
            + New List
          </Button>
        </div>

        <div className={styles.stocklist_list}>
          {stockListData.map(
            ({ name, isPublic }: { name: string; isPublic: boolean }) => (
              <Link href={`/stocklists/${youData.username}/${name}`} key={name}>
                <div className={styles.stocklist_card}>
                  <Image
                    src="/stocklist-asset.png"
                    width={85}
                    height={80}
                    alt="Stock list asset"
                  />
                  <div className={styles.stocklist_info}>
                    {isPublic && <PublicRoundedIcon fontSize="small" />}
                    <h3 className={styles.stocklist_name}>{name}</h3>
                  </div>
                </div>
              </Link>
            )
          )}
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.section_title} id="stocklists_shared">
          Stock Lists Shared With You
        </h2>

        <div className={styles.stocklist_list}>
          {sharedStockListData.map(
            ({
              name,
              isPublic,
              ownerUsername,
            }: {
              name: string;
              isPublic: boolean;
              ownerUsername: string;
            }) => (
              <Link
                href={`/stocklists/${ownerUsername}/${name}`}
                key={ownerUsername + name}
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
                    {isPublic && <PublicRoundedIcon fontSize="small" />}
                    <h3 className={styles.stocklist_name}>{name}</h3>
                  </div>

                  <h4 className={styles.stocklist_author}>({ownerUsername})</h4>
                </div>
              </Link>
            )
          )}
        </div>
      </div>
    </main>
  );
}
