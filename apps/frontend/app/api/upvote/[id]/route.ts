import { getToken } from "next-auth/jwt";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const token = req.cookies.get('next-auth.session-token').value;

  // Get the session token
  // const token = cookies['next-auth.session-token'] || cookies['__Secure-next-auth.session-token'];
  console.log("next server ", token)
  const { id } = params;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  console.log("token is there ... why undefined")
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/files/upvoteNote/${id}`,
    {},
    {
      headers: {
        Cookie: `next-auth.session-token=${token}`,
      },
      withCredentials: true,
    }
  );

  return NextResponse.json(res.data);
}
