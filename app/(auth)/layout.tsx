import { AuthHeader } from "@/components/auth/authHeader";

interface AuthLayoutProps {
  children: React.ReactNode;
}
const layoutAuth = async ({ children }: AuthLayoutProps) => {
  return (
    <section>
      <AuthHeader />
      {children}
    </section>
  );
};
export default layoutAuth;
