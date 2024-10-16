import {
  ActionType,
  AlertType,
  ContactListType,
  EventFilterType,
  EventType,
  MyInvitationType,
  ScreenType,
  TemplateFilterType,
  TemplateType,
  UserInfoType,
  AttachmentType,
  WalletType,
  EventNotificationType,
  SessionType,
  UserPricingPlanType,
  EventTypeType,
  ApplicationModuleType,
} from "./../../types";
import { type UseBoundStore, type StoreApi } from "zustand";
import { ContactDirectoryType, GenericJsonType } from "../../types";
import { MessageInstance } from "antd/es/message/interface";

export type UserType = {
  user: UserInfoType;
  isAuthorized: boolean | null | undefined;
  isVerificationOpen: boolean;
  isContactToken: boolean | null | undefined;
  activePlan?: UserPricingPlanType;
  setIsVerificationOpen: (isVerificationOpen: boolean) => void;
  setUser: (user: UserInfoType) => void;
  setIsAuthorized: (isAuthorized: boolean) => void;
  setIsContactToken: (isContactToken: boolean) => void;
  sessions: SessionType[];
  setSession: (sessions: SessionType[]) => void;
  walletTransaction: WalletType[];
  setWalletTransaction: (walletTransaction: WalletType[]) => void;
  setActivePlan: (activePlan: UserPricingPlanType) => void;
};

export type AppStoreType = {
  isLoading: boolean;
  isError: boolean;
  screen: ScreenType;
  currentPage: string;
  alerts: AlertType[];
  collapsed: boolean;
  snackbar?: MessageInstance;
  moduleAccess: ApplicationModuleType[];
  setModuleAccess: (moduleAccess: ApplicationModuleType[]) => void;
  setSnackbar: (snackbar: MessageInstance) => void;
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
  selectedInvitation: MyInvitationType;
  myInvitations: MyInvitationType[];
  isListView: boolean;
  isEdit: boolean;
  eventAlbums: AttachmentType[];
  eventTypes: EventTypeType[];
  setEventAlbums: (eventAlbums: AttachmentType[]) => void;
  setIsListView: (isListView: boolean) => void;
  setIsEdit: (isEdit: boolean) => void;
  setSelectedInvitation: (selectedInvitation: MyInvitationType) => void;
  setMyInvitations: (myInvitations: MyInvitationType[]) => void;
  setAction: (action: ActionType) => void;
  setSelectedEvents: (selectedEvents: EventType) => void;
  setEventType: (eventType?: string) => void;
  setEvents: (events: EventType[]) => void;
  setFilters: (filters: EventFilterType) => void;
  setEventTypes: (eventTypes: EventTypeType[]) => void;
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
  upcomingEvents: EventType[];
  transactionalEvents: EventType[];
  calendarEvents: EventType[];
  selectedEvent: EventType;
  chartSelectionEventId: string;
  statistics: GenericJsonType;
  eventNotifications: EventNotificationType[];
  selectedEventNotification: EventNotificationType;
  todaysInvitations: MyInvitationType[];
  setTodaysInvitations: (todaysInvitations: MyInvitationType[]) => void;
  setSelectedEventNotification: (
    selectedEventNotification: EventNotificationType
  ) => void;
  setEventNotifications: (eventNotifications: EventNotificationType[]) => void;
  setStatistics: (statistics: GenericJsonType) => void;
  setChartSelectionEventId: (chartSelectionEventId: string) => void;
  setSelectedEvent: (selectedEvent: EventType) => void;
  setRecentEvent: (recentEvent: EventType) => void;
  setCalendarEvents: (calendarEvents: EventType[]) => void;
  setUpcomingEvents: (upcomingEvents: EventType[]) => void;
  setTransactionalEvents: (transactionalEvents: EventType[]) => void;
};

export type BearStoreType = {
  userStore: UseBoundStore<StoreApi<UserType>>;
  appStore: UseBoundStore<StoreApi<AppStoreType>>;
  contactStore: UseBoundStore<StoreApi<ContactStoreType>>;
  templateStore: UseBoundStore<StoreApi<TemplateStoreType>>;
  dashboardStore: UseBoundStore<StoreApi<DashboardStoreType>>;
  eventStore: UseBoundStore<StoreApi<EventStoreType>>;
};
