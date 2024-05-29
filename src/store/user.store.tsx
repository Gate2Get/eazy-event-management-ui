import { create } from "zustand";
import { AlertType } from "../types";
import { type UserType } from "./types";

export const createUserStore = create<UserType>((set) => ({
  user: {},
  isAuthorized: null,
  isContactToken: null,
  walletTransaction: [],
  isVerificationOpen: false,
  activePlan: undefined,
  setIsVerificationOpen: (isVerificationOpen) => {
    set((state) => ({ isVerificationOpen }));
  },
  setUser: (user) => {
    set((state) => ({ user }));
  },
  setIsAuthorized: (isAuthorized) => {
    set((state) => ({ isAuthorized }));
  },
  setIsContactToken: (isContactToken) => {
    set((state) => ({ isContactToken }));
  },
  sessions: [],
  setSession: (sessions) => {
    set((state) => ({ sessions }));
  },
  setWalletTransaction: (walletTransaction) => {
    set((state) => ({ walletTransaction }));
  },
  setActivePlan: (activePlan) => {
    set((state) => ({ activePlan }));
  },
}));
