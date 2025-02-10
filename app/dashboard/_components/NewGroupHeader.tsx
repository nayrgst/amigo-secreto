import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

interface NewGroupHeaderProps {
  label?: string;
  title?: ReactNode;
  classTitle?: string;
}

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export const NewGroupHeader = ({
  label,
  title,
  classTitle,
}: NewGroupHeaderProps) => {
  return (
    <section className="flex w-full flex-col items-center justify-center gap-y-4">
      <CardTitle className={(cn(font.className), classTitle)}>
        {title}
      </CardTitle>
      <CardDescription className="text-muted-foreground text-sm">
        {label}
      </CardDescription>
    </section>
  );
};
