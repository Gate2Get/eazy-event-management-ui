import { create } from "zustand";
import { AlertType } from "../types";
import { type UserType } from "./types";

export const createUserStore = create<UserType>((set) => ({
  name: "",
  email: "",
  mobile: 0,
  isAuthorized: null,
  setUser: (user: UserType) => {
    set((state: UserType) => ({ ...user }));
  },
}));
