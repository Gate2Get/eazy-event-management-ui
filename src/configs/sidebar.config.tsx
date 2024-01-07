import { MenuProps } from "antd";
import { NavigateFunction } from "react-router-dom";
import { ROUTES_MENU, ROUTES_URL } from "../constants";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import ContactsIcon from "@mui/icons-material/Contacts";
import ChromeReaderModeIcon from "@mui/icons-material/ChromeReaderMode";
import EventNoteIcon from "@mui/icons-material/EventNote";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import RateReviewIcon from "@mui/icons-material/RateReview";
import BugReportIcon from "@mui/icons-material/BugReport";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import AddCardIcon from "@mui/icons-material/AddCard";

const adminMenu = (
  navigate: NavigateFunction,
  otherFn?: () => void
): MenuProps["items"] => {
  return [
    { type: "divider" },
    {
      type: "group",
      label: ROUTES_MENU.ADMIN,
      key: ROUTES_MENU.ADMIN,
      children: [
        {
          key: ROUTES_URL.REVIEW_TEMPLATES,
          label: ROUTES_MENU.REVIEW_TEMPLATES,
          icon: (
            <EventAvailableIcon
              style={{ fontSize: "20px", fontWeight: "bolder" }}
            />
          ),
          onClick: () => {
            otherFn?.();
            navigate(`${ROUTES_URL.EE}/${ROUTES_URL.REVIEW_TEMPLATES}`);
          },
        },
        {
          key: ROUTES_URL.ADD_CREDIT,
          label: ROUTES_MENU.ADD_CREDIT,
          icon: (
            <AddCardIcon style={{ fontSize: "20px", fontWeight: "bolder" }} />
          ),
          onClick: () => {
            otherFn?.();
            navigate(`${ROUTES_URL.EE}/${ROUTES_URL.ADD_CREDIT}`);
          },
        },
      ],
    },
  ];
};

export const getMenuItems = (
  navigate: NavigateFunction,
  otherFn?: () => void,
  isAdmin?: boolean
): MenuProps["items"] => {
  const _adminMenu: any = isAdmin ? adminMenu(navigate, otherFn) : [];
  return [
    {
      key: ROUTES_URL.DASHBOARD,
      icon: (
        <SpaceDashboardIcon
          style={{ fontSize: "20px", fontWeight: "bolder" }}
        />
      ),
      label: ROUTES_MENU.DASHBOARD,
      onClick: () => {
        otherFn?.();
        navigate(`${ROUTES_URL.EE}/${ROUTES_URL.DASHBOARD}`);
      },
    },
    { type: "divider" },
    {
      label: ROUTES_MENU.MANAGEMENT,
      key: ROUTES_MENU.MANAGEMENT,
      type: "group",
      children: [
        {
          key: ROUTES_URL.CONTACT_MANAGEMENT,
          label: ROUTES_MENU.CONTACT_MANAGEMENT,
          icon: (
            <ContactsIcon style={{ fontSize: "20px", fontWeight: "bolder" }} />
          ),
          onClick: () => {
            otherFn?.();
            navigate(`${ROUTES_URL.EE}/${ROUTES_URL.CONTACT_MANAGEMENT}`);
          },
        },
        {
          key: ROUTES_URL.TEMPLATE_MANAGEMENT,
          label: ROUTES_MENU.TEMPLATE_MANAGEMENT,
          icon: (
            <ChromeReaderModeIcon
              style={{ fontSize: "20px", fontWeight: "bolder" }}
            />
          ),
          onClick: () => {
            otherFn?.();
            navigate(`${ROUTES_URL.EE}/${ROUTES_URL.TEMPLATE_MANAGEMENT}`);
          },
        },
      ],
    },

    { type: "divider" },
    {
      type: "group",
      label: ROUTES_MENU.SERVICE,
      key: ROUTES_MENU.SERVICE,
      children: [
        {
          key: ROUTES_URL.MY_INVITATION,
          label: ROUTES_MENU.MY_INVITATION,
          icon: (
            <LocalActivityIcon
              style={{ fontSize: "20px", fontWeight: "bolder" }}
            />
          ),
          onClick: () => {
            otherFn?.();
            navigate(ROUTES_URL.MY_INVITATION);
          },
        },
        {
          key: ROUTES_URL.EVENT_MANAGEMENT,
          label: ROUTES_MENU.EVENT_MANAGEMENT,
          icon: (
            <EventNoteIcon style={{ fontSize: "20px", fontWeight: "bolder" }} />
          ),
          onClick: () => {
            otherFn?.();
            navigate(`${ROUTES_URL.EE}/${ROUTES_URL.EVENT_MANAGEMENT}`);
          },
        },
      ],
    },
    ..._adminMenu,
    { type: "divider" },
    {
      label: ROUTES_MENU.SUPPORT_HELP,
      key: ROUTES_MENU.SUPPORT_HELP,
      type: "group",
      children: [
        // {
        //   key: ROUTES_URL.MY_PROFILE,
        //   icon: (
        //     <AccountBoxIcon
        //       style={{ fontSize: "20px", fontWeight: "bolder" }}
        //     />
        //   ),
        //   label: ROUTES_MENU.MY_PROFILE,
        //   onClick: () => {
        //     otherFn?.();
        //     navigate(`${ROUTES_URL.EE}/${ROUTES_URL.MY_PROFILE}`);
        //   },
        // },
        {
          key: ROUTES_URL.FEEDBACK,
          icon: (
            <RateReviewIcon
              style={{ fontSize: "20px", fontWeight: "bolder" }}
            />
          ),
          label: ROUTES_MENU.FEEDBACK,
          onClick: () => {
            otherFn?.();
            navigate(`${ROUTES_URL.EE}/${ROUTES_URL.FEEDBACK}`);
          },
        },
        {
          key: ROUTES_URL.REPORT_BUG,
          icon: (
            <BugReportIcon style={{ fontSize: "20px", fontWeight: "bolder" }} />
          ),
          label: ROUTES_MENU.REPORT_BUG,
          onClick: () => {
            otherFn?.();
            navigate(`${ROUTES_URL.EE}/${ROUTES_URL.REPORT_BUG}`);
          },
        },
      ],
    },
  ];
};
