import { db } from "@/lib/db";

export const getVerificationTokenByEmail = async (email: string) => {
  return db.verificationToken.findFirst({ where: { email } });
};

export const getVerificationTokenByToken = async (token: string) => {
  return db.verificationToken.findUnique({ where: { token } });
};
