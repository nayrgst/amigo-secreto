"use client";

import { SendHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";

interface SendButtonProps {
  addParticipant?: () => void;
  sendButtonClick?: () => void;
}

export const SendButton = ({
  addParticipant,
  sendButtonClick,
}: SendButtonProps) => {
  return (
    <>
      <Button
        type="button"
        variant={"outline"}
        className="w-full md:w-auto"
        onClick={addParticipant}
      >
        Adicionar amigo
      </Button>

      <Button
        type="submit"
        className="flex items-center space-x-2 w-full md:w-auto"
        onClick={sendButtonClick}
      >
        <SendHorizontal className="w-4 h-4" /> Criar Grupo
      </Button>
    </>
  );
};
