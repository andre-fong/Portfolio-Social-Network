import { predictStock } from "@/database/stock";
import { NextRequest } from "next/server";

export const revalidate = 0;

export async function GET(request: NextRequest) {
  const stock = request.nextUrl.searchParams.get("stock");
  const numDays = request.nextUrl.searchParams.get("numDays");
  const res = await predictStock(stock || "", (numDays || 0) as number);
  return res instanceof Error
    ? Response.json(res.message, { status: 400 })
    : Response.json(res, { status: 200 });
}
