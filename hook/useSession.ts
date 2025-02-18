"use client";

import { useEffect } from "react";

import { useAuthStore } from "@/stores/auth-store";

export function useSession() {
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    fetch("/api/auth/session")
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar sessão:", error);
      });
  }, [setUser]);
}
