import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

import { db } from "@/lib/db";

export const GET = async () => {
  try {
    const getToken = (await cookies()).get("session-token")?.value;

    if (!getToken) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    const { payload } = await jwtVerify(
      getToken,
      new TextEncoder().encode(process.env.JWT_SECRET!),
    );

    const user = await db.user.findUnique({
      where: { id: payload.userId as string },
      select: { id: true, email: true },
    });

    if (!user) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error ao verificar token:", error);
    return NextResponse.json({ user: null }, { status: 500 });
  }
};
