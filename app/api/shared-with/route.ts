import {
  getStockListReviews,
  newStockListReview,
  editStockListReview,
  deleteStockListReview,
  editStockListPublicity,
  getStockListSharedWith,
  addStockListSharedWith,
  removeStockListSharedWith,
} from "@/database/stocklist";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const owner = searchParams.get("owner") || "";
  const name = searchParams.get("name") || "";

  const uid = cookies().get("uid")?.value;
  if (!uid) {
    return Response.json({ error: "Not logged in" }, { status: 401 });
  }

  const res = await getStockListSharedWith(owner, name);
  return Response.json(res, { status: 200 });
}

export async function POST(request: NextRequest) {
  const { owner, name, shareUsername } = await request.json();

  const uid = cookies().get("uid")?.value;
  if (!uid) {
    return Response.json({ error: "Not logged in" }, { status: 401 });
  }

  const res = await addStockListSharedWith(uid, owner, name, shareUsername);
  return Response.json(res, { status: 200 });
}

export async function PATCH(request: NextRequest) {
  const { owner, name, isPublic } = await request.json();

  const uid = cookies().get("uid")?.value;
  if (!uid) {
    return Response.json({ error: "Not logged in" }, { status: 401 });
  }

  const res = await editStockListPublicity(uid, owner, name, isPublic);
  return Response.json(res, { status: 200 });
}

export async function DELETE(request: NextRequest) {
  const { owner, name, shareUsername } = await request.json();

  const uid = cookies().get("uid")?.value;
  if (!uid) {
    return Response.json({ error: "Not logged in" }, { status: 401 });
  }

  const res = await removeStockListSharedWith(uid, owner, name, shareUsername);
  return Response.json(res, { status: 200 });
}
