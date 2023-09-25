import { create } from "zustand";
import { EVENT_TYPES } from "../constants";
import { Events } from "../types";
import { DashboardStoreType } from "./types";

export const createDashboardStore = create<DashboardStoreType>((set) => ({
  recentEvent: {
    id: "",
    contactDirectory: "",
    endDateTime: "",
    messageTemplate: "",
    name: "",
    startDateTime: "",
    type: EVENT_TYPES.OTHERS as Events,
    userId: 0,
  },
  selectedEvent: {
    id: "",
    contactDirectory: "",
    endDateTime: "",
    messageTemplate: "",
    name: "",
    startDateTime: "",
    type: EVENT_TYPES.OTHERS as Events,
    userId: 0,
  },
  chartSelectionEventId: "",
  setChartSelectionEventId: (chartSelectionEventId) => {
    set((state) => ({ chartSelectionEventId }));
  },
  setSelectedEvent: (selectedEvent) => {
    set((state) => ({ selectedEvent }));
  },
  setRecentEvent: (recentEvent) => {
    set((state) => ({ recentEvent }));
  },
  calendarEvents: [],
  setCalendarEvents: (calendarEvents) => {
    set((state) => ({ calendarEvents }));
  },
}));
