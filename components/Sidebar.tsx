import styles from "./styles/Sidebar.module.scss";
import Paper from "@mui/material/Paper";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import FolderCopyRoundedIcon from "@mui/icons-material/FolderCopyRounded";
import SummarizeRoundedIcon from "@mui/icons-material/SummarizeRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import InsertChartRoundedIcon from "@mui/icons-material/InsertChartRounded";
import Tooltip from "@mui/material/Tooltip";
import Link from "next/link";
import { cookies } from "next/headers";

export default async function Dashboard() {
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
    <div className={styles.content}>
      <Paper elevation={5} sx={{ padding: "35px 20px", borderRadius: "20px" }}>
        <div className={styles.container}>
          <div className={styles.icon_container}>
            <Tooltip title="Dashboard" placement="right" arrow>
              <Link href="/home">
                <DashboardRoundedIcon fontSize="large" />
              </Link>
            </Tooltip>

            <Tooltip title="Portfolios" placement="right" arrow>
              <Link href="/home#portfolios">
                <FolderCopyRoundedIcon fontSize="large" />
              </Link>
            </Tooltip>

            <Tooltip title="Stock Lists" placement="right" arrow>
              <Link href="/home#stocklists">
                <SummarizeRoundedIcon fontSize="large" />
              </Link>
            </Tooltip>

            <Tooltip title="Stocks" placement="right" arrow>
              <Link href="/stocks">
                <InsertChartRoundedIcon fontSize="large" />
              </Link>
            </Tooltip>

            <Tooltip title="Friends" placement="right" arrow>
              <Link href="/friends">
                <PeopleAltRoundedIcon fontSize="large" />
              </Link>
            </Tooltip>
          </div>

          <div className={styles.icon_container} style={{ gap: "15px" }}>
            <Tooltip title={youData.username} placement="right" arrow>
              <AccountCircleRoundedIcon
                fontSize="large"
                sx={{ color: "black" }}
              />
            </Tooltip>

            {/* TODO: logout and return to / */}
            <Tooltip title="Logout" placement="right" arrow>
              <Link href="/logout">
                <LogoutRoundedIcon fontSize="large" />
              </Link>
            </Tooltip>
          </div>
        </div>
      </Paper>
    </div>
  );
}
