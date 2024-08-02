import camelize from "camelize";
import bcrypt from "bcryptjs";
import { login } from "../../../database/account";

export async function POST(request: Request) {
  const { username, password } = await request.json();
  const passhash = await bcrypt.hash(password, 12);
  const uid = await login(username, passhash);
  return Response.json(camelize({ uid: uid }));
}
