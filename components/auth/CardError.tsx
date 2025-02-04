import { ShieldX } from "lucide-react";
import { CardWrapper } from "@/components/auth/CardWrapper";

export const CardError = () => {
  return (
    <CardWrapper
      headerLabel="Ops!! Algo deu errado."
      backButtonLabel="Voltar para tela de login!"
      backButtonHref="/login"
      className="h-screen flex justify-center items-center"
    >
      <section className="w-full flex justify-center items-center">
        <ShieldX className="size-20 text-red-600" />
      </section>
    </CardWrapper>
  );
};
