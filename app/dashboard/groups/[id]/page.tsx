import { GroupDetails } from "@/app/dashboard/_components/GroupDetails";

type Params = Promise<{ id: string }>;

const GroupIdPage = async ({ params }: { params: Params }) => {
  const resolveParams = await params;
  return (
    <section className="container mx-auto py-6">
      <GroupDetails groupId={resolveParams.id} />
    </section>
  );
};

export default GroupIdPage;
