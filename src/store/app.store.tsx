import { create } from "zustand";
import { AppStoreType } from "./types";

export const createAppStore = create<AppStoreType>((set) => ({
  isLoading: false,
  isError: false,
  setError: (isError) => {
    set((state) => ({ isError }));
  },
  setLoading: (isLoading: boolean) => {
    set((state: AppStoreType) => ({ isLoading }));
  },
}));
