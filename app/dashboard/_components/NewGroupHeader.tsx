import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import { CardDescription, CardTitle } from "@/components/ui/card";

interface NewGroupHeaderProps {
  label: string;
  title?: string;
}

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export const NewGroupHeader = ({ label, title }: NewGroupHeaderProps) => {
  return (
    <section className="flex w-full flex-col items-center justify-center gap-y-4">
      <CardTitle className={cn("text-3xl font-semibold", font.className)}>
        {title}
      </CardTitle>
      <CardDescription className="text-muted-foreground text-sm">
        {label}
      </CardDescription>
    </section>
  );
};
