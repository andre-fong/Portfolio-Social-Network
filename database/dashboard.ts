import camelize from "camelize";
import { pool } from "./dbconfig";

export const getUserPortfolioList = async (uid: string) => {
  `SELECT name
  FROM portfolio
  WHERE owner_uid = $1`;
};

export const getUserStockList = async (uid: string) => {
  `SELECT name, is_public
  FROM stock_list
  WHERE owner_uid = $1`;
};

export const getSharedStockList = async (uid: string) => {
  `SELECT name, is_public, username
  FROM stock_list_share
  JOIN account
  ON stock_list_share.owner_uid = account.uid
  WHERE shared_with_uid = $1`;
};
