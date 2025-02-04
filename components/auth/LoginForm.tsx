"use client";

import { useActionState } from "react";
import { Loader, MessageCircle, MessageCircleX } from "lucide-react";

import { CardWrapper } from "@/components/auth/CardWrapper";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { login, LoginState } from "@/actions/login";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export const LoginForm = () => {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(
    login,
    {
      success: null,
      message: "",
    },
  );
  return (
    <CardWrapper
      headerLabel="Digite seu e-mail para receber o link para entrar."
      className="mx-auto max-w-sm flex-col"
      backButtonHref=""
      title="ENTRAR"
    >
      <form action={formAction}>
        <section className="grid gap-8">
          <section className="grid gap-2">
            <Label htmlFor="email">E-mail:</Label>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="exemplo@gmail.com"
              required
            />
          </section>

          {state.success === true && (
            <Alert className="text-muted-foreground">
              <MessageCircle className="!text-green-500 h-4 w-4" />
              <AlertTitle className="text-gray-300">E-mail enviado!</AlertTitle>
              <AlertDescription>
                Acesse seu e-mail e verifique sua caixa de entrada ou spam para
                fazer login.
              </AlertDescription>
            </Alert>
          )}

          {state.success === false && (
            <Alert className="text-muted-foreground">
              <MessageCircleX className="!text-red-600 h-4 w-4" />
              <AlertTitle className="text-gray-300">
                Falha ao enviar e-mail.
              </AlertTitle>
              <AlertDescription>{state.message}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? (
              <span className="flex items-center gap-x-1">
                ENTRAR
                <Loader className="h-4 w-4 animate-spin" />
              </span>
            ) : (
              "ENTRAR"
            )}
          </Button>
        </section>
      </form>
    </CardWrapper>
  );
};
