import { NewGroupForm } from "@/app/dashboard/_components/NewGroupForm";
import { createClient } from "@/utils/supabase/server";

const newGroupsPage = async () => {
  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();

  const loggedUser = {
    id: data?.user?.id as string,
    email: data?.user?.email as string,
  };

  return (
    <section className="mt-20">
      <NewGroupForm loggedUser={loggedUser} />
    </section>
  );
};
export default newGroupsPage;
