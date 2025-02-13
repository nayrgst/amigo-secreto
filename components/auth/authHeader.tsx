import { Gift } from "lucide-react";

import ModeToggle from "@/components/ToggleMode";
import Link from "next/link";

export const AuthHeader = () => {
  return (
    <>
      <header className="border-b">
        <section className="container mx-auto p-4">
          <section className="flex items-center">
            <Link
              href={"/"}
              className="flex items-center justify-center text-2xl font-bold gap-2"
            >
              <Gift className="text-yellow-500 h-6 w-6" />
              <span>
                Amigo
                <span className="font-thin">Secreto</span>
              </span>
            </Link>
            <section className="flex justify-end w-full">
              <ModeToggle />
            </section>
          </section>
        </section>
      </header>
    </>
  );
};
