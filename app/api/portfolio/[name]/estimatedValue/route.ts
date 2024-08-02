import { getPortfolioEstValue } from "@/database/portfolio";
import { cookies } from "next/headers";

export const revalidate = 0;

export async function GET(
  request: Request,
  { params }: { params: { name: string } }
) {
  const uid = cookies().get("uid")?.value;
  if (!uid) {
    return Response.json({ error: "Not logged in" }, { status: 401 });
  }
  const res = await getPortfolioEstValue(uid, params.name);
  return Response.json(res, { status: 200 });
}
