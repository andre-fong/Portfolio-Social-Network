import { getActiveFriends } from "@/database/social";
import { cookies } from "next/headers";

export const revalidate = 0;

export async function GET() {
  const uid = cookies().get("uid")?.value;
  if (!uid) {
    return Response.json({ error: "Not logged in" }, { status: 401 });
  }
  const res = await getActiveFriends(uid);
  return Response.json(res, { status: 200 });
}
