import { create } from "zustand";
import {
  ActionType,
  ContactDirectoryType,
  ContactListType,
  GenericJsonType,
  TemplateType,
} from "../types";
import { TemplateStoreType } from "./types";

const initialSelectedTemplate = {
  createdAt: "",
  id: "",
  name: "",
  updatedAt: "",
  type: "",
  message: "",
};

export const createTemplateStore = create<TemplateStoreType>((set) => ({
  templates: [],
  selectedTemplate: initialSelectedTemplate,
  action: "",
  isListView: false,
  setAction: (action: ActionType) => {
    set((state) => {
      const storeValue: GenericJsonType = { action };
      if (!action) {
        storeValue.selectedDirectory = initialSelectedTemplate;
      }
      return { ...storeValue };
    });
  },
  setIsListView: (isListView: boolean) => {
    set((state) => ({ isListView }));
  },
  setTemplates: (templates: TemplateType[]) => {
    set((state) => ({ templates }));
  },
  setSelectedTemplate: (selectedTemplate: TemplateType) => {
    set((state) => ({ selectedTemplate }));
  },
}));
