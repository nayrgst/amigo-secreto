"use client";

import dynamic from "next/dynamic";

interface SecretFriendCardProps {
  friendName: string | undefined;
}

const TextRevealCard = dynamic(
  () => import("@/components/ui/text-reveal").then((mod) => mod.TextRevealCard),
  { ssr: false },
);
const TextRevealCardTitle = dynamic(
  () =>
    import("@/components/ui/text-reveal").then(
      (mod) => mod.TextRevealCardTitle,
    ),
  { ssr: false },
);
export const SecretFriendCard = ({ friendName }: SecretFriendCardProps) => {
  return (
    <TextRevealCard
      text="Toque para revelar"
      revealText={friendName || "??? 🤣"}
      className="text-center"
    >
      <TextRevealCardTitle className="text-center">
        Seu Amigo Secreto:
      </TextRevealCardTitle>
    </TextRevealCard>
  );
};
