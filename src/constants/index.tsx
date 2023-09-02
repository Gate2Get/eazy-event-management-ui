import {
  MessageOutlined,
  PhoneOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";

export const ROUTES_URL = {
  DASHBOARD: "/dashboard",
  SERVICE: "service",
  CONTACT_MANAGEMENT: "/contact-management",
  TEMPLATE_MANAGEMENT: "/template",
  EVENT_MANAGEMENT: "/event-management",
  GIFT_MANAGEMENT: "/gift-management",
  FEEDBACK: "/feedback",
  REPORT_BUG: "/report-bug",
  MY_PROFILE: "/my-profile",
  LOGIN: "/login",
  FORBIDDEN: "/forbidden",
};

export const ROUTES_MENU = {
  DASHBOARD: "Dashboard",
  SERVICE: "Service",
  CONTACT_MANAGEMENT: "Contact Management",
  EVENT_MANAGEMENT: "Event Management",
  GIFT_MANAGEMENT: "Gift Management",
  TEMPLATE_MANAGEMENT: "Template Management",
  FEEDBACK: "Feedback",
  REPORT_BUG: "Report Bug",
  MY_PROFILE: "My Profile",
};

export const MENU_OPEN_KEYS = [ROUTES_URL.SERVICE];

export const EVENT_STATUS = {
  APPROVED: "APPROVED",
  PENDING: "PENDING",
  REJECTED: "REJECTED",
  COMPLETED: "COMPLETED",
  IN_PROGRESS: "IN_PROGRESS",
  DRAFT: "DRAFT",
};

export const EVENT_STATUS_LABEL = {
  DRAFT: "Draft",
  IN_PROGRESS: "In progress",
  PENDING: "Pending approval",
  REJECTED: "Rejected",
  APPROVED: "Approved",
  COMPLETED: "Completed",
};

export const EVENT_STATUS_LABEL_COLOR = {
  [EVENT_STATUS_LABEL.DRAFT]: "default",
  [EVENT_STATUS_LABEL.IN_PROGRESS]: "processing",
  [EVENT_STATUS_LABEL.PENDING]: "processing",
  [EVENT_STATUS_LABEL.REJECTED]: "error",
  [EVENT_STATUS_LABEL.APPROVED]: "success",
  [EVENT_STATUS_LABEL.COMPLETED]: "success",
};

export const EVENT_TYPES = {
  MARRIAGE: "MARRIAGE",
  BIRTHDAY: "BIRTHDAY",
  OTHERS: "OTHERS",
};

export const EVENT_TYPE_PROPS = {
  [EVENT_TYPES.MARRIAGE]: {
    label: "Marriage",
  },
  [EVENT_TYPES.BIRTHDAY]: {
    label: "Birthday",
  },
  [EVENT_TYPES.OTHERS]: {
    label: "Others",
  },
};

export const EVENT_DATE_FORMAT = "YYYY/MM/DD";

export const CHANNEL_OPTIONS = [
  {
    label: (
      <>
        <MessageOutlined /> SMS
      </>
    ),
    value: "SMS",
  },
  {
    label: (
      <>
        <WhatsAppOutlined /> Whatsapp
      </>
    ),
    value: "WHATSAPP",
  },
  {
    label: (
      <>
        <PhoneOutlined /> Voice call
      </>
    ),
    value: "VOICE_CALL",
  },
];
