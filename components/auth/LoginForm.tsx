"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { Loader, Mail, MessageCircle, MessageCircleX } from "lucide-react";

import { login } from "@/actions/login";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginSchema } from "@/schemas/loginSchema";
import { CardWrapper } from "@/components/auth/CardWrapper";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export const LoginForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "" },
    mode: "onChange",
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      login(values).then((data) => {
        if (data?.error) {
          setError(data.error);
        } else if (data?.success) {
          setSuccess(data.success);
        } else if (data?.redirect) {
          router.push("/dashboard");
        }
      });
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardWrapper
          headerLabel="Digite seu e-mail para receber o link para entrar."
          className="mx-auto max-w-sm flex-col"
          backButtonHref=""
          title="ENTRAR"
        >
          <section className="grid gap-8">
            <section className="grid gap-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email:</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          {...field}
                          placeholder="exemplo@exemplo.com"
                          className="pl-10"
                          type="email"
                          disabled={isPending}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </section>

            {success && (
              <Alert className="text-muted-foreground">
                <MessageCircle className="!text-green-500 h-4 w-4" />
                <AlertTitle className="text-gray-300">
                  E-mail enviado!
                </AlertTitle>
                <AlertDescription>
                  Acesse seu e-mail e verifique sua caixa de entrada ou spam
                  para fazer login.
                </AlertDescription>
              </Alert>
            )}

            {error && (
              <Alert className="text-muted-foreground">
                <MessageCircleX className="!text-red-600 h-4 w-4" />
                <AlertTitle className="text-gray-300">
                  Falha ao enviar e-mail.
                </AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? (
                <span className="flex items-center gap-x-1">
                  ENTRAR
                  <Loader className="h-4 w-4 animate-spin" />
                </span>
              ) : (
                "ENTRAR"
              )}
            </Button>
          </section>
        </CardWrapper>
      </form>
    </Form>
  );
};
