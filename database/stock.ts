import camelize from "camelize";
import { pool } from "./dbconfig";

export const getStockData = async (tickerSymbol: string, numDays: number) => {
  const res = await pool.query(
    ` SELECT * FROM stock_day 
      WHERE ticker_symbol = $1
      ORDER BY timestamp DESC
      LIMIT $2`,
    [tickerSymbol, numDays]
  );
  return camelize(res.rows);
};

export const getAllStocksRecentData = async () => {
  const res = await pool.query(
    ` SELECT stock_day.*
      FROM public.stock_day
      INNER JOIN (
        SELECT ticker_symbol, MAX(timestamp) AS latest_timestamp
        FROM public.stock_day
        GROUP BY ticker_symbol
      ) AS latest_timestamps
      ON stock_day.ticker_symbol = latest_timestamps.ticker_symbol
      AND stock_day.timestamp = latest_timestamps.latest_timestamp`
  );
  return camelize(res.rows);
};

export const createStock = async (tickerSymbol: string) => {
  const res = await pool
    .query(`INSERT INTO stock (ticker_symbol) VALUES ($1)`, [tickerSymbol])
    .catch((err) => {
      if (err.constraint === "stock_pkey") {
        return new Error("Stock already exists");
      }
      return new Error("Invalid stock symbol");
    });

  return res instanceof Error
    ? res
    : `Created stock with symbol ${tickerSymbol}`;
};

export const addStockData = async (data: any) => {
  const res = await pool
    .query(
      `INSERT INTO stock_day (ticker_symbol, timestamp, open, high, low, close, volume)
     VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        data.ticker_symbol,
        data.timestamp,
        data.open,
        data.high,
        data.low,
        data.close,
        data.volume,
      ]
    )
    .catch((err) => {
      if (err.constraint === "stock_day_pkey") {
        return Error("Data already exists");
      }
      if (err.constraint === "stock_day_stock_fk") {
        return new Error("Stock does not exist");
      }
      console.log(err.constraint);
      return new Error("Invalid data");
    });
  return res instanceof Error ? res : `Added data for ${data.ticker_symbol}`;
};

export const predictStock = async (tickerSymbol: string, numDays: number) => {
  const res = await pool.query(
    ` WITH model_data AS (
        SELECT ticker_symbol, close, timestamp
        FROM stock_day
        WHERE ticker_symbol = $1
        ORDER BY timestamp DESC
        LIMIT $2
      ), regression AS (
        SELECT
          regr_slope(close, EXTRACT(EPOCH FROM timestamp)) AS slope,
          regr_intercept(close, EXTRACT(EPOCH FROM timestamp)) AS intercept
        FROM model_data
      ), prediction_dates AS (
        SELECT ticker_symbol = $1, generate_series(
          (SELECT MAX(timestamp) FROM stock_day WHERE ticker_symbol = $1),
          (SELECT MAX(timestamp) FROM stock_day WHERE ticker_symbol = $1) + interval '1 day' * $2,
          interval '1 day'
        )::date AS date
      )
      SELECT
          prediction_dates.ticker_symbol,
          prediction_dates.date AS prediction_date,
          ( regression.slope * 
            EXTRACT(EPOCH FROM predictions.date) + regression.intercept 
          ) AS predicted_price
      FROM regression CROSS JOIN prediction_dates
      `,
    [tickerSymbol, numDays]
  );
  return camelize(res.rows);
};
