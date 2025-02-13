import { TriangleAlertIcon } from "lucide-react";

interface FormErrorsProps {
  message?: string;
}

export const FormError = ({ message }: FormErrorsProps) => {
  if (!message) return null;

  return (
    <section className="flex bg-red-600/35 p-3 rounded-md text-red-600 text-sm items-center gap-x-2">
      <TriangleAlertIcon className="h-4 w-4" />
      <p>{message}</p>
    </section>
  );
};
