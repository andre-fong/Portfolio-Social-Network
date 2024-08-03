import { getCoefficientOfVariations } from "@/database/statistics";
import { NextRequest } from "next/server";

export const revalidate = 0;

export async function GET(request: NextRequest) {
  const stocks = request.nextUrl.searchParams.getAll("stocks");
  const res = await getCoefficientOfVariations(stocks);
  return res instanceof Error
    ? Response.json(res.message, { status: 400 })
    : Response.json(res, { status: 200 });
}
