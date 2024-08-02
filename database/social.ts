import camelize from "camelize";
import { pool } from "./dbconfig";

export const getActiveFriends = async (uid: string) => {
  const res = await pool.query(
    ` SELECT * FROM friend
      WHERE (friend_uid_low = $1 OR friend_uid_high = $1)
      AND low_accepted = TRUE 
      AND high_accepted = TRUE`,
    [uid]
  );
  return camelize(res.rows);
};

export const getPendingFriends = async (uid: string) => {
  const res = await pool.query(
    ` SELECT * FROM friend
      WHERE (friend_uid_low = $1 OR friend_uid_high = $1)
      AND (low_accepted = FALSE OR high_accepted = FALSE)`,
    [uid]
  );
  return camelize(res.rows);
};
