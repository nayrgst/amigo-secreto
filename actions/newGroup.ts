"use server";

import { redirect } from "next/navigation";
import _ from "lodash";

import { createClient } from "@/utils/supabase/server";

export type newGroupState = {
  success: boolean | null;
  message?: string;
};

type drawGroupProps = {
  id: string;
  group_id: string;
  name: string;
  email: string;
  assigned_to: string;
  created_at: string;
  updated_at: string;
};

const drawGroup = (participants: drawGroupProps[]) => {
  if (participants.length < 2) {
    return {
      success: false,
      message:
        "É necessário pelo menos 2 participantes para realizar o sorteio.",
    };
  }

  const shuffledParticipants = _.shuffle(participants);

  return shuffledParticipants.map((participant, index) => {
    const assignedParticipant =
      shuffledParticipants[(index + 1) % shuffledParticipants.length];

    return {
      ...participant,
      assigned_to: assignedParticipant.id,
    };
  });
};

export const newGroup = async (
  _previousState: newGroupState,
  formData: FormData,
) => {
  const supabase = await createClient();

  const { data: authUser, error: authError } = await supabase.auth.getUser();

  if (authError) {
    return {
      success: false,
      message: "Ocorreu um erro ao criar o grupo!",
    };
  }

  const names = formData.getAll("name");
  const emails = formData.getAll("email");
  const groupName = formData.get("groupName");

  const { data: createGroup, error: groupError } = await supabase
    .from("groups")
    .insert({ name: groupName, owner_id: authUser?.user.id })
    .select()
    .single();
  if (groupError) {
    return {
      success: false,
      message: "Ocorreu um erro ao criar o grupo! Tente novamente mais tarde.",
    };
  }

  const participants = names.map((name, index) => ({
    name,
    email: emails[index],
    group_id: createGroup.id,
  }));

  const { data: createParticipants, error: createParticipantsError } =
    await supabase.from("participants").insert(participants).select();

  if (createParticipantsError) {
    return {
      success: false,
      message:
        "Ocorreu um erro ao adicionar os participantes ao grupo! Tente novamente mais tarde.",
    };
  }

  const drawedParticipants = drawGroup(createParticipants);

  const { error: errorDrawn } = await supabase
    .from("participants")
    .upsert(drawedParticipants);

  if (errorDrawn) {
    return {
      success: false,
      message:
        "Ocorreu um erro ao sortear os participantes do grupo! Tente novamente mais tarde.",
    };
  }

  redirect(`/dashboard/groups/${createGroup.id}`);
};
