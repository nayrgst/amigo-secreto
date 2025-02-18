import { Suspense } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { CardVerification } from "@/components/auth/CardVerification";

const VerificationEmailPage = () => {
  return (
    <Suspense fallback={<Skeleton />}>
      <section className="flex h-screen w-full items-center justify-center px-4">
        <CardVerification />
      </section>
    </Suspense>
  );
};
export default VerificationEmailPage;
