import { WhatsAppOutlined } from "@ant-design/icons";
import { faMessage, faUser } from "@fortawesome/free-regular-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar } from "antd";

export const ROUTES_URL = {
  DASHBOARD: "dashboard",
  SERVICE: "service",
  EE: "/console",
  CONTACT_MANAGEMENT: "contact-management",
  TEMPLATE_MANAGEMENT: "template-management",
  EVENT_MANAGEMENT: "event-management",
  GIFT_MANAGEMENT: "gift-management",
  FEEDBACK: "feedback",
  REPORT_BUG: "report-bug",
  MY_PROFILE: "my-profile",
  LOGIN: "/account/login",
  AUTHORIZER: "/account/auth-verify",
  PRIVACY_POLICY: "/privacy-policy",
  FORBIDDEN: "forbidden",
  PRICING: "pricing",
  HOME: "/",
  CONTACT_MANAGEMENT_GOOGLE_DOC: "/guide/contact-management/google-contact",
  REVIEW_EVENTS: "review-events",
};

export const ROUTES_MENU = {
  DASHBOARD: "Dashboard",
  SERVICE: "Service",
  MANAGEMENT: "Management",
  CONTACT_MANAGEMENT: "Contact",
  EVENT_MANAGEMENT: "Event",
  GIFT_MANAGEMENT: "Gift Management",
  TEMPLATE_MANAGEMENT: "Template",
  FEEDBACK: "Feedback",
  REPORT_BUG: "Report Bug",
  MY_PROFILE: "My Profile",
  MY_ACCOUNT: "My Account",
  ADMIN: "Admin",
  REVIEW_EVENTS: "Review Events",
};

export const SERVICE_MENU = [
  ROUTES_MENU.DASHBOARD,
  ROUTES_MENU.SERVICE,
  ROUTES_MENU.CONTACT_MANAGEMENT,
  ROUTES_MENU.EVENT_MANAGEMENT,
  ROUTES_MENU.GIFT_MANAGEMENT,
  ROUTES_MENU.TEMPLATE_MANAGEMENT,
  ROUTES_MENU.FEEDBACK,
  ROUTES_MENU.REPORT_BUG,
  ROUTES_MENU.MY_PROFILE,
  ROUTES_MENU.REVIEW_EVENTS,
];

export const MENU_OPEN_KEYS = [ROUTES_URL.SERVICE];

export const EVENT_STATUS = {
  APPROVED: "APPROVED",
  PENDING_APPROVAL: "PENDING_APPROVAL",
  REJECTED: "REJECTED",
  NOT_STARTED: "NOT_STARTED",
  ON_HOLD: "ON_HOLD",
  COMPLETED: "COMPLETED",
  IN_PROGRESS: "IN_PROGRESS",
  // DRAFT: "DRAFT",
};

export const EDITABLE_EVENT_STATUS = [
  EVENT_STATUS.PENDING_APPROVAL,
  EVENT_STATUS.NOT_STARTED,
];

export const EVENT_STATUS_LABEL = {
  // DRAFT: "Draft",
  IN_PROGRESS: "In progress",
  PENDING_APPROVAL: "Pending approval",
  REJECTED: "Rejected",
  APPROVED: "Approved",
  ON_HOLD: "On-hold/More info needed",
  COMPLETED: "Completed",
  NOT_STARTED: "Not started",
};

export const EVENT_STATUS_LABEL_COLOR = {
  // [EVENT_STATUS_LABEL.DRAFT]: "default",
  [EVENT_STATUS_LABEL.IN_PROGRESS]: "processing",
  [EVENT_STATUS_LABEL.PENDING_APPROVAL]: "processing",
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

export const EVENT_ADMIN_ACTION = [
  {
    label: "Reject",
    key: EVENT_STATUS.REJECTED,
    props: {
      danger: true,
    },
  },
  {
    label: "On-Hold/More info",
    key: EVENT_STATUS.ON_HOLD,
    props: {
      type: "default",
    },
  },

  {
    label: "Approve",
    key: EVENT_STATUS.APPROVED,
    props: {
      type: "primary",
    },
  },
];

export const EVENT_DATE_FORMAT = "YYYY/MM/DD";

export const NON_PROTECTED_ROUTES = [
  ROUTES_URL.CONTACT_MANAGEMENT_GOOGLE_DOC,
  `/${ROUTES_URL.FORBIDDEN}`,
  `${ROUTES_URL.EE}/${ROUTES_URL.FORBIDDEN}`,
];

export const CHANNEL_OPTIONS = [
  {
    label: (
      <>
        <FontAwesomeIcon icon={faMessage} /> SMS
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
        <FontAwesomeIcon icon={faPhone} /> Voice call
      </>
    ),
    value: "VOICE_CALL",
  },
];

export const EVENT_SEND_STATUS_MAP: Record<string, string> = {
  "1": "Progress",
  "2": "Success",
  "3": "Failed",
  "4": "Not started",
};

export const EVENT_SEND_STATUS_LABEL_MAP: Record<string, string> = {
  "1": "#609af8",
  "2": "#4cd07d",
  "3": "#ff6259",
  "4": "#BDBDBD",
};

export const DATE_FORMAT = "DD-MM-YYYY";

export const ILLUSTRATION_ASSETS = {
  marriage: 9,
  birthday: 16,
  others: 10,
};

export const HOME_STAT = [
  {
    prefix: <FontAwesomeIcon icon={faUser} />,
    value: 1000,
    title: "Users",
  },
];

export const PRICING_CARDS = [
  {
    icon: (
      <Avatar
        size={48}
        style={{ background: "#0071dc", textAlign: "center" }}
        icon={<FontAwesomeIcon icon={faPhone} />}
      />
    ),
    title: "Voice Call Plan",
    price: "₹5 per Minutes per Voice Call",
    info: [
      "Making one voice call notification to each recipient.",
      "Basic notification content customization.",
      "Standard delivery speed.",
      "Admin review and approval.",
    ],
  },
  {
    icon: (
      <Avatar
        size={48}
        style={{ background: "#0071dc", textAlign: "center" }}
        icon={<FontAwesomeIcon icon={faMessage} />}
      />
    ),
    title: "SMS Plan",
    price: "₹5 per SMS",
    info: [
      "Sending one SMS notification to each recipient.",
      "Basic notification content customization.",
      "Standard delivery speed.",
      "Admin review and approval.",
    ],
  },
  {
    icon: (
      <Avatar
        size={48}
        style={{ background: "#0071dc", textAlign: "center" }}
        icon={<WhatsAppOutlined />}
      />
    ),
    title: "WhatsApp Plan",
    price: "₹1 per WhatsApp Message",
    info: [
      "Sending one WhatsApp notification to each recipient.",
      "Advanced notification content customization with rich media.",
      "Standard delivery speed.",
      "Admin review and approval.",
    ],
  },
];

export const PAGE_ACTION = {
  VIEW: "VIEW",
  EDIT: "EDIT",
  DELETE: "DELETE",
  ADD: "ADD",
};

export const PAGE_QUERY_ACTIONS = [
  PAGE_ACTION.ADD,
  PAGE_ACTION.VIEW,
  PAGE_ACTION.EDIT,
];

export const ROLES = {
  ADMIN: "ADMIN",
  CUSTOMER: "CUSTOMER",
};

export const STEPS_EDITABLE = [
  {
    title: "Event Information",
    content: "First-content",
  },
  {
    title: "Message",
    content: "Second-content",
  },
  {
    title: "Contacts",
    content: "Last-content",
  },
];
