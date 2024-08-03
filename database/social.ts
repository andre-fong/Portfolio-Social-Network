import camelize from "camelize";
import { pool } from "./dbconfig";

export const getActiveFriends = async (uid: string) => {
  const res = await pool.query(
    ` SELECT username
      FROM friend
      JOIN account ON
      (CASE
        WHEN friend_uid_low = $1 THEN friend_uid_high
        WHEN friend_uid_high = $1 THEN friend_uid_low
      END) = uid
      WHERE (friend_uid_low = $1 OR friend_uid_high = $1)
      AND low_accepted = TRUE
      AND high_accepted = TRUE`,
    [uid]
  );
  return camelize(res.rows.map((row) => row.username));
};

export const getPendingFriendsOutgoing = async (uid: string) => {
  console.log("getting pending friends outgoing");
  const res = await pool.query(
    ` SELECT username
      FROM friend
      JOIN account ON 
      (CASE
        WHEN friend_uid_low = $1 THEN friend_uid_high
        WHEN friend_uid_high = $1 THEN friend_uid_low
      END) = uid
      WHERE (friend_uid_low = $1 OR friend_uid_high = $1)
      AND CASE
        WHEN friend_uid_low = $1 THEN (low_accepted = TRUE AND high_accepted = FALSE)
        WHEN friend_uid_high = $1 THEN (low_accepted = FALSE AND high_accepted = TRUE)
      END`,
    [uid]
  );
  return camelize(res.rows.map((row) => row.username));
};

export const getPendingFriendsIncoming = async (uid: string) => {
  const res = await pool.query(
    ` SELECT username
      FROM friend
      JOIN account ON 
      (CASE
        WHEN friend_uid_low = $1 THEN friend_uid_high
        WHEN friend_uid_high = $1 THEN friend_uid_low
      END) = uid
      WHERE (friend_uid_low = $1 OR friend_uid_high = $1)
      AND CASE
        WHEN friend_uid_low = $1 THEN (low_accepted = FALSE AND high_accepted = TRUE)
        WHEN friend_uid_high = $1 THEN (low_accepted = TRUE AND high_accepted = FALSE)
      END`,
    [uid]
  );
  return camelize(res.rows.map((row) => row.username));
};

/** Same operation - set your side of accepted to true. */
export const sendAcceptFriendRequest = async (
  uid: string,
  friendUsername: string
) => {
  const friendUidRes = camelize(
    await pool.query(`SELECT uid FROM account WHERE username = $1`, [
      friendUsername,
    ])
  ).rows[0];

  if (!friendUidRes) {
    return new Error("User does not exist");
  }

  const friendUid = friendUidRes.uid;
  // uid = '43ed70e9-891e-4eb7-b2a6-44ca40e9cd68';
  // const friendUid = "78ecfacb-333e-40b8-b871-f73fd81c3990";
  console.log("uid: ", uid);
  console.log("friendUid: ", friendUid);
  const friendRecord = camelize(
    await pool.query(
      ` SELECT 
        (CASE
          WHEN $1 < $2 THEN low_accepted
          ELSE high_accepted
        END) AS accepted,
        (CASE
          WHEN $1 < $2 THEN high_accepted
          ELSE low_accepted
        END) AS friend_accepted,
        enable_at
        FROM friend 
        WHERE (friend_uid_low = $1::uuid AND friend_uid_high = $2::uuid) 
        OR (friend_uid_low = $2::uuid AND friend_uid_high = $1::uuid)`,
      [uid, friendUid]
    )
  ).rows[0];
  // no friendship ever existed between the two users - insert
  if (!friendRecord) {
    const res = await pool
      .query(
        ` INSERT INTO friend (
          friend_uid_low, 
          friend_uid_high, 
          low_accepted, 
          high_accepted)
          VALUES (
            CASE
              WHEN $1 < $2 THEN $1::uuid
              ELSE $2::uuid
            END,
            CASE
              WHEN $1 < $2 THEN $2::uuid
              ELSE $1::uuid
            END,
            CASE
              WHEN $1 < $2 THEN TRUE
              ELSE FALSE
            END,
            CASE
              WHEN $1 < $2 THEN FALSE
              ELSE TRUE
            END
          )`,
        [uid, friendUid]
      )
      .catch((err) => {
        if (err.constraint === "friend_check") {
          // same uid in both columns - should never happen
          return new Error("Cannot be friends with yourself :c");
        }
        throw err;
      });
    if (res instanceof Error) {
      return res;
    }
    return `Friend request sent to ${friendUsername}`;
  }
  // friendship record already exists
  if (friendRecord.accepted && friendRecord.friendAccepted) {
    return new Error("Already friends");
  } else if (friendRecord.accepted && !friendRecord.friendAccepted) {
    return new Error("Friend request already sent");
  } else if (friendRecord.enableAt > new Date()) {
    return new Error(
      `Friend request blocked. Try again at ${friendRecord.enableAt.toLocaleString()}`
    );
  } else {
    // send friend request or accepting incoming pending request
    await pool.query(
      ` UPDATE friend
          SET
          low_accepted =
          CASE
            WHEN $1 < $2 THEN TRUE
            ELSE low_accepted
          END,
          high_accepted =
          CASE
            WHEN $1 < $2 THEN high_accepted
            ELSE TRUE
          END
          WHERE (friend_uid_low = $1::uuid AND friend_uid_high = $2::uuid)
          OR (friend_uid_low = $2::uuid AND friend_uid_high = $1::uuid)`,
      [uid, friendUid]
    );
    return friendRecord.friendAccepted
      ? `Accepted friend request from ${friendUsername}`
      : `Friend request sent to ${friendUsername}`;
  }
};

/** Same operation - set both side of accepted to false and set enable_at. */
export const cancelRejectRemoveFriend = async (
  uid: string,
  friendUsername: string
) => {
  const friendUidRes = camelize(
    await pool.query(`SELECT uid FROM account WHERE username = $1`, [
      friendUsername,
    ])
  ).rows[0];

  if (!friendUidRes) {
    return new Error("User does not exist");
  }

  const friendUid = friendUidRes.uid;

  const friendRecord = camelize(
    await pool.query(
      ` SELECT 
        (CASE
          WHEN $1 < $2 THEN low_accepted
          ELSE high_accepted
        END) AS accepted,
        (CASE
          WHEN $1 < $2 THEN high_accepted
          ELSE low_accepted
        END) AS friend_accepted
        FROM friend 
        WHERE ((friend_uid_low = $1::uuid AND friend_uid_high = $2::uuid) 
        OR (friend_uid_low = $2::uuid AND friend_uid_high = $1::uuid))
        AND (low_accepted = TRUE OR high_accepted = TRUE)`,
      [uid, friendUid]
    )
  ).rows[0];

  if (!friendRecord) {
    return new Error("Friendship or request does not exist");
  }

  await pool.query(
    ` UPDATE friend
      SET low_accepted = FALSE, high_accepted = FALSE,
      enable_at = NOW() + 5 * (INTERVAL '1 minute')
      WHERE (friend_uid_low = $1::uuid AND friend_uid_high = $2::uuid) 
      OR (friend_uid_low = $2::uuid AND friend_uid_high = $1::uuid)`,
    [uid, friendUid]
  );

  return friendRecord.accepted && friendRecord.friendAccepted
    ? `Removed ${friendUsername} from friends`
    : friendRecord.friendAccepted
    ? `Rejected friend request from ${friendUsername}`
    : `Cancelled friend request to ${friendUsername}`;
};
