import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const token = req.headers.get('cookie')?.match(/next-auth\.session-token=([^;]+)/)?.[1];
  const { id } = params;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Parse JSON body
  const { isUpvoted } = await req.json();

  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/files/${isUpvoted ? 'downvoteNote' : 'upvoteNote'}/${id}`;

  try {
    const res = await axios.post(
      url,
      {},
      {
        headers: {
          Cookie: `next-auth.session-token=${token}`,
        },
        withCredentials: true,
      }
    );

    return NextResponse.json(res.data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process vote' }, { status: 500 });
  }
}
