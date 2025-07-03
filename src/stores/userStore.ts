import { create } from "zustand"

import { io } from "socket.io-client";



interface User {
  email: string
}

interface UserState {
  user: User | null
  setUser: (user: User) => void
  clearUser: () => void
}

const socket = io('http://localhost:3000');

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => {
    localStorage.removeItem("user");
    socket.disconnect(); // 👈 MUY IMPORTANTE
    set({ user: null });
  },
}));
