import { create } from "zustand";
import {
  ActionType,
  ContactDirectoryType,
  ContactListType,
  Events,
  GenericJsonType,
} from "../types";
import { ContactStoreType, EventStoreType } from "./types";

const initialSelectedEvent = {
  id: "",
  userId: 0,
  contactDirectory: "",
  endDateTime: "",
  messageTemplate: "",
  name: "",
  startDateTime: "",
  type: "OTHERS" as Events,
};

export const createEventStore = create<EventStoreType>((set) => ({
  action: "",
  events: [],
  eventType: "",
  filters: {
    type: undefined,
    status: undefined,
  },
  selectedEvents: initialSelectedEvent,
  setAction: (action) => {
    set((state) => ({ action }));
  },
  setEvents: (events) => {
    set((state) => ({ events }));
  },
  setEventType: (eventType) => {
    set((state) => ({ eventType }));
  },
  setFilters: (filters) => {
    set((state) => ({ filters }));
  },
  setSelectedEvents: (selectedEvents) => {
    set((state) => ({ selectedEvents }));
  },
}));
