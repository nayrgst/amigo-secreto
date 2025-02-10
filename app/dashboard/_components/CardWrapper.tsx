"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { NewGroupHeader } from "@/app/dashboard/_components/NewGroupHeader";
import { Separator } from "@/components/ui/separator";
import { SendButton } from "./SendButton";
import { ReactNode } from "react";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel?: string;
  className?: string;
  title?: ReactNode;
  addParticipant?: () => void;
  pending?: boolean;
  label?: ReactNode;
  label2?: ReactNode;
  showFooter?: boolean;
  classTitle?: string;
  classHeader?: string;
}

export const CardWrapper = ({
  children,
  headerLabel,
  className,
  title,
  addParticipant,
  pending,
  label,
  label2,
  showFooter,
  classTitle,
  classHeader,
}: CardWrapperProps) => {
  return (
    <Card className={className}>
      <CardHeader className={classHeader}>
        <NewGroupHeader
          label={headerLabel}
          title={title}
          classTitle={classTitle}
        />
      </CardHeader>

      <CardContent className="space-y-4">{children}</CardContent>

      {showFooter && (
        <>
          <Separator className="my-4" />

          <CardFooter className="flex w-full flex-col md:flex-row justify-between space-y-4 md:space-y-0">
            <SendButton
              label={label}
              label2={label2}
              addParticipant={addParticipant}
              pending={pending}
            />
          </CardFooter>
        </>
      )}
    </Card>
  );
};
