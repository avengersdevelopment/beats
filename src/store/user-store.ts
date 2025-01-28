import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserStore {
  result: string | null;
  setResult: (user: string | null) => void;
  userId: string | null;
  setUserId: (userId: string) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      result: null,
      userId: null,
      setResult: (result) => set({ result }),
      setUserId: (userId) => set({ userId }),
    }),
    {
      name: "user-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    },
  ),
);
