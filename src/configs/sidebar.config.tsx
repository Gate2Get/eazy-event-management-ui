import {
  BugOutlined,
  CommentOutlined,
  ContactsOutlined,
  DashboardOutlined,
  FilePptOutlined,
  GiftOutlined,
  NotificationOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { MenuProps } from "antd";
import { NavigateFunction } from "react-router-dom";
import { ROUTES_MENU, ROUTES_URL } from "../constants";

export const getMenuItems = (
  navigate: NavigateFunction,
  otherFn?: () => void
): MenuProps["items"] => [
  {
    key: ROUTES_URL.DASHBOARD,
    icon: (
      <DashboardOutlined style={{ fontSize: "20px", fontWeight: "bolder" }} />
    ),
    label: ROUTES_MENU.DASHBOARD,
    onClick: () => {
      otherFn?.();
      navigate(`${ROUTES_URL.EE}/${ROUTES_URL.DASHBOARD}`);
    },
  },
  {
    key: ROUTES_URL.CONTACT_MANAGEMENT,
    label: ROUTES_MENU.CONTACT_MANAGEMENT,
    icon: (
      <ContactsOutlined style={{ fontSize: "20px", fontWeight: "bolder" }} />
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
      <FilePptOutlined style={{ fontSize: "20px", fontWeight: "bolder" }} />
    ),
    onClick: () => {
      otherFn?.();
      navigate(`${ROUTES_URL.EE}/${ROUTES_URL.TEMPLATE_MANAGEMENT}`);
    },
  },
  {
    key: ROUTES_URL.EVENT_MANAGEMENT,
    label: ROUTES_MENU.EVENT_MANAGEMENT,
    icon: (
      <NotificationOutlined
        style={{ fontSize: "20px", fontWeight: "bolder" }}
      />
    ),
    onClick: () => {
      otherFn?.();
      navigate(`${ROUTES_URL.EE}/${ROUTES_URL.EVENT_MANAGEMENT}`);
    },
  },
  // {
  //   key: ROUTES_URL.GIFT_MANAGEMENT,
  //   label: ROUTES_MENU.GIFT_MANAGEMENT,
  //   icon: <GiftOutlined />,
  //   onClick: () => {
  //     otherFn?.();
  //     navigate(ROUTES_URL.GIFT_MANAGEMENT);
  //   },
  // },
  {
    key: ROUTES_URL.FEEDBACK,
    icon: (
      <CommentOutlined style={{ fontSize: "20px", fontWeight: "bolder" }} />
    ),
    label: ROUTES_MENU.FEEDBACK,
    onClick: () => {
      otherFn?.();
      navigate(`${ROUTES_URL.EE}/${ROUTES_URL.FEEDBACK}`);
    },
  },
  {
    key: ROUTES_URL.REPORT_BUG,
    icon: <BugOutlined style={{ fontSize: "20px", fontWeight: "bolder" }} />,
    label: ROUTES_MENU.REPORT_BUG,
    onClick: () => {
      otherFn?.();
      navigate(`${ROUTES_URL.EE}/${ROUTES_URL.REPORT_BUG}`);
    },
  },

  {
    key: ROUTES_URL.MY_PROFILE,
    icon: <UserOutlined style={{ fontSize: "20px", fontWeight: "bolder" }} />,
    label: ROUTES_MENU.MY_PROFILE,
    onClick: () => {
      otherFn?.();
      navigate(`${ROUTES_URL.EE}/${ROUTES_URL.MY_PROFILE}`);
    },
  },
];
