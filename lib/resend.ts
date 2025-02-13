import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${process.env.NEXT_PUBLIC_URL}/verification-email?token=${token}`;

  try {
    await resend.emails.send({
      from: "amigo-secreto@nayr.dev",
      to: email,
      subject: "Confirme seu email para acessar o Amigo Secreto",
      html: `
        <h1>Bem-vindo ao Amigo Secreto!</h1>
        <p>Clique no link abaixo para confirmar seu email:</p>
        <a href="${confirmLink}">Confirmar Email</a>
      `,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Erro ao enviar email:", error);
      return { error: "Falha ao enviar o email de verificação." };
    }
  }
};
