import { cookies } from "next/headers";
import { pool } from "@/database/dbconfig";
import camelize from "camelize";

export const revalidate = 0;

export async function GET(request: Request) {
  const uid = cookies().get("uid")?.value;
  if (!uid) {
    return Response.json({ error: "Not logged in" }, { status: 401 });
  }
  const res = await pool.query(
    `SELECT username
    FROM account
    WHERE uid = $1::uuid`,
    [uid]
  );
  const username = camelize(res.rows)[0].username;
  return Response.json({ username }, { status: 200 });
}
