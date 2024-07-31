"use client";
import styles from "./styles/StockMatrix.module.scss";
import { useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

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
    </div>
  );
}
