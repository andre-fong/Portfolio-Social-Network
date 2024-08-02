import camelize from "camelize";
import bcrypt from "bcryptjs";
import { login } from "../../../database/account";
import { cookies } from "next/headers";

export const revalidate = 0;

export async function POST(request: Request) {
  const { username, password } = await request.json();
  const { uid, passhash } = await login(username);
  if (!(await bcrypt.compare(password, passhash))) {
    throw new Error("Invalid username or password");
  }
  cookies().set("uid", uid);
  return Response.json(camelize({ uid: uid }));
}
