import { GroupDetails } from "@/app/dashboard/_components/GroupDetails";

const GroupIdPage = async ({
  params,
}: {
  params: { id: string } | Promise<{ id: string }>;
}) => {
  const resolveParams = await params;
  return (
    <section className="container mx-auto py-6">
      <GroupDetails groupId={resolveParams.id} />
    </section>
  );
};

export default GroupIdPage;
