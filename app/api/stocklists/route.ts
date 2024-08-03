import { newStockList } from "@/database/stocklist";
import { cookies } from "next/headers";

export const revalidate = 0;

export async function POST(request: Request) {
  const { name }: { name: string } = await request.json();
  const uid = cookies().get("uid")?.value;
  if (!uid) {
    return Response.json({ error: "Not logged in" }, { status: 401 });
  }
  const res = await newStockList(uid, name);
  return Response.json(res, { status: 201 });
}
