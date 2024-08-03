import { getAllStocksRecentData } from "@/database/stock";
import { NextRequest } from "next/server";

export const revalidate = 0;

export async function GET(request: NextRequest) {
  const res = await getAllStocksRecentData();
  return res instanceof Error
    ? Response.json(res.message, { status: 400 })
    : Response.json(res, { status: 200 });
}
