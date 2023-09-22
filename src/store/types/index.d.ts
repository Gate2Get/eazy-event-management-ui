import {
  ActionType,
  AlertType,
  ContactListType,
  EventFilterType,
  EventType,
  ScreenType,
  TemplateType,
} from "./../../types";
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
  screen: ScreenType;
  currentPage: string;
  alerts: AlertType[];
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  setAlerts: (alerts: AlertType[]) => void;
  setCurrentPage: (currentPage: string) => void;
  setScreen: (screen: ScreenType) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: boolean) => void;
};

export type ContactStoreType = {
  directoryList: ContactDirectoryType[];
  contactList: ContactListType[];
  selectedDirectory: ContactDirectoryType;
  action: ActionType;
  isListView: boolean;
  setAction: (action: ActionType) => void;
  setContactList: (contactList: ContactListType[]) => void;
  setIsListView: (isListView: boolean) => void;
  setDirectoryList: (directoryList: ContactDirectoryType[]) => void;
  setSelectedDirectory: (selectedDirectory: ContactDirectoryType) => void;
};

export type EventStoreType = {
  events: EventType[];
  filters: EventFilterType;
  selectedEvents: EventType;
  action: ActionType;
  eventType: string;
  setAction: (action: ActionType) => void;
  setSelectedEvents: (selectedEvents: EventType) => void;
  setEventType: (eventType: string) => void;
  setEvents: (events: EventType[]) => void;
  setFilters: (filters: EventFilterType) => void;
};

export type TemplateStoreType = {
  templates: TemplateType[];
  selectedTemplate: TemplateType;
  action: ActionType;
  isListView: boolean;
  setAction: (action: ActionType) => void;
  setIsListView: (isListView: boolean) => void;
  setTemplates: (templates: TemplateType[]) => void;
  setSelectedTemplate: (selectedTemplate: TemplateType) => void;
};

export type DashboardStoreType = {
  recentEvent: EventType;
  calendarEvents: EventType[];
  selectedEvent: EventType;
  chartSelectionEventId: string;
  setChartSelectionEventId: (chartSelectionEventId: string) => void;
  setSelectedEvent: (selectedEvent: EventType) => void;
  setRecentEvent: (recentEvent: EventType) => void;
  setCalendarEvents: (calendarEvents: EventType[]) => void;
};

export type BearStoreType = {
  userStore: UseBoundStore<StoreApi<UserType>>;
  appStore: UseBoundStore<StoreApi<AppStoreType>>;
  contactStore: UseBoundStore<StoreApi<ContactStoreType>>;
  templateStore: UseBoundStore<StoreApi<TemplateStoreType>>;
  dashboardStore: UseBoundStore<StoreApi<DashboardStoreType>>;
  eventStore: UseBoundStore<StoreApi<EventStoreType>>;
};
