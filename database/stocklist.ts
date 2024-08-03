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
    `DELETE FROM stock_list WHERE owner_uid = $1 AND name = $2`,
    [uid, name]
  );

  return camelize(res.rows);
};
