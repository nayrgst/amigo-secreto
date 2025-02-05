"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Mail, Trash2, User, Users } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { CardWrapper } from "@/app/dashboard/_components/CardWrapper";
import { newGroupSchema } from "@/schemas/newGroupSchema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface ParticipantsProps {
  name: string;
  email: string;
}

export const NewGroupForm = ({
  loggedUser,
}: {
  loggedUser: { id: string; email: string };
}) => {
  const [participants, setParticipants] = useState<ParticipantsProps[]>([
    { name: "", email: loggedUser.email },
  ]);

  const [groupName, setGroupName] = useState("");

  const form = useForm<z.infer<typeof newGroupSchema>>({
    resolver: zodResolver(newGroupSchema),
    defaultValues: {
      email: loggedUser.email,
      name: "",
      groupName: "",
    },
    mode: "onChange",
  });

  const updateParticipant = (
    index: number,
    field: keyof ParticipantsProps,
    value: string,
  ) => {
    const updatedParticipant = [...participants];
    updatedParticipant[index][field] = value;
    setParticipants(updatedParticipant);
  };

  const removeParticipant = (index: number) => {
    setParticipants(participants.filter((_, i) => i !== index));
  };

  const addParticipant = () => {
    setParticipants(participants.concat({ name: "", email: "" }));
  };

  return (
    <>
      <CardWrapper
        title="Novo Grupo"
        headerLabel="Convide seus amigos para participar!"
        className="w-full max-w-2xl mx-auto"
        addParticipant={addParticipant}
      >
        <Form {...form}>
          <form action={() => {}}>
            <section className="space-y-4">
              <FormField
                control={form.control}
                name="groupName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="groupName">Nome do Grupo:</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          {...field}
                          id="groupName"
                          name="groupName"
                          value={groupName}
                          className="pl-10"
                          onChange={(event) => setGroupName(event.target.value)}
                          placeholder="Nome do Grupo"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </section>

            <h2 className="!mt-12 mb-5 text-2xl font-semibold">
              Participantes:
            </h2>
            {participants.map((participant, index) => (
              <section
                key={index}
                className="flex flex-col md:flex-row items-end space-y-4 md:space-y-0 md:space-x-4"
              >
                <section className="flex-grow space-y-2 w-full">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor={`Nome ${index}`}>Nome:</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              {...field}
                              id={`Nome ${index}`}
                              name="name"
                              value={participant.name}
                              placeholder="João Vitor Thiago Gustavo"
                              className="pl-10"
                              onChange={(event) => {
                                updateParticipant(
                                  index,
                                  "name",
                                  event.target.value,
                                );
                              }}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </section>

                <section className="flex-grow space-y-2 w-full">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor={`Email ${index}`}>Email:</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              {...field}
                              id={`Email ${index}`}
                              name="Email"
                              type="email"
                              placeholder="exemplo@gmail.com"
                              value={participant.email}
                              className="readonly: text-muted-foreground pl-10"
                              readOnly={participant.email === loggedUser.email}
                              onChange={(event) => {
                                updateParticipant(
                                  index,
                                  "email",
                                  event.target.value,
                                );
                              }}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </section>

                <section className="min-w-9">
                  {participants.length > 1 &&
                    participant.email !== loggedUser.email && (
                      <Button
                        type="button"
                        variant={"outline"}
                        size={"icon"}
                        onClick={() => {
                          removeParticipant(index);
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                </section>
              </section>
            ))}
          </form>
        </Form>
      </CardWrapper>
    </>
  );
};
