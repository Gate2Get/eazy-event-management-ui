import { Menu } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { getMenuItems } from "../../configs/sidebar.config";
import { MENU_OPEN_KEYS } from "../../constants";

export const SidebarTab = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = React.useState("");

  React.useEffect(() => {
    const paths = window.location.pathname;
    setSelectedTab(paths);
  }, [window.location.pathname]);

  const menuItems = getMenuItems(navigate);

  return (
    <Menu
      // theme="dark"
      mode="inline"
      defaultSelectedKeys={["services"]}
      items={menuItems}
      selectedKeys={[selectedTab]}
      openKeys={MENU_OPEN_KEYS}
    />
  );
};
