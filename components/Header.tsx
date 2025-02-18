import Link from "next/link";
import { Gift, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import ModeToggle from "@/components/ToggleMode";

export const Header = () => {
  return (
    <header className="border-b">
      <section className="container mx-auto p-4">
        <section className="flex justify-between items-center">
          <Link href="/" className="flex items-center text-2xl font-bold gap-2">
            <Gift className="text-yellow-500 h-6 w-6" />
            <span>
              Amigo
              <span className="font-thin">Secreto</span>
            </span>
          </Link>

          <nav className="flex items-center space-x-4">
            <Button variant={"ghost"}>
              <Link
                href="/dashboard/groups"
                className="flex gap-2 items-center text-foreground text-sm"
              >
                <Users className="size-5" />
                Meus Grupos
              </Link>
            </Button>
            <Button asChild variant={"outline"}>
              <Link href={"/dashboard/groups/new"}>Novo grupo</Link>
            </Button>
            <ModeToggle />
          </nav>
        </section>
      </section>
    </header>
  );
};
