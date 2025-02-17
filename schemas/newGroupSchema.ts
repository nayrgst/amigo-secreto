import { z } from "zod";

export const newGroupSchema = z.object({
  groupName: z
    .string()
    .nonempty("Preencha o campo Nome do Grupo!")
    .min(3, "O campo Nome do Grupo deve ter pelo menos 3 caracteres!"),
  participants: z.array(
    z.object({
      name: z.string().nonempty("Preencha o campo Nome!").min(1),
      email: z
        .string()
        .nonempty("Preencha o campo Email!")
        .min(1)
        .email("Preencha um email valido!")
        .max(333, "o Email não pode ter mais de 333 caracteres!"),
    }),
  ),
});
