import { CircleCheckIcon } from "lucide-react";

interface FormSucessProps {
  message?: string;
}

export const FormSuccess = ({ message }: FormSucessProps) => {
  if (!message) return null;

  return (
    <section className="flex bg-emerald-500/15 p-3 rounded-md text-sm text-emerald-500 items-center gap-x-2">
      <CircleCheckIcon className="h-4 w-4" />
      <p>{message}</p>
    </section>
  );
};
