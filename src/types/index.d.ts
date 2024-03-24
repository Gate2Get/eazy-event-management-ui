import { FormInstance, MenuProps } from "antd";
import { UploadChangeParam, UploadFile } from "antd/es/upload";
import { EVENT_STATUS } from "../constants";

export type ContactListType = {
  key?: string;
  id: string;
  name: string;
  senderId: number | string;
  image?: string;
  status?: number;
  action?: ActionType;
  createdAt?: string;
  updatedAt?: string;
};

export type GenericJsonType = Record<string, any>;

export type ActionType = "VIEW" | "ADD" | "EDIT" | "DELETE" | "SEND" | "";

export type ScreenType = "MOBILE" | "TABLET" | "DESKTOP" | "";

export enum WalletTransactionType {
  CREDIT = "credit",
  DEBIT = "debit",
}

export enum WalletTransactionPaymentType {
  ONLINE = "online",
  OFFLINE = "offline",
}

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
  userId?: string;
  picture?: string;
  isEmailVerified?: boolean;
  isMobileVerified?: boolean;
  profileImage?: string;
  roles?: string | string[];
  walletBalance?: number;
  walletIsActive?: boolean;
  walletIsTrial?: boolean;
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

export const enum APPROVAL_STATUS {
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  PENDING_APPROVAL = "PENDING_APPROVAL",
  ON_HOLD = "ON_HOLD",
}
export type CommentsType = {
  _id: string;
  comment: string;
  userId: string;
  updatedAt: string;
};

export type TemplateType = {
  id: string;
  name: string;
  type?: string;
  userId?: string;
  message: any;
  blob?: string;
  approvalStatus?: APPROVAL_STATUS;
  channel?: string;
  createdAt?: string;
  updatedAt?: string;
  comments?: CommentsType[];
};

export type ReviewConversationType = {
  comments?: CommentsType[];
  loggedInUserId?: string;
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
  videoUrl?: string;
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

export type TemplateFilterType = {
  _id?: string;
  channel?: string;
  name?: string;
  approvalStatus?: APPROVAL_STATUS;
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
  updatedAt?: Date;
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

export type TemplateAdminType = {
  id: string;
  approvalStatus?: string;
  comment: string;
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
  getTemplates: (filter?: Record<string, string>) => void;
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
  notificationStartDateTime?: string;
  notificationEndDateTime?: string;
  createdAt?: string;
  updatedAt?: string;
  notStarted?: number;
  failed?: number;
  success?: number;
  progress?: number;
  status?: string;
  price?: number;
  isEditAllowed?: boolean;
  isDeleteAllowed?: boolean;
};

export type EventNotificationCardType = {
  isEdit?: boolean;
  contactList: ContactDirectoryType[];
  templates: TemplateType[];
  isTemplateFetching?: boolean;
  isContactFetching?: boolean;
  onSearchTemplate: (template: string) => void;
  onSearchContact: (contact: string) => void;
  getContactDirectory: () => void;
  getTemplates: (filter?: Record<string, string>) => void;
  onCancelEdit?: () => void;
  handleSubmit?: (values?: any) => void;
  viewNotification?: () => void;
  sendNotification?: () => void;
  action?: ActionType;
} & EventNotificationType;

export type VirtualLoadQueryType = {
  offset?: number;
  limit?: number;
};

export type WalletType = {
  userId: string;
  amount: number;
  type: WalletTransactionType;
  transactionId: string;
  paymentType: WalletTransactionPaymentType;
  paymentBy?: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type ContactUsType = {
  name: string;
  email: string;
  mobile: number;
  notes: string;
  isActive?: boolean;
};

export type DateFilterType = {
  month: string;
  year: number;
};

export type PricingPlanType = {
  id: string;
  name: string;
  type: string;
  albumCount: number;
  eventCount: number;
  contactDirectoryCount: number;
  contactCount: number;
  templateCount: number;
  notificationCredit: number;
  price: number;
  whatsAppPrice: number;
  smsPrice: number;
  voiceCallPrice: number;
  isActive: boolean;
  validity: number;
  createdAt: string;
  updatedAt: string;
};

export type UserPricingPlanType = {
  id: string;
  planId: string;
  userId: string;
  albumCount: number;
  eventCount: number;
  contactDirectoryCount: number;
  templateCount: number;
  notificationCredit: number;
  isActive: boolean;
  expiryAt: string;
  createdAt: string;
  updatedAt: string;
  pricingPlan: PricingPlanType;
};

export type ServiceTransactionLogsType = {
  id?: number;
  transactionId?: string;
  transactionType?: string;
  userId?: String;
  userPlanId?: string;
  createdAt?: Date;
  updatedAt?: Date;
};
