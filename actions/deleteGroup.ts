"use server";

import { db } from "@/lib/db";
import { getServerSession } from "@/lib/getServerSession";

export const deleteGroup = async (groupId: string) => {
  try {
    const user = await getServerSession();

    if (!user) {
      return { success: false, message: "Não autorizado!" };
    }

    const group = await db.group.findUnique({
      where: { id: groupId },
      select: { ownerId: true },
    });

    if (!group || group.ownerId !== user.id) {
      return {
        success: false,
        message: "Você não tem permissão para excluir este grupo!",
      };
    }

    await db.group.delete({ where: { id: groupId } });

    return { success: true, message: "Grupo deletado com sucesso!" };
  } catch (error) {
    console.error("Erro ao excluir grupo", error);
    return {
      success: false,
      message: "Erro ao excluir o grupo, tente novamente!",
    };
  }
};
