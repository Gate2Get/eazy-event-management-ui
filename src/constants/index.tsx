import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar } from "antd";
import SmsIcon from "@mui/icons-material/Sms";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PhoneIcon from "@mui/icons-material/Phone";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import FileUploadIcon from "@mui/icons-material/FileUpload";

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
  TERMS_OF_SERVICE: "/terms-of-service",
  FORBIDDEN: "forbidden",
  PRICING: "pricing",
  HOME: "/",
  CONTACT_MANAGEMENT_GOOGLE_DOC: "/guide/contact-management/google-contact",
  REVIEW_TEMPLATES: "review-templates",
  MY_INVITATION: "my-invitation",
  CONTACT_US: "contact-us",
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
  REVIEW_TEMPLATES: "Review Templates",
  MY_INVITATION: "My Invitation",
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
  ROUTES_MENU.REVIEW_TEMPLATES,
  ROUTES_MENU.MY_INVITATION,
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
  APPEAL: "APPEAL"
  // DRAFT: "DRAFT",
};

export const EDITABLE_EVENT_STATUS = [
  EVENT_STATUS.PENDING_APPROVAL,
  EVENT_STATUS.NOT_STARTED,
];

export const EVENT_YET_TO_START_STATUS = [
  EVENT_STATUS.PENDING_APPROVAL,
  EVENT_STATUS.NOT_STARTED,
  EVENT_STATUS.ON_HOLD,
  EVENT_STATUS.IN_PROGRESS,
];

export const EVENT_STATUS_LABEL: Record<string, string> = {
  // DRAFT: "Draft",
  IN_PROGRESS: "In progress",
  PENDING_APPROVAL: "Pending approval",
  REJECTED: "Rejected",
  APPROVED: "Approved",
  ON_HOLD: "On-hold/More info needed",
  COMPLETED: "Completed",
  NOT_STARTED: "Not started",
};

export const EVENT_STATUS_LABEL_COLOR: Record<string, string> = {
  // [EVENT_STATUS_LABEL.DRAFT]: "default",
  [EVENT_STATUS_LABEL.IN_PROGRESS]: "processing",
  [EVENT_STATUS_LABEL.PENDING_APPROVAL]: "processing",
  [EVENT_STATUS_LABEL.REJECTED]: "error",
  [EVENT_STATUS_LABEL.APPROVED]: "success",
  [EVENT_STATUS_LABEL.COMPLETED]: "success",
};

export const TEMPLATE_STATUS_LABEL: Record<string, string> = {
  [EVENT_STATUS.APPROVED]: "Review Passed",
  [EVENT_STATUS.REJECTED]: "Review failed",
  [EVENT_STATUS.PENDING_APPROVAL]: "Pending for Review",
  [EVENT_STATUS.APPEAL]: "Re Review",
};

export const TEMPLATE_STATUS_LABEL_COLOR: Record<string, string> = {
  [EVENT_STATUS.APPROVED]: "success",
  [EVENT_STATUS.REJECTED]: "error",
  [EVENT_STATUS.PENDING_APPROVAL]: "processing",
  [EVENT_STATUS.APPEAL]: "processing",
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

export const TEMPLATE_ADMIN_ACTION = [
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

export const CHANNELS: Record<string, string> = {
  SMS: "SMS",
  VOICE_CALL: "Voice call",
  WHATSAPP: "Whatsapp",
};

export const CHANNEL_OPTIONS = [
  {
    label: (
      <>
        <SmsIcon fontSize="inherit" /> SMS
      </>
    ),
    value: "SMS",
  },
  // @TODO: Whatsapp
  // {
  //   label: (
  //     <>
  //       <WhatsAppIcon fontSize="inherit" /> Whatsapp
  //     </>
  //   ),
  //   value: "WHATSAPP",
  // },
  {
    label: (
      <>
        <PhoneIcon fontSize="inherit" /> Voice call
      </>
    ),
    value: "VOICE_CALL",
  },
];

export const CHANNEL_OPTIONS_MAP: Record<string, React.ReactNode> = {
  VOICE_CALL: <PhoneIcon fontSize="inherit" />,
  // @TODO: Whatsapp
  // WHATSAPP: <WhatsAppIcon fontSize="inherit" />,
  SMS: <SmsIcon fontSize="inherit" />,
};

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

export const DATE_FORMAT = "DD MMM, YYYY";
export const DATE_TIME_FORMAT = "DD MMM, YYYY hh:mm a";

export const ILLUSTRATION_ASSETS: Record<string, number> = {
  marriage: 9,
  birthday: 16,
  others: 10,
  forbidden: 5,
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
        style={{ background: "rgb(18, 183, 106)", textAlign: "center" }}
        icon={<PhoneIcon />}
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
        style={{ background: "rgb(18, 183, 106)", textAlign: "center" }}
        icon={<SmsIcon fontSize="inherit" />}
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
  // @TODO: Whatsapp
  // {
  //   icon: (
  //     <Avatar
  //       size={48}
  //       style={{ background: "rgb(18, 183, 106)", textAlign: "center" }}
  //       icon={<WhatsAppIcon />}
  //     />
  //   ),
  //   title: "WhatsApp Plan",
  //   price: "₹1 per WhatsApp Message",
  //   info: [
  //     "Sending one WhatsApp notification to each recipient.",
  //     "Advanced notification content customization with rich media.",
  //     "Standard delivery speed.",
  //     "Admin review and approval.",
  //   ],
  // },
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

export const TEMPLATE_BUTTONS = [
  {
    label: "Add Text",
    key: "TEXT",
    icon: <TextFieldsIcon fontSize="small" />,
  },
  {
    label: "Upload Audio",
    key: "UPLOAD_AUDIO",
    icon: <FileUploadIcon fontSize="small" />,
  },
  {
    label: "Record Audio",
    key: "RECORD_AUDIO",
    icon: <RecordVoiceOverIcon fontSize="small" />,
  },
];

export const LOCAL_STORAGE_VIEW = {
  TEMPLATE: "templateViewType",
  CONTACT_DIRECTORY: "contactDirectoryViewType",
  CONTACT_LIST: "contactListViewType",
  EVENT: "eventViewType",
  EVENT_REVIEW: "eventReviewViewType",
  MY_INVITATION: "myInvitationViewType",
};

export const COMPONENT_TYPE = {
  INPUT_TEXT: "INPUT_TEXT",
  INPUT_URL: "INPUT_URL",
  INPUT_DATETIME_LOCAL: "INPUT_DATETIME_LOCAL",
  RANGE_PICKER: "RANGE_PICKER",
  RADIO_GROUP: "RADIO_GROUP",
};
