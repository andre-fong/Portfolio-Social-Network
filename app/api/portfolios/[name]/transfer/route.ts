import { newPortfolioTransfer } from "@/database/portfolio";
import { cookies } from "next/headers";

export const revalidate = 0;

export async function POST(
  request: Request,
  { params }: { params: { name: string } }
) {
  const { from, to, amount } = await request.json();

  const uid = cookies().get("uid")?.value;
  if (!uid) {
    return Response.json({ error: "Not logged in" }, { status: 401 });
  }
  const res = await newPortfolioTransfer(uid, from, to, amount);
  return Response.json(res, { status: 200 });
}
