import {
  ContactsOutlined,
  DashboardOutlined,
  GiftOutlined,
  NotificationOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

export const SidebarTab = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = React.useState("");

  React.useEffect(() => {
    const paths = window.location.pathname.split("/");
    const path = paths[paths.length - 1];
    setSelectedTab(path);
  }, [window.location.pathname]);

  const menuItems: MenuProps["items"] = [
    {
      key: `dashboard`,
      icon: <DashboardOutlined />,
      label: `Dashboard`,
      onClick: () => {
        navigate("/dashboard");
      },
    },
    {
      key: `services`,
      icon: <SettingOutlined />,
      label: `Services`,

      children: [
        {
          key: "contact-management",
          label: "Contact Management",
          icon: <ContactsOutlined />,
          onClick: () => {
            navigate("/services/contact-management");
          },
        },
        {
          key: "notification-management",
          label: "Notification Management",
          icon: <NotificationOutlined />,
          onClick: () => {
            navigate("/services/notification-management");
          },
        },
        {
          key: "gift-management",
          label: "Gift Management",
          icon: <GiftOutlined />,
          onClick: () => {
            navigate("/services/gift-management");
          },
        },
      ],
    },
    {
      key: `my-profile`,
      icon: <UserOutlined />,
      label: `My Profile`,
      onClick: () => {
        navigate("/my-profile");
      },
    },
  ];

  return (
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={["services"]}
      items={menuItems}
      selectedKeys={[selectedTab]}
    />
  );
};
