import camelize from "camelize";
import { pool } from "./dbconfig";

export const newStockList = async (uid: string, name: string) => {
  const res = await pool.query(`INSERT INTO stock_list VALUES ($1, $2)`, [
    uid,
    name,
  ]);

  return camelize(res.rows);
};
