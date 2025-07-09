import { create } from "zustand"

interface User {
  id: string
  UserId?: number;
  email: string
}

interface UserState {
  user: User | null
  setUser: (user: User | null) => void
  clearUser: () => void
}

export const useUserStore = create<UserState>((set) => {
  let storedUser = null;
  if (typeof window !== "undefined") {
    try {
      const saved = localStorage.getItem("user");
      if (saved) storedUser = JSON.parse(saved);
    } catch (err) {
      console.error("Error leyendo usuario desde localStorage:", err);
    }
  }

  return {
    user: storedUser,
    setUser: (user) => {
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(user));
      }
      set({ user });
    },
    clearUser: () => {
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
      }
      set({ user: null });
    },
  };
});