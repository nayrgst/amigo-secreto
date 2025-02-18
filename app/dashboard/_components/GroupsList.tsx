"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CardWrapper } from "@/app/dashboard/_components/CardWrapper";
import { ParticipantsTable } from "./ParticipantsTable";
import {
  Credenza,
  CredenzaContent,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaBody,
  CredenzaFooter,
} from "@/components/ui/credenza";

interface Group {
  id: string;
  name: string;
  createdAt: Date;
  participants: Array<{
    id: string;
    name: string;
    email: string;
    assignedToId: string | null;
  }>;
}

interface GroupsListProps {
  groups: Group[];
}

export const GroupsList = ({ groups }: GroupsListProps) => {
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleOpen = (group: Group) => {
    setSelectedGroup(group);
    setIsOpen(true);
  };

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <>
      <ScrollArea>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {loading
            ? Array.from({ length: 24 }).map((_, index) => (
                <Skeleton key={index} className="h-24 w-full rounded-lg" />
              ))
            : groups.map((group) => (
                <div
                  key={group.id}
                  onClick={() => handleOpen(group)}
                  className="cursor-pointer"
                >
                  <CardWrapper
                    title={group.name}
                    classHeader="pb-2"
                    className="overflow-hidden"
                  >
                    <div className="flex items-center text-muted-foreground text-sm mb-2">
                      <Calendar className="h-4 w-4 mr-2" />
                      Criado em:{" "}
                      {new Date(group.createdAt).toLocaleDateString()}
                    </div>
                  </CardWrapper>
                </div>
              ))}
        </div>
      </ScrollArea>

      <Credenza open={isOpen} onOpenChange={setIsOpen}>
        <CredenzaContent>
          <CredenzaHeader>
            <CredenzaTitle className="text-center">
              {
                <>
                  Grupo:{" "}
                  <span className="font-light underline decoration-yellow-500">
                    {selectedGroup?.name}
                  </span>
                </>
              }
            </CredenzaTitle>
          </CredenzaHeader>
          <CredenzaBody>
            <ParticipantsTable
              participants={selectedGroup?.participants ?? []}
            />
          </CredenzaBody>
          <CredenzaFooter>
            <Button
              variant="default"
              onClick={() =>
                router.push(`/dashboard/groups/${selectedGroup?.id}`)
              }
            >
              Ver mais
            </Button>
          </CredenzaFooter>
        </CredenzaContent>
      </Credenza>
    </>
  );
};
