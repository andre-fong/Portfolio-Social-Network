import { newPortfolio } from "@/database/portfolio";
import { cookies } from "next/headers";

export const revalidate = 0;

export async function POST(request: Request) {
  const { name, balance }: { name: string; balance: number } =
    await request.json();
  const uid = cookies().get("uid")?.value;
  if (!uid) {
    return Response.json({ error: "Not logged in" }, { status: 401 });
  }
  const res = await newPortfolio(uid, name, balance);
  return Response.json(res, { status: 201 });
}
