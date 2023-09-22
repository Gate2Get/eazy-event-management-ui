import { Menu } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { getMenuItems } from "../../configs/sidebar.config";
import { MENU_OPEN_KEYS, ROUTES_MENU, ROUTES_URL } from "../../constants";
import { useBearStore } from "../../store";

type SidebarTabProps = {
  setCurrentPage: (currentPage: string) => void;
};

const routeUrls = Object.entries(ROUTES_URL);
const routeMenu: any = ROUTES_MENU;

export const SidebarTab = (props: SidebarTabProps) => {
  const { screen, setCollapsed } = useBearStore.appStore();
  const { setCurrentPage } = props;
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = React.useState("");

  React.useEffect(() => {
    const paths = window.location.pathname;
    setSelectedTab(paths);
    const route = routeUrls.find((url) => url[1] === paths);
    console.log({ route });
    if (route) {
      const menu = routeMenu[route[0]];
      setCurrentPage(menu);
    }
  }, [window.location.pathname]);

  const onCollapseSider = () => {
    if (screen === "MOBILE") {
      setCollapsed(true);
    }
  };

  const menuItems = getMenuItems(navigate, onCollapseSider);

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
