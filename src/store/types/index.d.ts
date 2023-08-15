import { type UseBoundStore, type StoreApi } from "zustand";
import { ContactDirectoryType } from "../../types";

export type UserType = {
  name: string;
  email: string;
  mobile: number;
  isAuthorized: boolean | null | undefined;
  setUser: (user: UserType) => void;
};

export type AppStoreType = {
  isLoading: boolean;
  isError: boolean;
  setLoading: (isLoading: boolean) => void;
  setError: (error: boolean) => void;
};

export type ContactStoreType = {
  directoryList: ContactDirectoryType[];
  selectedDirectory: ContactDirectoryType;
  setDirectoryList: (directoryList: ContactDirectoryType[]) => void;
  setSelectedDirectory: (selectedDirectory: ContactDirectoryType) => void;
};

export type BearStoreType = {
  userStore: UseBoundStore<StoreApi<UserType>>;
  appStore: UseBoundStore<StoreApi<AppStoreType>>;
  contactStore: UseBoundStore<StoreApi<ContactStoreType>>;
};
