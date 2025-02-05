import { redirect } from "next/navigation";

export default async function dashboardPage() {
  return redirect("/dashboard/groups");
}
