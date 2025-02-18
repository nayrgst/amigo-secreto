"use client";

import { BeatLoader } from "react-spinners";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

import { CardWrapper } from "@/app/dashboard/_components/CardWrapper";
import { newVerification } from "@/actions/token";
import { FormError } from "../FormError";
import { FormSuccess } from "../FormSuccess";
import { Button } from "../ui/button";

export const CardVerification = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  const onSubmit = useCallback(() => {
    if (!token) {
      setError("Token inválido!");
      return;
    }

    newVerification(token)
      .then((data) => {
        setSuccess(data?.success);
        setError(data?.error);
      })
      .catch(() => {
        setError("Falha ao verificar o token!");
      });
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      title="Verificação"
      headerLabel="Verificando o seu email!"
      className="w-[400px]"
    >
      <section className="flex items-center flex-col gap-4 w-full justify-center">
        {!success && !error && <BeatLoader color="orange" />}
        <FormSuccess message={success} />
        <FormError message={error} />
        {success && (
          <>
            <Button onClick={() => router.push("/dashboard")}>Entrar</Button>
          </>
        )}
      </section>
    </CardWrapper>
  );
};
