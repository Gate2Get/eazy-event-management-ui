import { create } from "zustand";
import { Events } from "../types";
import { EventStoreType } from "./types";

export const initialSelectedEvent = {
  id: "",
  userId: "",
  contactDirectory: [],
  endDateTime: "",
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
  myInvitations: [],
  selectedInvitation: {
    ...initialSelectedEvent,
    invitedByInfo: {},
  },
  isListView: false,
  isEdit: false,
  eventAlbums: [],
  setEventAlbums: (eventAlbums) => {
    set((state) => ({ eventAlbums }));
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
