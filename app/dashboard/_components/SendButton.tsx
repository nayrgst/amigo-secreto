"use client";

import { SendHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface SendButtonProps {
  addParticipant?: () => void;
  pending?: boolean;
  label?: ReactNode;
  label2?: ReactNode;
}

export const SendButton = ({
  addParticipant,
  pending,
  label,
  label2,
}: SendButtonProps) => {
  return (
    <>
      <Button
        type="button"
        variant={"outline"}
        className="w-full md:w-auto"
        onClick={addParticipant}
        disabled={pending}
      >
        {label}
      </Button>

      <Button
        type="submit"
        className="flex items-center space-x-2 w-full md:w-auto"
        disabled={pending}
        onClick={() => console.log("click")}
      >
        <SendHorizontal className="w-4 h-4" /> {label2}
      </Button>
    </>
  );
};
