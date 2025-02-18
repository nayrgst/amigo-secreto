import { AlertCircle } from "lucide-react";

import { db } from "@/lib/db";
import { GroupsList } from "@/app/dashboard/_components/GroupsList";
import { getServerSession } from "@/lib/getServerSession";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const GroupPage = async () => {
  const user = await getServerSession();

  if (!user) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="size-4" />
        <AlertTitle>Erro</AlertTitle>
        <AlertDescription>
          Você não está autenticado. Tente novamente!
        </AlertDescription>
      </Alert>
    );
  }

  const groups = await db.group.findMany({
    where: {
      participants: {
        some: {
          email: user.email,
        },
      },
    },
    orderBy: { createdAt: "desc" },
    include: { participants: true },
  });

  if (!groups || groups.length === 0) {
    return (
      <Alert variant="default">
        <AlertCircle className="size-4" />
        <AlertTitle>Nenhum grupo encontrado.</AlertTitle>
        <AlertDescription>
          Crie um novo grupo ou entre em um existente.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <section className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Meus Grupos</h1>
      <GroupsList groups={groups} />
    </section>
  );
};

export default GroupPage;
