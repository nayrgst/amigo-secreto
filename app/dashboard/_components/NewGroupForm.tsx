"use client";

import { z } from "zod";
import { toast } from "sonner";
import { useForm, useFieldArray } from "react-hook-form";
import { useEffect, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, Mail, Trash2, User, Users } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { newGroup } from "@/actions/newGroup";
import { CardWrapper } from "@/app/dashboard/_components/CardWrapper";
import { newGroupSchema } from "@/schemas/newGroupSchema";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAuthStore } from "@/stores/auth-store";

const NEW_GROUP_DEFAULT_VALUES = (defaultEmail = "") => {
  return {
    groupName: "",
    participants: [{ name: "", email: defaultEmail }],
  };
};

export const NewGroupForm = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { user, fetchUser } = useAuthStore();

  const form = useForm<z.infer<typeof newGroupSchema>>({
    resolver: zodResolver(newGroupSchema),
    defaultValues: NEW_GROUP_DEFAULT_VALUES(),
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "participants",
  });

  const addParticipant = () => {
    append({ name: "", email: "" });
  };

  const removeParticipant = (index: number) => {
    remove(index);
  };

  const onSubmit = async (values: z.infer<typeof newGroupSchema>) => {
    startTransition(() => {
      newGroup(values).then((data) => {
        if (data.success) {
          toast.success(data.message);
          router.push(`/dashboard/groups/${data.groupId}`);
        } else {
          toast.error(data.message);
        }
        form.reset(NEW_GROUP_DEFAULT_VALUES(user?.email || ""));
      });
    });
  };

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    if (user) {
      form.reset(NEW_GROUP_DEFAULT_VALUES(user.email));
    }
  }, [form, user]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardWrapper
          showFooter
          title="Novo Grupo"
          classTitle="text-3xl font-semibold"
          headerLabel="Convide seus amigos para participar!"
          className="w-full max-w-2xl mx-auto"
          addParticipant={addParticipant}
          pending={!!isPending}
          label={"Adicionar amigo"}
          label2={
            <>
              {isPending && <Loader className="animate-spin mr-2" />}
              Enviar convites
            </>
          }
        >
          <section className="space-y-2">
            <FormField
              control={form.control}
              name="groupName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Grupo:</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-muted-foreground" />
                      <Input
                        type="text"
                        className="pl-10"
                        placeholder="Nome do Grupo"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>

          <h2 className="!mt-12 mb-5 text-2xl font-semibold">Participantes:</h2>
          {fields.map((item, index) => (
            <section
              key={index}
              className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4"
            >
              <section className="flex-grow space-y-2 w-full">
                <FormField
                  control={form.control}
                  name={`participants.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome:</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-muted-foreground" />
                          <Input
                            type="text"
                            placeholder="João Mateus Thiago Gustavo"
                            className="pl-10"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <div className="min-h-[40px]">
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </section>

              <section className="flex-grow space-y-2 w-full">
                <FormField
                  control={form.control}
                  name={`participants.${index}.email`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email:</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-muted-foreground" />
                          <Input
                            type="email"
                            placeholder="exemplo@gmail.com"
                            className="pl-10 read-only:text-muted-foreground read-only:focus-visible:ring-0 read-only:focus-visible:ring-offset-0"
                            readOnly={item.email === user?.email}
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <div className="min-h-[40px]">
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </section>
              <section>
                <Button
                  type="button"
                  variant={"outline"}
                  size={"icon"}
                  className="-translate-y-2"
                  onClick={() => removeParticipant(index)}
                >
                  <Trash2 className="size-5" />
                </Button>
              </section>
            </section>
          ))}
        </CardWrapper>
      </form>
    </Form>
  );
};
