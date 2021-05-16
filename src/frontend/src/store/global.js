import create from "zustand";

export const useStore = create((set) => ({
  users: [],
  currentUser: undefined,
  setUsers: (users) => set((state) => ({ users })),
  setCurrentUser: (user) => set((state) => ({ currentUser: user })),
  resetUser: () => set((state) => ({ users: [] })),
}));
