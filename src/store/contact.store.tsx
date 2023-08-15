import { create } from "zustand";
import { ActionType, ContactDirectoryType, GenericJsonType } from "../types";
import { ContactStoreType } from "./types";

const initialSelectedDirectory = {
  createdAt: "",
  id: "",
  name: "",
  updatedAt: "",
  noOfContacts: 0,
};

export const createContactStore = create<ContactStoreType>((set) => ({
  directoryList: [],
  selectedDirectory: initialSelectedDirectory,
  action: "",
  isListView: false,
  setAction: (action: ActionType) => {
    set((state) => {
      const storeValue: GenericJsonType = { action };
      if (!action) {
        storeValue.selectedDirectory = initialSelectedDirectory;
      }
      return { ...storeValue };
    });
  },
  setIsListView: (isListView: boolean) => {
    set((state) => ({ isListView }));
  },
  setDirectoryList: (directoryList: ContactDirectoryType[]) => {
    set((state) => ({ directoryList }));
  },
  setSelectedDirectory: (selectedDirectory: ContactDirectoryType) => {
    set((state) => ({ selectedDirectory }));
  },
}));
