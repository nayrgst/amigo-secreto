"use server";

import { jwtVerify } from "jose";
import { cookies } from "next/headers";

import { db } from "@/lib/db";

export const getServerSession = async () => {
  const token = (await cookies()).get("session-token")?.value;

  if (!token) return null;

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET!),
    );

    const user = await db.user.findUnique({
      where: { id: payload.userId as string },
    });

    return user || null;
  } catch (error) {
    console.error("Erro ao verificar o token", error);
    return null;
  }
};
