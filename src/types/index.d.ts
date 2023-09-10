import { MenuProps } from "antd";

export type ContactListType = {
  key?: string;
  _id: string;
  name: string;
  mobile: number;
  createdAt: string;
  updatedAt: string;
};

export type GenericJsonType = Record<string, any>;

export type ActionType = "VIEW" | "ADD" | "EDIT" | "DELETE" | "";

export type ScreenType = "MOBILE" | "TABLET" | "DESKTOP" | "";

export type EditConfigType = {
  text?: string;
  editing?: boolean;
  icon?: React.ReactNode;
  tooltip?: boolean | React.ReactNode;
  onStart?: () => void;
  onChange?: (value: string) => void;
  onCancel?: () => void;
  onEnd?: () => void;
  maxLength?: number;
  autoSize?: boolean;
  triggerType?: ("icon" | "text")[];
  enterIcon?: React.ReactNode;
};

export type UserInfoType = {
  mobile?: number;
  gender?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  state?: string;
  city?: string;
};

export type ContactDirectoryType = {
  _id?: string;
  userId?: number;
  name: string;
  contacts: ContactsType[];
  createdAt?: string;
  updatedAt?: string;
};

export type TemplateType = {
  _id?: string;
  userId?: number;
  name: string;
  type?: string;
  message: string;
  channel?: string;
  createdAt?: string;
  updatedAt?: string;
};

export enum Events {
  MARRIAGE = "MARRIAGE",
  BIRTHDAY = "BIRTHDAY",
  OTHERS = "OTHERS",
}

export enum Channels {
  SMS = "SMS",
  WHATSAPP = "WHATSAPP",
  VOICE_CALL = "VOICE_CALL",
}

export enum EventStatus {
  COMPLETED = "COMPLETED",
  IN_PROGRESS = "IN_PROGRESS",
  NOT_STARTED = "NOT_STARTED",
  DRAFT = "DRAFT",
}

export type EventType = {
  _id: string;
  name: string;
  userId: number;
  type: Events;
  groomName?: string;
  brideName?: string;
  reminder?: string;
  startDateTime: string;
  endDateTime: string;
  channel?: Channels;
  personName?: string;
  location?: string;
  contactDirectory: string;
  messageTemplate: string;
  locationUrl?: string;
  isTrigger?: boolean;
  status?: EventStatus;
  triggerDateTime?: Date;
  notificationStartDateTime?: Date;
  notificationEndDateTime?: Date;
  createdAt?: string;
  updatedAt?: string;
};

export type CardType = {
  menuItems: MenuProps["items"];
};

export type EventCardType = EventType & CardType;
