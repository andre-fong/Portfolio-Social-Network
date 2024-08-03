import camelize from "camelize";
import { pool } from "./dbconfig";

export const getUserPortfolioList = async (uid: string) => {
  const res = await pool.query(
    `SELECT name
    FROM portfolio
    WHERE owner_uid = $1::uuid`,
    [uid]
  );
  return camelize(res.rows);
};

export const getUserStockList = async (uid: string) => {
  const res = await pool.query(
    `SELECT name, is_public
    FROM stock_list
    WHERE owner_uid = $1::uuid`,
    [uid]
  );
  return camelize(res.rows);
};

export const getSharedStockList = async (uid: string) => {
  const res = await pool.query(
    `(SELECT name, is_public, username AS owner_username
    FROM stock_list_share
    JOIN account ON stock_list_share.owner_uid = account.uid
    JOIN stock_list ON stock_list_share.stock_list_name = stock_list.name AND stock_list_share.owner_uid = stock_list.owner_uid
    WHERE stock_list_share.shared_with_uid = $1::uuid)
    UNION
    (SELECT name, is_public, username AS owner_username
    FROM stock_list
    JOIN account ON stock_list.owner_uid = account.uid
    WHERE stock_list.is_public = TRUE AND stock_list.owner_uid != $1::uuid)
    ORDER BY is_public, owner_username
    `,
    [uid]
  );
  return camelize(res.rows);
};
