import { create } from "zustand";
import { AlertType } from "../types";
import { type UserType } from "./types";

export const createUserStore = create<UserType>((set) => ({
  user: {},
  isAuthorized: null,
  setUser: (user) => {
    set((state) => ({ user }));
  },
  setIsAuthorized: (isAuthorized) => {
    set((state) => ({ isAuthorized }));
  },
  sessions: [],
  setSession: (sessions) => {
    set((state) => ({ sessions }));
  },
}));
