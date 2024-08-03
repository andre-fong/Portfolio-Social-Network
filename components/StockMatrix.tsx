"use client";
import styles from "./styles/StockMatrix.module.scss";
import { useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import type { StockMatrixType } from "@/types/Stocks";

export default function StockMatrix({
  symbols,
  covarianceData,
  correlationData,
}: {
  symbols: string[];
  covarianceData: {
    tickerSymbol1: string;
    tickerSymbol2: string;
    correlation: number;
  }[];
  correlationData: {
    tickerSymbol1: string;
    tickerSymbol2: string;
    covariance: number;
  }[];
}) {
  const [matrixType, setMatrixType] = useState<StockMatrixType>("covariance");

  const dataToMatrix = (
    data: {
      tickerSymbol1: string;
      tickerSymbol2: string;
      correlation?: number;
      covariance?: number;
    }[]
  ) => {
    const matrix = Array(symbols.length)
      .fill(0)
      .map(() => Array(symbols.length).fill(0));

    data.forEach((datum) => {
      const i = symbols.indexOf(datum.tickerSymbol1);
      const j = symbols.indexOf(datum.tickerSymbol2);
      const datumValue = datum.correlation || datum.covariance;
      matrix[i][j] = datumValue;
      matrix[j][i] = datumValue;
    });

    return matrix;
  };

  const matrix = {
    symbols: symbols,
    correlation: dataToMatrix(correlationData),
    covariance: dataToMatrix(covarianceData),
  };
  console.log(matrix);

  function handleTypeChange(
    event: React.MouseEvent<HTMLElement>,
    newMatrixType: StockMatrixType | null
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

      {/* <div className={styles.date_fields}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker label="Start Date" />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker label="End Date" />
        </LocalizationProvider>
      </div> */}

      <table
        className={styles.matrix_table}
        style={{ borderSpacing: "8px", width: "100%" }}
      >
        <thead>
          <tr>
            <th></th>
            {matrix.symbols.map((symbol) => (
              <th key={symbol} style={{ textAlign: "left" }}>
                {symbol}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {matrix[matrixType].map((row, i) => (
            <tr key={i}>
              <td style={{ fontWeight: "bold" }}>{matrix.symbols[i]}</td>
              {row.map((value, j) => (
                <td key={j}>{value.toFixed(2)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
