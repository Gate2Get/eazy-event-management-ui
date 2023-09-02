import React from "react";
import { Layout, Row, Typography } from "antd";
import { useWindowSize } from "../hooks/useWindowSize";
import { Header as AppHeader } from "../components/header";
import "./styles.scss";
import { useBearStore } from "../store";
import { SidebarTab } from "../components/sidebarTab";
import BannerPng from "../assets/png/banner-BH.4fd13869.png";
import { ROUTES_MENU, ROUTES_URL } from "../constants";

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

export const AppLayout: React.FC<any> = (props): React.ReactElement => {
  const [collapsed, setCollapsed] = React.useState(false);

  /* A custom hook that returns the width and height of the window. */
  const { height, width } = useWindowSize();
  const { screen, currentPage, setCurrentPage } = useBearStore.appStore();

  const { children } = props;

  let sidebarWidth = width;
  if (screen === "MOBILE") {
    sidebarWidth = width;
  } else {
    sidebarWidth = (width * 21) / 100;
  }

  return (
    <Layout className="app__layout">
      <Header className="layout__header">
        <AppHeader collapsed={collapsed} setCollapsed={setCollapsed} />
      </Header>
      <Layout hasSider>
        <Sider
          collapsible
          breakpoint="lg"
          collapsed={collapsed}
          collapsedWidth={0}
          trigger={null}
          width={sidebarWidth}
          className="sidebar__layout"
          // style={{ height }}
          style={{
            overflow: "auto",
            height,
            position: "fixed",
          }}
        >
          <SidebarTab setCurrentPage={setCurrentPage} />
        </Sider>

        {screen === "DESKTOP" || (screen === "MOBILE" && collapsed) ? (
          <Content
            style={{
              margin: "10px 10px",
              padding: 10,
              minHeight: height,
              background: "#FFFFFF",
              marginLeft: collapsed ? 0 : sidebarWidth,
            }}
          >
            <div className="banner-text">
              <div className="banner-image">
                <img
                  src={BannerPng}
                  alt=""
                  style={{ width: "100%" }}
                  height={184}
                />
              </div>
              <div className="text-on-image">
                <Title level={2}>{currentPage}</Title>
              </div>
            </div>

            {children}
          </Content>
        ) : null}
      </Layout>
    </Layout>
  );
};
