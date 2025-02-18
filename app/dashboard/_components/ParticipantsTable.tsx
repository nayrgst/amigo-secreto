import _ from "lodash";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ParticipantsTableProps {
  participants: { id: string; name: string; email: string }[];
}

export const ParticipantsTable = ({ participants }: ParticipantsTableProps) => {
  const drawnParticipants = _.shuffle(participants);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome:</TableHead>
          <TableHead>Email:</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {drawnParticipants.map((participant) => (
          <TableRow key={participant.id}>
            <TableCell>{participant.name}</TableCell>
            <TableCell>{participant.email}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
