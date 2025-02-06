"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LoginHeader } from "@/components/auth/LoginHeader";
import { BackButton } from "@/components/auth/BackButton";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  className?: string;
  backButtonLabel?: string;
  backButtonHref: string;
  title?: string;
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  className,
  title,
}: CardWrapperProps) => {
  return (
    <Card className={cn("flex shadow-md", className)}>
      <section className="w-full p-6">
        <CardHeader>
          <LoginHeader label={headerLabel} title={title} />
        </CardHeader>

        <CardContent>{children}</CardContent>

        <CardFooter>
          <BackButton label={backButtonLabel} href={backButtonHref} />
        </CardFooter>
      </section>
    </Card>
  );
};
