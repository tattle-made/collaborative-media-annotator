import create from "zustand";
import { persist } from "zustand/middleware";

export const useStore = create(
  persist(
    (set, get) => ({
      users: [],
      currentUser: undefined,
      setUsers: (users) => set((state) => ({ users })),
      setCurrentUser: (user) => set((state) => ({ currentUser: user })),
      resetUser: () => set((state) => ({ users: [] })),
    }),
    {
      name: "chippi-storage",
    }
  )
);

export const ustStore = create();
