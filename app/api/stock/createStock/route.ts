import { createStock } from "@/database/stock";
import { NextRequest } from "next/server";

export const revalidate = 0;

export async function POST(request: NextRequest) {
  const { tickerSymbol } = await request.json();
  const res = await createStock(tickerSymbol);
  return res instanceof Error
    ? Response.json(res.message, { status: 400 })
    : Response.json(res, { status: 201 });
}
