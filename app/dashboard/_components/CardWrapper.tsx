"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { SendButton } from "@/app/dashboard/_components/SendButton";
import { NewGroupHeader } from "./NewGroupHeader";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  className?: string;
  title?: string;
  addParticipant?: () => void;
  sendButtonClick?: () => void;
}

export const CardWrapper = ({
  children,
  headerLabel,
  className,
  title,
  addParticipant,
  sendButtonClick,
}: CardWrapperProps) => {
  return (
    <Card className={cn("flex shadow-md", className)}>
      <section className="w-full p-6">
        <CardHeader>
          <NewGroupHeader label={headerLabel} title={title} />
        </CardHeader>

        <CardContent>{children}</CardContent>

        <Separator className="my-4" />

        <CardFooter className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0">
          <SendButton
            addParticipant={addParticipant}
            sendButtonClick={sendButtonClick}
          />
        </CardFooter>
      </section>
    </Card>
  );
};
