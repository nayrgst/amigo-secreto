import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
  id: string;
  email: string;
};

type AuthState = {
  user: User | null;
  setUser: (user: User | null) => void;
  fetchUser: () => Promise<void>;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      fetchUser: async () => {
        try {
          const response = await fetch("/api/auth/user");
          const data = await response.json();

          if (response.ok && data.user) {
            set({ user: data.user });
          } else {
            set({ user: null });
          }
        } catch (error) {
          if (error instanceof Error) {
            console.error("Error ao buscar usuario", error.message);
          }
          set({ user: null });
        }
      },
    }),
    {
      name: "auth-storage",
    },
  ),
);
