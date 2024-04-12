import { create } from "zustand";
import { DashboardStoreType } from "./types";

export const createDashboardStore = create<DashboardStoreType>((set) => ({
  recentEvent: {
    id: "",
    contactDirectory: [],
    endDateTime: "",
    messageTemplate: "",
    name: "",
    startDateTime: "",
    type: "",
    userId: "",
  },
  selectedEvent: {
    id: "",
    contactDirectory: [],
    endDateTime: "",
    messageTemplate: "",
    name: "",
    startDateTime: "",
    type: "",
    userId: "",
  },
  upcomingEvents: [],
  todaysInvitations: [],
  transactionalEvents: [],
  statistics: {},
  chartSelectionEventId: "",
  selectedEventNotification: {
    contactDirectory: [],
    messageTemplate: "",
    name: "",
  },
  eventNotifications: [],
  setTodaysInvitations: (todaysInvitations) => {
    set((state) => ({ todaysInvitations }));
  },
  setEventNotifications: (eventNotifications) => {
    set((state) => ({ eventNotifications }));
  },
  setSelectedEventNotification: (selectedEventNotification) => {
    set((state) => ({ selectedEventNotification }));
  },
  setStatistics: (statistics) => {
    set((state) => ({ statistics }));
  },
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
  setTransactionalEvents(transactionalEvents) {
    set((state) => ({ transactionalEvents }));
  },
  setUpcomingEvents(upcomingEvents) {
    set((state) => ({ upcomingEvents }));
  },
}));
