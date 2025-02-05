import { LoginForm } from "@/components/auth/LoginForm";
import ModeToggle from "@/components/ToggleMode";

const LoginPage = () => {
  return (
    <>
      <header className="border-b p-2 flex justify-end">
        <ModeToggle />
      </header>
      <section className="flex h-screen w-full items-center justify-center px-4">
        <LoginForm />
      </section>
    </>
  );
};
export default LoginPage;
