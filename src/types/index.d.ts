import { FormInstance, MenuProps } from "antd";
import { UploadChangeParam, UploadFile } from "antd/es/upload";

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

export type AttachmentType = {
  id: string;
  url: string;
  name: string;
};

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
  district?: string;
  pinCode?: number;
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

type TemplateActionType = {
  speechStatus?: {
    id: string;
    status: string;
  };
  playSpeech?: (text: string, id: string) => void;
  stopSpeech?: () => void;
  resumeSpeech?: () => void;
  pauseSpeech?: () => void;
};

export type TemplatePreviewType = TemplateType & TemplateActionType;

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
  id?: string;
  name?: string;
  userId?: string;
  type?: Events;
  groomName?: string;
  brideName?: string;
  startDateTime?: string;
  endDateTime?: string;
  personName?: string;
  location?: string;
  contactDirectory?: string[];
  locationUrl?: string;
  isTrigger?: boolean;
  status?: EventStatus;
  invitationEnableDateTime?: string;
  isAlbumEnable?: boolean;
  isVideoEnable?: boolean;
  isPostEnable?: boolean;
  isEditable?: boolean;
  isDeleteAllowed?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  invitationAttachment?: AttachmentType[];
  notification?: EventNotificationType[];
};

export type CardType = {
  menuItems?: MenuProps["items"];
  isEdit?: boolean;
  setPreviewOpen?: () => void;
  onSelect?: () => void;
};

export type EventCardType = EventType & CardType;

type MyInvitationInvitedByInfoType = {
  invitedByInfo: UserInfoType;
};

export type MyInvitationType = EventType & MyInvitationInvitedByInfoType;

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

export type UserLocationType = {
  officename: string;
  pincode: string;
  officetype: string;
  deliverystatus: string;
  divisionname: string;
  regionname: string;
  circlename: string;
  taluk: string;
  districtname: string;
  statename: string;
};

export type EventManagementType = {
  contactList: ContactDirectoryType[];
  templates: TemplateType[];
  onHandleEvent: (event: EventType) => void;
  handleUpdateEventNotification?: (event: EventType) => void;
  isEdit?: boolean;
  onSearchTemplate: (template: string) => void;
  form: FormInstance;
  isTemplateFetching?: boolean;
  isContactFetching?: boolean;
  onSearchContact: (contact: string) => void;
  getContactDirectory: () => void;
  getTemplates: () => void;
  handleFileUpload?: (e: UploadChangeParam<UploadFile<any>>) => void;
  action?: ActionType;
};

export type EventNotificationType = {
  id?: string;
  name: string;
  contactDirectory: string[];
  messageTemplate: string;
  triggerDateTime?: string;
  channel?: string;
  action?: ActionType;
  notificationStartDateTime?: Date;
  notificationEndDateTime?: Date;
  createdAt?: string;
  updatedAt?: string;
  failed?: number;
  success?: number;
  progress?: number;
  isEditAllowed?: boolean;
};

export type EventNotificationCardType = {
  isEdit?: boolean;
  contactList: ContactDirectoryType[];
  templates: TemplateType[];
  onSearchTemplate: (template: string) => void;
  isTemplateFetching?: boolean;
  isContactFetching?: boolean;
  onSearchContact: (contact: string) => void;
  getContactDirectory: () => void;
  getTemplates: () => void;
  onCancelEdit?: () => void;
  handleSubmit?: (values?: any) => void;
} & EventNotificationType;
