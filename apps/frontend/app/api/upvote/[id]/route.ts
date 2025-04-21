import { getToken } from "next-auth/jwt";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const token = await getToken({ req });
  console.log("next server ", req)
  const { id } = params;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/files/upvoteNote/${id}`,
    body,
    {
      headers: {
        Cookie: `next-auth.session-token=${token}`,
      },
    }
  );

  return NextResponse.json(res.data);
}
