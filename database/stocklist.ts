import camelize from "camelize";
import { pool } from "./dbconfig";

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
