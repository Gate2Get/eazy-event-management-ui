import { create } from "zustand";
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
