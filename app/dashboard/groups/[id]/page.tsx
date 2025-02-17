// import { createClient } from "@/utils/supabase/server";
import { CardWrapper } from "@/app/dashboard/_components/CardWrapper";
import { Separator } from "@/components/ui/separator";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
import {
  TextRevealCard,
  TextRevealCardTitle,
} from "@/components/ui/text-reveal";

const GroupIdPage = async ({ params }: { params: { id: string } }) => {
  // const supabase = await createClient();
  // const { data: authUser } = await supabase.auth.getUser();

  // const groupId = (await params).id;

  // const { data, error } = await supabase
  //   .from("groups")
  //   .select(`name, participants (*)`)
  //   .eq("id", groupId)
  //   .single();

  // if (error) {
  //   return <p>Erro ao carregar o grupo!</p>;
  // }

  // const assignedParticipantId = data?.participants?.find(
  //   (p) => authUser?.user?.email === p.email,
  // )?.assigned_to;

  // const assignedParticipant = data.participants.find(
  //   (p) => p.id === assignedParticipantId,
  // );

  return (
    <section className="container mx-auto py-6">
      <CardWrapper
        className="w-full max-w-3xl mx-auto"
        classTitle="text 2xl"
        title={
          <>
            Grupo:{" "}
            <span className=" font-light underline decoration-yellow-500">
              {/* {data.name} */}
            </span>
          </>
        }
        headerLabel="Informações do grupo e dos participantes."
      >
        <h2 className="text-xl font-semibold mb-4 ">Participantes:</h2>

        {/* <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome:</TableHead>
              <TableHead>Email:</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.participants.map((participant) => (
              <TableRow key={participant.id}>
                <TableCell>{participant.name}</TableCell>
                <TableCell>{participant.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table> */}

        <Separator className="my-6" />

        <TextRevealCard
          text="Toque para revelar!"
          // revealText={assignedParticipant?.name}
          revealText={"jones"}
        >
          <TextRevealCardTitle>Seu amigo secreto:</TextRevealCardTitle>
        </TextRevealCard>
      </CardWrapper>
    </section>
  );
};

export default GroupIdPage;
