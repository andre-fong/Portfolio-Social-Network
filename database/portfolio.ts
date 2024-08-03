import camelize from "camelize";
import { pool } from "./dbconfig";

export const newPortfolio = async (
  uid: string,
  name: string,
  balance: number
) => {
  const res = await pool
    .query(`INSERT INTO portfolio values ($1::uuid, $2, $3)`, [
      uid,
      name,
      balance,
    ])
    .catch((err) => {
      if (err.constraint === "portfolio_pkey") {
        return Error("Data already exists");
      }
      throw err;
    });
  return res instanceof Error ? res : `Added data for portfolio ${name}`;
};

export const getPortfolioDetails = async (uid: string, name: string) => {
  const res = await pool.query(
    `SELECT name, balance
  FROM portfolio
  WHERE owner_uid = $1::uuid AND name = $2`,
    [uid, name]
  );

  return camelize(res.rows);
};

export const newPortfolioTransaction = async (
  uid: string,
  name: string,
  amount: number
) => {
  const res = await pool.query(
    `UPDATE portfolio
  SET balance = balance + $3
  WHERE owner_uid = $1::uuid AND name = $2`,
    [uid, name, amount]
  );

  return camelize(res.rows);
};

export const newPortfolioTransfer = async (
  uid: string,
  nameFrom: string,
  nameTo: string,
  amount: number
) => {
  const res = await pool.query(
    `UPDATE portfolio
    SET balance = balance - $4
    WHERE owner_uid = $1::uuid AND name = $2;
    UPDATE portfolio
    SET balance = balance + $4
    WHERE owner_uid = $1::uuid AND name = $3`,
    [uid, nameFrom, nameTo, amount]
  );

  return camelize(res.rows);
};

export const newPortfolioTrade = async (
  uid: string,
  name: string,
  symbol: string,
  amount: number
) => {
  const res = await pool.query(
    `
    UPDATE portfolio
    SET balance = balance - (
      SELECT close * $4
      FROM stock_day
      JOIN portfolio_entry
      ON stock_day.ticker_symbol = portfolio_entry.ticker_symbol
      WHERE timestamp IN (
        SELECT MAX(timestamp)
        FROM stock_day sd2
        WHERE sd2.ticker_symbol = stock_day.ticker_symbol
      )
      AND stock_day.ticker_symbol = $3
    )
    WHERE owner_uid = $1::uuid AND name = $2
    `,
    [uid, name, symbol, amount]
  );
};

export const getPortfolioHoldings = async (uid: string, name: string) => {
  const res = await pool.query(
    ` WITH latest_data AS (
        SELECT 
        "timestamp",
        ticker_symbol, 
        num_shares,
        close,
        close * num_shares AS value,
        close - LAG(close, 1) OVER (PARTITION BY ticker_symbol ORDER BY timestamp) AS unit_change, 
        (close - LAG(close, 1) OVER (PARTITION BY ticker_symbol ORDER BY timestamp)) * num_shares AS total_change
      FROM portfolio_entry
      JOIN stock_day USING (ticker_symbol)
      WHERE  owner_uid = $1::uuid AND portfolio_name = $2
      )
      SELECT * FROM latest_data
      WHERE timestamp IN (
        SELECT MAX(timestamp)
        FROM stock_day sd2
        WHERE sd2.ticker_symbol = latest_data.ticker_symbol
    ) `,
    [uid, name]
  );
};

export const getPortfolioEstValue = async (uid: string, name: string) => {
  const res = await pool.query(
    `
    SELECT SUM(close * num_shares) AS totalValue
    FROM portfolio_entry
    JOIN stock_day 
    ON portfolio_entry.ticker_symbol = stock_day.ticker_symbol
    WHERE timestamp IN (
      SELECT MAX(timestamp)
      FROM stock_day sd2
      WHERE sd2.ticker_symbol = stock_day.ticker_symbol
    )
    AND owner_uid = $1::uuid AND portfolio_name = $2;
    `,
    [uid, name]
  );

  return camelize(res.rows);
};
