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
    SET balance = balance - $3
    WHERE owner_uid = $1::uuid AND name = $2`,
    [uid, nameFrom, amount]
  );
  const res2 = await pool.query(
    `UPDATE portfolio
    SET balance = balance + $3
    WHERE owner_uid = $1::uuid AND name = $2`,
    [uid, nameTo, amount]
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

  const res2 = await pool.query(
    `INSERT INTO portfolio_entry
    VALUES ($1::uuid, $2, $3, $4)`,
    [uid, name, symbol, amount]
  );

  return camelize(res.rows);
};

export const getPortfolioHoldings = async (uid: string, name: string) => {
  const res = await pool.query(
    ` WITH latest_data AS (
        SELECT 
        "timestamp",
        ticker_symbol AS symbol, 
        num_shares AS shares,
        close AS price,
        close * num_shares AS total_value,
        close - LAG(close, 1) OVER (PARTITION BY ticker_symbol ORDER BY timestamp) AS change, 
        (close - LAG(close, 1) OVER (PARTITION BY ticker_symbol ORDER BY timestamp)) * num_shares AS total_change
      FROM portfolio_entry
      JOIN stock_day USING (ticker_symbol)
      WHERE  owner_uid = $1::uuid AND portfolio_name = $2
      )
      SELECT * FROM latest_data
      WHERE timestamp IN (
        SELECT MAX(timestamp)
        FROM stock_day sd2
        WHERE sd2.ticker_symbol = latest_data.symbol
    ) `,
    [uid, name]
  );
  return camelize(res.rows);
};

export const getPortfolioEstValue = async (uid: string, name: string) => {
  const res = await pool.query(
    `
    SELECT SUM(close * num_shares) AS total_value
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
