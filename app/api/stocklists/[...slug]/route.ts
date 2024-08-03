import { deleteStockList } from "@/database/stocklist";
import { cookies } from "next/headers";

export const revalidate = 0;

export async function DELETE(
  request: Request,
  { params }: { params: { slug: string[] } }
) {
  if (params.slug.length !== 2) {
    return Response.json({ error: "Invalid stock list name" }, { status: 400 });
  }

  const listName = params.slug[1];

  const uid = cookies().get("uid")?.value;
  if (!uid) {
    return Response.json({ error: "Not logged in" }, { status: 401 });
  }
  const res = await deleteStockList(uid, listName);
  return Response.json(res, { status: 200 });
}
