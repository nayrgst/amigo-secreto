"use client";

import { useActionState, useEffect, useState } from "react";
import { Loader, Mail, Trash2, User, Users } from "lucide-react";

import { CardWrapper } from "@/app/dashboard/_components/CardWrapper";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { newGroup, newGroupState } from "@/actions/newGroup";
import { toast } from "sonner";

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
  const [state, formAction, pending] = useActionState<newGroupState, FormData>(
    newGroup,
    {
      success: null,
      message: "",
    },
  );

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

  useEffect(() => {
    if (state.success === false) {
      toast("❌ ERROR:", {
        description: state.message,
        position: "top-center",
      });
    }
  }, [state]);

  return (
    <form action={formAction}>
      <CardWrapper
        title="Novo Grupo"
        headerLabel="Convide seus amigos para participar!"
        className="w-full max-w-2xl mx-auto"
        addParticipant={addParticipant}
        pending={!!pending}
        label={"Adicionar amigo"}
        label2={
          <>
            {pending && <Loader className="animate-spin mr-2" />}
            Enviar convites
          </>
        }
      >
        <section className="space-y-2">
          <Label>Nome do Grupo:</Label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="groupName"
              name="groupName"
              value={groupName}
              className="pl-10"
              onChange={(event) => setGroupName(event.target.value)}
              placeholder="Nome do Grupo"
              required
            />
          </div>
        </section>

        <h2 className="!mt-12 mb-5 text-2xl font-semibold">Participantes:</h2>
        {participants.map((participant, index) => (
          <section
            key={index}
            className="flex flex-col md:flex-row items-end space-y-4 md:space-y-0 md:space-x-4"
          >
            <section className="flex-grow space-y-2 w-full mt-5">
              <Label htmlFor={`name-${index}`}>Nome:</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id={`name-${index}`}
                  name="name"
                  value={participant.name}
                  placeholder="João Vitor Thiago Gustavo"
                  className="pl-10"
                  required
                  onChange={(event) => {
                    updateParticipant(index, "name", event.target.value);
                  }}
                />
              </div>
            </section>

            <section className="flex-grow space-y-2 w-full">
              <Label htmlFor={`email-${index}`}>Email:</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id={`email-${index}`}
                  name="email"
                  type="email"
                  placeholder="exemplo@gmail.com"
                  value={participant.email}
                  className="pl-10 read-only:text-muted-foreground read-only:focus-visible:ring-0 read-only:focus-visible:ring-offset-0"
                  required
                  readOnly={participant.email === loggedUser.email}
                  onChange={(event) => {
                    updateParticipant(index, "email", event.target.value);
                  }}
                />
              </div>
            </section>

            <section className="min-w-9">
              <Button
                type="button"
                variant={"outline"}
                size={"icon"}
                disabled={participant.email === loggedUser.email}
                onClick={() => {
                  removeParticipant(index);
                }}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </section>
          </section>
        ))}
      </CardWrapper>
    </form>
  );
};
