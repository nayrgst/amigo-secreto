"use client";
import { useSession } from "@/hook/useSession";
import { redirect } from "next/navigation";

export default function Home() {
  useSession();
  return redirect("/login");
}
