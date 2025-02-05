import { redirect } from "next/navigation";

import { Header } from "@/components/Header";
import { createClient } from "@/utils/supabase/server";

interface DashboardLayoutProps {
  children: React.ReactNode;
}
const layoutDashboard = async ({ children }: DashboardLayoutProps) => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <section>
      <Header />
      {children}
    </section>
  );
};
export default layoutDashboard;
