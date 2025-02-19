"use server";

import { z } from "zod";
import { redirect } from "next/navigation";

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

  const userSession = await getServerSession();
  console.log(userSession);

  if (userSession) {
    try {
      redirect("/dashboard");
    } catch (error) {
      console.error("Erro ao redirecionar:", error);
      return { error: "Falha ao redirecionar." };
    }
  }

  const verificationToken = await generateVerificationToken(email);

  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: "E-mail enviado!" };
};
