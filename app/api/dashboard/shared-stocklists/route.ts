import { getSharedStockList } from "@/database/dashboard";
import { cookies } from "next/headers";

export const revalidate = 0;

export async function GET(request: Request) {
  const uid = cookies().get("uid")?.value;
  if (!uid) {
    return Response.json({ error: "Not logged in" }, { status: 401 });
  }
  const res = await getSharedStockList(uid);
  return Response.json(res, { status: 200 });
}
