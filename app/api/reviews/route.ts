import {
  getStockListReviews,
  newStockListReview,
  editStockListReview,
  deleteStockListReview,
} from "@/database/stocklist";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export const revalidate = 0;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const owner = searchParams.get("owner") || "";
  const name = searchParams.get("name") || "";

  const uid = cookies().get("uid")?.value;
  if (!uid) {
    return Response.json({ error: "Not logged in" }, { status: 401 });
  }
  const res = await getStockListReviews(uid, owner, name);
  return Response.json(res, { status: 200 });
}

export async function POST(request: NextRequest) {
  const { owner, name, content } = await request.json();

  const uid = cookies().get("uid")?.value;
  if (!uid) {
    return Response.json({ error: "Not logged in" }, { status: 401 });
  }

  if (!content) {
    return Response.json({ error: "Missing content" }, { status: 400 });
  }

  const res = await newStockListReview(uid, owner, name, content);
  return Response.json(res, { status: 201 });
}

export async function PATCH(request: NextRequest) {
  const { owner, name, content } = await request.json();

  const uid = cookies().get("uid")?.value;
  if (!uid) {
    return Response.json({ error: "Not logged in" }, { status: 401 });
  }

  if (!content) {
    return Response.json({ error: "Missing content" }, { status: 400 });
  }

  const res = await editStockListReview(uid, owner, name, content);
  return Response.json(res, { status: 200 });
}

export async function DELETE(request: NextRequest) {
  const { ownerUsername, listName, reviewerUsername } = await request.json();

  const uid = cookies().get("uid")?.value;
  if (!uid) {
    return Response.json({ error: "Not logged in" }, { status: 401 });
  }

  const res = await deleteStockListReview(
    uid,
    ownerUsername,
    listName,
    reviewerUsername
  );
  return Response.json(res, { status: 200 });
}
