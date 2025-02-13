// import Link from "next/link";
// import { Calendar } from "lucide-react";

import { ScrollArea } from "@/components/ui/scroll-area";
// import { CardWrapper } from "@/app/dashboard/_components/CardWrapper";

const GroupPage = async () => {
  // const { data: authUser } = await supabase.auth.getUser();

  // if (!authUser?.user?.email) {
  //   return <p>Usuário não autenticado!</p>;
  // }

  // const { data, error } = await supabase
  //   .from("groups")
  //   .select(
  //     `
  //     id,
  //     name,
  //     owner_id,
  //     created_at,
  //     participants!inner(email)
  //     `,
  //   )
  //   .eq("participants.email", authUser.user.email);

  // console.log("Dados retornados:", data);
  // console.log("Erro:", error);

  // if (error) {
  //   return <p>Erro ao carregar os grupos: {error.message}</p>;
  // }

  // if (!data || data.length === 0) {
  //   return <p>Nenhum grupo encontrado para este usuário.</p>;
  // }

  return (
    <section className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Meus Grupos</h1>

      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* {data.map((group) => (
            <Link
              key={group.id}
              href={`/dashboard/groups/${group.id}`}
              className="cursor-pointer"
            >
              <CardWrapper
                title={group.name}
                classHeader={"pb-2"}
                className={"overflow-hidden"}
              >
                <div className="flex items-center text-muted-foreground text-sm mb-2">
                  <Calendar className="h-4 w-4 mr-2" />
                  Criado em: {new Date(group.created_at).toLocaleDateString()}
                </div>
              </CardWrapper>
            </Link>
          ))} */}
        </div>
      </ScrollArea>
    </section>
  );
};

export default GroupPage;
