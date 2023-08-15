import { create } from "zustand";
import { ContactDirectoryType } from "../types";
import { ContactStoreType } from "./types";

export const createContactStore = create<ContactStoreType>((set) => ({
  directoryList: [],
  selectedDirectory: {
    createdAt: "",
    id: "",
    name: "",
    updatedAt: "",
    noOfContacts: 0,
  },
  setDirectoryList: (directoryList: ContactDirectoryType[]) => {
    set((state) => ({ directoryList }));
  },
  setSelectedDirectory: (selectedDirectory: ContactDirectoryType) => {
    set((state) => ({ selectedDirectory }));
  },
}));
