import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request) {
  const { idToken } = await request.json();

  try {
    // const decoded = await adminAuth.verifyIdToken(idToken);
    // const token = await adminAuth.createSessionCookie(idToken, { expiresIn: 60 * 60 * 24 * 5 * 1000 });

    cookies().set("token", idToken, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 5,
      path: "/",
    });

    return NextResponse.json({ status: "success" });
  } catch (err) {
    console.log(err)
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
