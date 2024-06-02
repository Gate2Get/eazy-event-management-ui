import { Menu, MenuProps } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { getMenuItems } from "../../configs/sidebar.config";
import {
  MENU_OPEN_KEYS,
  ROLES,
  ROUTES_MENU,
  ROUTES_URL,
} from "../../constants";
import { useBearStore } from "../../store";
import { filterMenuItems } from "../../utils/common.utils";

type SidebarTabProps = {
  setCurrentPage: (currentPage: string) => void;
};

type MenuItem = Required<MenuProps>["items"][number] & {
  type: string;
  children: any;
};

const routeUrls = Object.entries(ROUTES_URL);
const routeMenu: any = ROUTES_MENU;

export const SidebarTab = (props: SidebarTabProps) => {
  const { screen, setCollapsed, moduleAccess } = useBearStore.appStore();
  const { user } = useBearStore.userStore();
  const { setCurrentPage } = props;
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = React.useState("");

  React.useEffect(() => {
    const paths = window.location.pathname;
    const route = routeUrls.find(
      (url) => `${ROUTES_URL.EE}/${url[1]}` === paths
    );
    console.log({ route, paths, routeUrls, x: paths });
    if (route) {
      const menu = routeMenu[route[0]];
      setSelectedTab(route[1]);
      setCurrentPage(menu);
      // Scroll to the top when the component is mounted
      window.scrollTo(0, 0);
    }
  }, [window.location.pathname]);

  const onCollapseSider = () => {
    if (screen === "MOBILE") {
      setCollapsed(true);
    }
  };

  const _moduleAccess = React.useMemo(
    () => moduleAccess.map((item) => item.key),
    [moduleAccess]
  );
  const isAdmin = user.roles?.toString().split(",").includes(ROLES.ADMIN);
  // const menuItems = getMenuItems(navigate, onCollapseSider, isAdmin)?.filter(
  //   (item) => _moduleAccess.includes(item?.key as string)
  // );

  const menuItems = filterMenuItems(
    getMenuItems(navigate, onCollapseSider, isAdmin) as MenuItem[],
    _moduleAccess
  );

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
