import React from "react";
import { Layout, theme } from "antd";
import { HeaderHome } from "../components/headerHome";
import { useWindowSize } from "../hooks/useWindowSize";
import { useBearStore } from "../store";
import { useNavigate } from "react-router-dom";
import { ROUTES_URL, SERVICE_MENU } from "../constants";

const { Header, Content, Footer } = Layout;

type HomeLayoutType = {
  children: React.ReactNode;
};

export const HomeLayout = (props: HomeLayoutType) => {
  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { height } = useWindowSize();
  const { currentPage } = useBearStore.appStore();
  const { children } = props;

  const verifyAuth = () => {
    navigate(ROUTES_URL.AUTHORIZER);
  };

  return (
    <Layout
      className={`home-page__container ${window.location.pathname.replaceAll(
        "/",
        "__"
      )}`}
    >
      {!SERVICE_MENU.includes(currentPage) && (
        <Header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            width: "100%",
            display: "grid",
            alignItems: "center",
            background: "#fff",
          }}
        >
          <div>
            <HeaderHome onLoginHandle={verifyAuth} />
          </div>
        </Header>
      )}
      <Content className="site-layout" style={{ minHeight: height - 130 }}>
        {children}
      </Content>
      <Footer style={{ textAlign: "center", background: "#fff" }}>
        Eazy Event ©2023 All Rights Reserved
      </Footer>
    </Layout>
  );
};
