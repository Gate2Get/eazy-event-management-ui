import { MenuProps } from "antd";

export type ContactListType = {
  key?: string;
  id: string;
  name: string;
  senderId: number | string;
  image?: string;
  status?: number;
  createdAt?: string;
  updatedAt?: string;
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
  picture?: string;
  isEmailVerified?: boolean;
  isMobileVerified?: boolean;
  profileImage?: string;
  roles?: string | string[];
};

export type ContactDirectoryType = {
  id?: string;
  userId?: number;
  name: string;
  image?: string;
  noOfContacts?: number;
  contacts?: ContactListType[];
  createdAt?: string;
  updatedAt?: string;
};

export type TemplateType = {
  id?: string;
  userId?: number;
  name: string;
  type?: string;
  message: string;
  blob?: string;
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
  id: string;
  name: string;
  userId: string;
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
  failed?: number;
  success?: number;
  progress?: number;
  isEditable?: boolean;
  isDeleteAllowed?: boolean;
};

export type CardType = {
  menuItems?: MenuProps["items"];
  isEdit?: boolean;
  onSelect?: () => void;
};

export type EventCardType = EventType & CardType;

export type EventFilterType = {
  type?: string;
  status?: string;
  id?: string;
  fromDate?: string;
  toDate?: string;
};

export type AlertType = {
  isActive: boolean;
  text: string;
  props: Object;
  createdAt?: string;
  updatedAt?: string;
};

export type ReportBugsType = {
  id?: number;
  userId: number;
  topic: string;
  information: string;
  attachment?: string;
  resolutionNotes?: string;
  status?: string;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export type VoiceMessageTemplateType = {
  id: string;
  type: string;
  value: string;
};

export type DebounceFnType = {
  cancel?: () => void;
};

export type SessionType = {
  userId?: String;
  sessionId?: String;
  metaData?: String;
  createdAt?: Date;
  expiryAt?: Date;
  isCurrent?: boolean;
};

type QuestionType = {
  question: string;
  answer: string;
};

export type FeedbackType = {
  userId?: string;
  questions: QuestionType[];
  comments: string;
};

export type EventAdminType = {
  id: string;
  approvalStatus: string;
  price: number;
};
