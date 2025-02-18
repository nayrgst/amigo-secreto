import { Header } from "@/components/Header";

interface DashboardLayoutProps {
  children: React.ReactNode;
}
const layoutDashboard = async ({ children }: DashboardLayoutProps) => {
  return (
    <section>
      <Header />
      {children}
    </section>
  );
};
export default layoutDashboard;
