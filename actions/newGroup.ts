"use server";

import _ from "lodash";
import { z } from "zod";
import { Resend } from "resend";

import { db } from "@/lib/db";
import { newGroupSchema } from "@/schemas/newGroupSchema";
import { getServerSession } from "@/lib/getServerSession";

interface AssignedParticipant {
  id: string;
  email: string;
  name: string;
  assignedToId: string;
}

export type NewGroupResponse =
  | {
      success: true;
      message: string;
      groupId: string;
    }
  | {
      success: false;
      message: string;
    };

const sendEmailToParticipants = async (
  participants: AssignedParticipant[],
  groupName: string,
) => {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    await Promise.all(
      participants.map((participant) => {
        const assignedParticipant = participants.find(
          (p) => p.id === participant.assignedToId,
        );

        return resend.emails.send({
          from: "amigo-secreto@nayr.dev",
          to: participant.email,
          subject: `Sorteio de amigo secreto - ${groupName}`,
          html: `<p>Você está participando do amigo secreto do "${groupName}". <br /> <br />
          O seu amigo secreto é <strong>${assignedParticipant?.name}</strong>!</p>`,
        });
      }),
    );

    return { error: null };
  } catch {
    return { error: "Ocorreu um erro ao enviar os emails." };
  }
};

export const newGroup = async (
  values: z.infer<typeof newGroupSchema>,
): Promise<NewGroupResponse> => {
  try {
    const validateFields = newGroupSchema.safeParse(values);
    if (!validateFields.success) {
      return { success: false, message: "Dados inválidos!" };
    }
    const { groupName, participants } = validateFields.data;

    const user = await getServerSession();

    if (!user) {
      return { success: false, message: "Usuário não autenticado!" };
    }

    const newGroup = await db.group.create({
      data: {
        name: groupName,
        ownerId: user.id,
      },
      include: { participants: true },
    });

    await db.participant.createMany({
      data: participants.map((participant) => ({
        name: participant.name,
        email: participant.email,
        groupId: newGroup.id,
      })),
      skipDuplicates: true,
    });

    const createdParticipants = await db.participant.findMany({
      where: { groupId: newGroup.id },
    });

    if (createdParticipants.length < 3) {
      return {
        success: false,
        message:
          "É necessário pelo menos 3 participantes para realizar o sorteio.",
      };
    }

    const shuffledParticipants = _.shuffle(createdParticipants);
    const participantsWithAssignment = shuffledParticipants.map(
      (participant, index) => {
        const assignedTo =
          shuffledParticipants[(index + 1) % shuffledParticipants.length];
        return { ...participant, assignedToId: assignedTo.id };
      },
    );

    await db.$transaction(
      participantsWithAssignment.map((participant) =>
        db.participant.update({
          where: { id: participant.id },
          data: { assignedToId: participant.assignedToId },
        }),
      ),
    );

    const emailResult = await sendEmailToParticipants(
      participantsWithAssignment,
      groupName,
    );
    if (emailResult.error) {
      return {
        success: false,
        message: emailResult.error,
      };
    }

    return {
      success: true,
      message: "Grupo e sorteio realizados com sucesso!",
      groupId: newGroup.id,
    };
  } catch (error) {
    console.error("Erro ao criar grupo:", error);
    return {
      success: false,
      message: "Erro ao criar o grupo, tente novamente!",
    };
  }
};
