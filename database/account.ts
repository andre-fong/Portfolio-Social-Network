import camelize from "camelize";
import { pool } from "./dbconfig";

export const register = async (username: string, passhash: string) => {
  const res = await pool
    .query(
      `INSERT INTO account (username, passhash) VALUES ($1, $2) RETURNING uid`,
      [username, passhash]
    )
    .catch((err) => {
      console.log(err);
      if (err.constraint === "account_unique_username") {
        throw new Error("Username already exists");
      }
      throw err;
    });

  return camelize(res.rows[0].uid);
};

export const login = async (username: string) => {
  const res = await pool.query(`SELECT * FROM account WHERE username = $1`, [
    username,
  ]);
  if (res.rows.length === 0) {
    return {};
  }
  return camelize(res.rows[0]);
};
