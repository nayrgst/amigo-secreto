import { z } from "zod";

export const newGroupSchema = z.object({
  name: z
    .string()
    .nonempty("Preencha o campo Nome!")
    .min(3, "O campo Nome deve ter pelo menos 3 caracteres!"),
  email: z
    .string()
    .nonempty("Preencha o campo Email!")
    .min(1)
    .email("Preencha um email valido!")
    .max(333, "o Email não pode ter mais de 333 caracteres!"),
  groupName: z
    .string()
    .nonempty("Preencha o nome do grupo")
    .min(3, "O campo Nome deve ter pelo menos 3 caracteres!"),
});
