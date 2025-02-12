import { LoginForm } from "@/components/auth/LoginForm";
import ModeToggle from "@/components/ToggleMode";
import { Gift } from "lucide-react";

const LoginPage = () => {
  return (
    <>
      <header className="border-b">
        <section className="container mx-auto p-4">
          <section className="flex items-center">
            <div className="flex items-center justify-center text-2xl font-bold gap-2">
              <Gift className="text-yellow-500 h-6 w-6" />
              <span>
                Amigo
                <span className="font-thin">Secreto</span>
              </span>
            </div>
            <section className="flex justify-end w-full">
              <ModeToggle />
            </section>
          </section>
        </section>
      </header>
      <section className="flex h-screen w-full items-center justify-center px-4">
        <LoginForm />
      </section>
    </>
  );
};
export default LoginPage;
