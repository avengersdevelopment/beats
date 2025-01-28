import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface ResultStore {
  result: string | null;
  setResult: (user: string | null) => void;
}

export const useResultStore = create<ResultStore>()(
  persist(
    (set) => ({
      result: null,
      setResult: (result) => set({ result }),
    }),
    {
      name: "result-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    },
  ),
);
