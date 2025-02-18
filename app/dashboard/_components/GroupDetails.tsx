import { AlertCircle } from "lucide-react";

import { db } from "@/lib/db";
import { Separator } from "@/components/ui/separator";
import { getServerSession } from "@/lib/getServerSession";
import { CardWrapper } from "@/app/dashboard/_components/CardWrapper";
import { ParticipantsTable } from "@/app/dashboard/_components/ParticipantsTable";
import { SecretFriendCard } from "@/app/dashboard/_components/SecretFriendCard";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface GroupDetailsProps {
  groupId: string;
}

export const GroupDetails = async ({ groupId }: GroupDetailsProps) => {
  const user = await getServerSession();

  if (!user) {
    <Alert variant="destructive">
      <AlertCircle className="size-4" />
      <AlertTitle>Erro</AlertTitle>
      <AlertDescription>
        Você não está autenticado. Tente novamente!
      </AlertDescription>
    </Alert>;
  }

  const group = await db.group.findUnique({
    where: { id: groupId },
    include: { participants: true },
  });

  if (!group) {
    <Alert variant="destructive">
      <AlertCircle className="size-4" />
      <AlertTitle>Erro</AlertTitle>
      <AlertDescription>
        Grupo não encontrado. Tente novamente!
      </AlertDescription>
    </Alert>;
    return null;
  }

  const assignedParticipantId = group.participants.find(
    (p) => p.email === user?.email,
  )?.assignedToId;

  const assignedParticipant = group.participants.find(
    (p) => p.id === assignedParticipantId,
  );

  return (
    <CardWrapper
      className="w-full max-w-3xl mx-auto"
      classTitle="text-2xl"
      title={
        <>
          Grupo:{" "}
          <span className="font-light underline decoration-yellow-500">
            {group.name}
          </span>
        </>
      }
      headerLabel="Informações do grupo e dos participantes."
    >
      <h2 className="text-xl font-semibold mb-4">Participantes:</h2>

      <ParticipantsTable participants={group.participants} />

      <Separator className="my-6" />

      <div className="flex justify-center">
        <SecretFriendCard friendName={assignedParticipant?.name} />
      </div>
    </CardWrapper>
  );
};
