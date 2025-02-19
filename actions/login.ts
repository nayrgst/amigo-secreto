"use server";

import { z } from "zod";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { loginSchema } from "@/schemas/loginSchema";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/resend";
import { getServerSession } from "@/lib/getServerSession";

export const login = async (values: z.infer<typeof loginSchema>) => {
  const validateFields = loginSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Email inválido!" };
  }

  const { email } = validateFields.data;

  const existingUser = await db.user.findUnique({
    where: { email },
  });

  const userSession = await getServerSession();

  if (userSession) {
    return redirect("/dashboard");
  }

  if (!existingUser) {
    return { error: "Usuário não encontrado!" };
  }

  const verificationToken = await generateVerificationToken(email);

  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: "E-mail enviado!" };
};
