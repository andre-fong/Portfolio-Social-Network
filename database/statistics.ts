import camelize from "camelize";
import { pool } from "./dbconfig";

export const getCorrelationMatrix = async (tickerSymbols: string[]) => {
  const res = await pool.query(
    `SELECT * FROM stock_correlation_matrix WHERE ticker_symbol1 = ANY($1) AND ticker_symbol2 = ANY($1)`,
    [tickerSymbols]
  );
  return camelize(res.rows);
};

export const getCovarianceMatrix = async (tickerSymbols: string[]) => {
  const res = await pool.query(
    `SELECT * FROM stock_covariance_matrix WHERE ticker_symbol1 = ANY($1) AND ticker_symbol2 = ANY($1)`,
    [tickerSymbols]
  );
  return camelize(res.rows);
};

export const getCoefficientOfVariations = async (tickerSymbols: string[]) => {
  const res = await pool.query(
    ` SELECT ticker_symbol, stddev(close) / avg(close) AS coefficient_of_variation
      FROM stock_day
      GROUP BY ticker_symbol
      HAVING ticker_symbol = ANY($1)`,
    [tickerSymbols]
  );
  return camelize(res.rows);
};

export const getBetaCoefficients = async (tickerSymbols: string[]) => {
  // beta coefficient covariance(stock, market) / variance(market)
  const res = await pool.query(
    ` WITH stock_market_covariance AS (
          SELECT ticker_symbol1, covariance
          FROM stock_covariance_matrix
          WHERE ticker_symbol1 = ANY($1) AND ticker_symbol2 = 'market'
      ),
      market_close_avg AS (
          SELECT avg(close) AS avg_close
          FROM stock_day
          GROUP BY timestamp
      ),
      market_variance AS (
          SELECT variance(avg_close) AS variance
          FROM market_close_avg
      )
      SELECT ticker_symbol1, covariance / variance AS beta_coefficient
      FROM stock_market_covariance, market_variance`,
    [tickerSymbols]
  );
  return camelize(res.rows);
};
