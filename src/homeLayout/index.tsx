import React from "react";
import { Col, Layout, Row, theme, Typography } from "antd";
import { HeaderHome } from "../components/headerHome";
import { useWindowSize } from "../hooks/useWindowSize";
import { useBearStore } from "../store";
import { ROUTES_URL, SERVICE_MENU } from "../constants";
import Logo from "../assets/png/logoEazyEvent.png";

const { Header, Content, Footer } = Layout;
const { Text, Link } = Typography;

type HomeLayoutType = {
  children: React.ReactNode;
};

export const HomeLayout = (props: HomeLayoutType) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { height } = useWindowSize();
  const { currentPage, screen } = useBearStore.appStore();
  const { isAuthorized } = useBearStore.userStore();
  const { children } = props;

  const colOption = (count: number) =>
    screen === "MOBILE"
      ? {
          flex: count,
        }
      : { span: count };

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
            <HeaderHome isAuthorized={isAuthorized} />
          </div>
        </Header>
      )}
      <Content className="site-layout" style={{ minHeight: height - 130 }}>
        {children}
      </Content>
      <Footer style={{ textAlign: "center", background: "#fff" }}>
        <Row>
          <Col {...colOption(12)} style={{ textAlign: "center" }}>
            <Text
              style={{
                float: !SERVICE_MENU.includes(currentPage) ? "left" : "none",
              }}
            >
              <img
                src={Logo}
                alt=""
                width={20}
                style={{ position: "relative", top: "5px" }}
              />
              ©2023 Eazy Event
            </Text>
          </Col>
          <Col {...colOption(12)}>
            <div
              style={
                screen !== "MOBILE"
                  ? {
                      float: "right",
                    }
                  : {}
              }
            >
              <Link
                href={ROUTES_URL.TERMS_OF_SERVICE}
                target="_blank"
                style={{ cursor: "pointer", color: "rgb(102, 112, 133)" }}
              >
                Terms of Service
              </Link>
              <Link
                href={ROUTES_URL.PRIVACY_POLICY}
                target="_blank"
                style={{
                  marginLeft: "1rem",
                  cursor: "pointer",
                  color: "rgb(102, 112, 133)",
                }}
              >
                Privacy Policy
              </Link>
            </div>
          </Col>
        </Row>
      </Footer>
    </Layout>
  );
};
