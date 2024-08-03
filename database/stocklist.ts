import camelize from "camelize";
import { pool } from "./dbconfig";
import type { Listings } from "@/types/StockList";

export const newStockList = async (uid: string, name: string) => {
  const res = await pool.query(`INSERT INTO stock_list VALUES ($1, $2)`, [
    uid,
    name,
  ]);

  return camelize(res.rows);
};

export const deleteStockList = async (uid: string, name: string) => {
  const res = await pool.query(
    `DELETE FROM stock_list WHERE owner_uid = $1::uuid AND name = $2`,
    [uid, name]
  );

  return camelize(res.rows);
};

export const getStockListDetails = async (
  uid: string,
  ownerUsername: string,
  name: string
) => {
  const res = await pool.query(
    `
    SELECT name, username AS owner_username, is_public
    FROM stock_list
    JOIN account ON stock_list.owner_uid = account.uid
    WHERE username = $2
    AND name = $3
    AND (is_public = true OR owner_uid = $1::uuid OR EXISTS (
      SELECT *
      FROM stock_list_share
      JOIN account ON stock_list_share.owner_uid = account.uid
      WHERE username = $2
      AND shared_with_uid = $1::uuid
      AND stock_list_name = $3
    ))
    `,
    [uid, ownerUsername, name]
  );

  return camelize(res.rows);
};

export const getStockListReviews = async (
  uid: string,
  ownerUsername: string,
  name: string
) => {
  const res = await pool.query(
    `
    SELECT username AS user, content
    FROM (
      SELECT reviewer_uid, content, timestamp
      FROM stock_list_review
      JOIN account ON owner_uid = uid
      WHERE username = $1 AND stock_list_name = $2
    ) AS reviews
    JOIN account ON reviewer_uid = uid
    ORDER BY timestamp DESC
    `,
    [ownerUsername, name]
  );

  return camelize(res.rows);
};

export const newStockListReview = async (
  uid: string,
  ownerUsername: string,
  name: string,
  content: string
) => {
  const res = await pool.query(
    `INSERT INTO stock_list_review VALUES ((SELECT uid FROM account WHERE username = $2), $3, $1, $4)`,
    [uid, ownerUsername, name, content]
  );

  return camelize(res.rows);
};

export const editStockListReview = async (
  uid: string,
  ownerUsername: string,
  name: string,
  content: string
) => {
  const res = await pool.query(
    `UPDATE stock_list_review
    SET content = $4
    WHERE owner_uid = (SELECT uid FROM account WHERE username = $2)
    AND stock_list_name = $3
    AND reviewer_uid = $1::uuid`,
    [uid, ownerUsername, name, content]
  );

  return camelize(res.rows);
};

export const getStockListHoldings = async (uid: string, name: string) => {
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
      FROM stock_list_entry
      JOIN stock_day USING (ticker_symbol)
      WHERE  owner_uid = $1::uuid AND stock_list_name = $2
      )
      SELECT * FROM latest_data
      WHERE timestamp IN (
        SELECT MAX(timestamp)
        FROM stock_day sd2
        WHERE sd2.ticker_symbol = latest_data.symbol
    )  `,
    [uid, name]
  );
};

export const deleteStockListReview = async (
  uid: string,
  ownerUsername: string,
  name: string,
  reviewerUsername: string
) => {
  const res = await pool.query(
    `
    DELETE FROM stock_list_review
    WHERE owner_uid IN (
      SELECT uid
      FROM account
      WHERE username = $1
    ) 
    AND stock_list_name = $2 
    AND (reviewer_uid IN (
      SELECT uid
      FROM account
      WHERE username = $3
      AND uid = $4::uuid
    ) OR owner_uid = $4::uuid)
  `,
    [ownerUsername, name, reviewerUsername, uid]
  );

  return camelize(res.rows);
};

export const editStockListShares = async (
  uid: string,
  ownerUsername: string,
  name: string,
  listings: Listings[]
) => {
  const res = await pool.query(
    `DELETE FROM stock_list_entry
    WHERE owner_uid = (SELECT uid FROM account WHERE username = $2) 
    AND owner_uid = $1::uuid
    AND stock_list_name = $3`,
    [uid, ownerUsername, name]
  );

  await Promise.all(
    listings.map((listing) =>
      pool.query(
        `INSERT INTO stock_list_entry VALUES (
          (SELECT uid FROM account WHERE username = $2 AND uid = $1::uuid), $3, $4, $5
        )`,
        [uid, ownerUsername, name, listing.symbol, listing.shares]
      )
    )
  );

  return camelize(res.rows);
};

// TODO: make more safe
export const getStockListSharedWith = async (owner: string, name: string) => {
  const res = await pool.query(
    `
    SELECT username
    FROM stock_list_share
    JOIN account ON shared_with_uid = uid
    WHERE owner_uid IN (SELECT uid FROM account WHERE username = $1)
    AND stock_list_name = $2
    `,
    [owner, name]
  );

  return camelize(res.rows);
};

export const editStockListPublicity = async (
  uid: string,
  ownerUsername: string,
  name: string,
  isPublic: boolean
) => {
  const res = await pool.query(
    `UPDATE stock_list
    SET is_public = $4
    WHERE owner_uid = (SELECT uid FROM account WHERE username = $2)
    AND name = $3
    AND owner_uid = $1::uuid`,
    [uid, ownerUsername, name, isPublic]
  );

  return camelize(res.rows);
};

export const addStockListSharedWith = async (
  uid: string,
  ownerUsername: string,
  name: string,
  shareUsername: string
) => {
  const res = await pool.query(
    `INSERT INTO stock_list_share VALUES (
      (
      SELECT uid
      FROM account
      WHERE username = $2
      AND uid = $1::uuid
      ), $3,
      (SELECT uid
      FROM account
      WHERE username = $4)
    )`,
    [uid, ownerUsername, name, shareUsername]
  );

  return camelize(res.rows);
};

export const removeStockListSharedWith = async (
  uid: string,
  ownerUsername: string,
  name: string,
  shareUsername: string
) => {
  const res = await pool.query(
    `DELETE FROM stock_list_share
    WHERE owner_uid IN (SELECT uid FROM account WHERE username = $2)
    AND owner_uid = $1::uuid
    AND stock_list_name = $3
    AND shared_with_uid = (SELECT uid FROM account WHERE username = $4)`,
    [uid, ownerUsername, name, shareUsername]
  );

  return camelize(res.rows);
};
