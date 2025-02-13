import { NewGroupForm } from "@/app/dashboard/_components/NewGroupForm";

const newGroupsPage = async () => {
  const loggedUser = {
    id: "123",
    email: "tee@example.com",
  };

  return (
    <section className="mt-20">
      <NewGroupForm loggedUser={loggedUser} />
    </section>
  );
};
export default newGroupsPage;
