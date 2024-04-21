import { create } from "zustand";
import { AppStoreType } from "./types";

export const createAppStore = create<AppStoreType>((set) => ({
  isLoading: false,
  isError: false,
  screen: "",
  currentPage: "",
  alerts: [],
  collapsed: false,
  snackbar: undefined,
  setSnackbar: (snackbar) => {
    set((state) => ({ snackbar }));
  },
  setCollapsed: (collapsed) => {
    set((state) => ({ collapsed }));
  },
  setAlerts: (alerts) => {
    set((state) => ({ alerts }));
  },
  setCurrentPage: (currentPage) => {
    set((state) => ({ currentPage }));
  },
  setScreen: (screen) => {
    set((state) => ({ screen }));
  },
  setError: (isError) => {
    set((state) => ({ isError }));
  },
  setLoading: (isLoading: boolean) => {
    set((state: AppStoreType) => ({ isLoading }));
  },
}));
