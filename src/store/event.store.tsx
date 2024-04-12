import { create } from "zustand";
import { EventStoreType } from "./types";

export const initialSelectedEvent = {
  id: "",
  userId: "",
  contactDirectory: [],
  endDateTime: "",
  name: "",
  startDateTime: "",
  type: "",
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
  myInvitations: [],
  selectedInvitation: {
    ...initialSelectedEvent,
    invitedByInfo: {},
  },
  eventTypes: [],
  isListView: false,
  isEdit: false,
  eventAlbums: [],
  setEventAlbums: (eventAlbums) => {
    set((state) => ({ eventAlbums }));
  },
  setEventTypes: (eventTypes) => {
    set((state) => ({ eventTypes }));
  },
  setIsEdit: (isEdit: boolean) => {
    set((state) => ({ isEdit }));
  },
  setIsListView: (isListView: boolean) => {
    set((state) => ({ isListView }));
  },
  setSelectedInvitation: (selectedInvitation) => {
    set((state) => ({ selectedInvitation }));
  },
  setMyInvitations: (myInvitations) => {
    set((state) => ({ myInvitations }));
  },
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
