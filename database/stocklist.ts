import camelize from "camelize";
import { pool } from "./dbconfig";

export const newStockList = async (uid: string, name: string) => {
  `INSERT INTO stock_list VALUES ($1, $2)`;
};
