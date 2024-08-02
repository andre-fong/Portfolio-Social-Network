import { cancelRejectRemoveFriend } from "@/database/social";
import { cookies } from "next/headers";

export const revalidate = 0;

export async function POST(request: Request) {
  const uid = cookies().get("uid")?.value;
  if (!uid) {
    return Response.json({ error: "Not logged in" }, { status: 401 });
  }
  const { username } = await request.json();
  const res = await cancelRejectRemoveFriend(uid, username);
  return res instanceof Error
    ? Response.json(res.message, { status: 400 })
    : Response.json(res, { status: 200 });
}
