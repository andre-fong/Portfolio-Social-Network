import { addStockData } from "@/database/stock";
import { NextRequest } from "next/server";

export const revalidate = 0;

export async function POST(request: NextRequest) {
  const stockData = await request.json();
  const res = await addStockData(stockData);
  return res instanceof Error
    ? Response.json(res.message, { status: 400 })
    : Response.json(res, { status: 201 });
}
