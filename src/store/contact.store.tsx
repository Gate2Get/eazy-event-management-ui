import { create } from "zustand";
import {
  ActionType,
  ContactDirectoryType,
  ContactListType,
  GenericJsonType,
} from "../types";
import { ContactStoreType } from "./types";

const initialSelectedDirectory = {
  createdAt: "",
  id: "",
  name: "",
  updatedAt: "",
  noOfContacts: 0,
  contacts: [],
};

export const createContactStore = create<ContactStoreType>((set) => ({
  directoryList: [],
  contactList: [],
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
  setContactList: (contactList: ContactListType[]) => {
    set((state) => ({ contactList }));
  },
  setSelectedDirectory: (selectedDirectory: ContactDirectoryType) => {
    set((state) => ({ selectedDirectory }));
  },
}));
