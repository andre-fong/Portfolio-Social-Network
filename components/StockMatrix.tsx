"use client";
import styles from "./styles/StockMatrix.module.scss";
import { useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function StockMatrix() {
  const [matrixType, setMatrixType] = useState("covariance");

  function handleTypeChange(
    event: React.MouseEvent<HTMLElement>,
    newMatrixType: string
  ) {
    setMatrixType((oldType) => (!!newMatrixType ? newMatrixType : oldType));
  }

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <h2 className={styles.section_title}>Stock Matrix</h2>
        <ToggleButtonGroup
          value={matrixType}
          exclusive
          onChange={handleTypeChange}
          color="primary"
        >
          <ToggleButton value="covariance">Covariance</ToggleButton>
          <ToggleButton value="correlation">Correlation</ToggleButton>
        </ToggleButtonGroup>
      </div>

      <div className={styles.date_fields}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker label="Start Date" />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker label="End Date" />
        </LocalizationProvider>
      </div>
    </div>
  );
}
