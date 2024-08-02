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

export const login = async (username: string, passhash: string) => {
  const res = await pool.query(
    `SELECT uid FROM account WHERE username = $1 AND passhash = $2`,
    [username, passhash]
  );
  if (res.rows.length === 0) {
    throw new Error("Invalid username or password");
  }
  return camelize(res.rows[0].uid);
};
