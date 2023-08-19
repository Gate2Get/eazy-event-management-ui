import React from "react";
import { Layout } from "antd";
import { useWindowSize } from "../hooks/useWindowSize";
import { Header as AppHeader } from "../components/header";
import "./styles.scss";
import { useBearStore } from "../store";
import { SidebarTab } from "../components/sidebarTab";

const { Header, Content, Sider } = Layout;

export const AppLayout: React.FC<any> = (props): React.ReactElement => {
  const [collapsed, setCollapsed] = React.useState(false);
  /* A custom hook that returns the width and height of the window. */
  const { height, width } = useWindowSize();
  const { screen } = useBearStore.appStore();

  const { children } = props;

  let sidebarWidth = width;
  if (screen === "MOBILE") {
    sidebarWidth = width;
  } else {
    sidebarWidth = (width * 21) / 100;
  }

  console.log({ sidebarWidth, screen });

  return (
    <Layout>
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
        >
          <SidebarTab />
        </Sider>

        {screen === "DESKTOP" || (screen === "MOBILE" && collapsed) ? (
          <Content
            style={{
              margin: "10px 10px",
              padding: 10,
              minHeight: height,
              background: "#FFFFFF",
            }}
          >
            {children}
          </Content>
        ) : null}
      </Layout>
    </Layout>
  );
};
