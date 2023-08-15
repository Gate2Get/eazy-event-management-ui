export type ContactDirectoryType = {
  name: string;
  id: string;
  noOfContacts: number;
  createdAt: string;
  updatedAt: string;
};

export type GenericJsonType = Record<string, any>;

export type ActionType = "ADD" | "EDIT" | "";
