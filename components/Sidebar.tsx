import styles from "./styles/Sidebar.module.scss";
import Paper from "@mui/material/Paper";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import FolderCopyRoundedIcon from "@mui/icons-material/FolderCopyRounded";
import SummarizeRoundedIcon from "@mui/icons-material/SummarizeRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import Tooltip from "@mui/material/Tooltip";
import Link from "next/link";

export default function Dashboard() {
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
              <Link href="/portfolios">
                <FolderCopyRoundedIcon fontSize="large" />
              </Link>
            </Tooltip>

            <Tooltip title="Stock Lists" placement="right" arrow>
              <Link href="/stocklists">
                <SummarizeRoundedIcon fontSize="large" />
              </Link>
            </Tooltip>

            <Tooltip title="Friends" placement="right" arrow>
              <Link href="/friends">
                <PeopleAltRoundedIcon fontSize="large" />
              </Link>
            </Tooltip>
          </div>

          <div className={styles.icon_container} style={{ gap: "15px" }}>
            <Tooltip title="Profile" placement="right" arrow>
              <Link href="/profile">
                <AccountCircleRoundedIcon
                  fontSize="large"
                  sx={{ color: "black" }}
                />
              </Link>
            </Tooltip>

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
