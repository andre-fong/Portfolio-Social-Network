import {
  deleteStockList,
  getStockListDetails,
  editStockListShares,
} from "@/database/stocklist";
import { cookies } from "next/headers";
import type { Listings } from "@/types/StockList";

export const revalidate = 0;

export async function GET(
  request: Request,
  { params }: { params: { slug: string[] } }
) {
  if (params.slug.length !== 2) {
    return Response.json({ error: "Invalid stock list name" }, { status: 400 });
  }

  const owner = params.slug[0];
  const listName = params.slug[1];

  const uid = cookies().get("uid")?.value;
  if (!uid) {
    return Response.json({ error: "Not logged in" }, { status: 401 });
  }
  const res = await getStockListDetails(uid, owner, listName);
  return Response.json(res, { status: 200 });
}

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

export async function PATCH(
  request: Request,
  { params }: { params: { slug: string[] } }
) {
  if (params.slug.length !== 2) {
    return Response.json({ error: "Invalid stock list name" }, { status: 400 });
  }

  const owner = params.slug[0];
  const listName = params.slug[1];
  const { shares }: { shares: Listings[] } = await request.json();

  const uid = cookies().get("uid")?.value;
  if (!uid) {
    return Response.json({ error: "Not logged in" }, { status: 401 });
  }

  if (!shares) {
    return Response.json({ error: "Missing shares" }, { status: 400 });
  }

  const res = await editStockListShares(uid, owner, listName, shares);
  return Response.json(res, { status: 200 });
}
