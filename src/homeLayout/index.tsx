import React from "react";
import { Col, Layout, Row, theme, Typography } from "antd";
import { HeaderHome } from "../components/headerHome";
import { useWindowSize } from "../hooks/useWindowSize";
import { useBearStore } from "../store";
import { ROUTES_URL, SERVICE_MENU } from "../constants";
import Logo from "../assets/png/logoEazyEvent.png";

const { Header, Content, Footer } = Layout;
const { Text, Link, Paragraph } = Typography;

type HomeLayoutType = {
  children: React.ReactNode;
};

export const HomeLayout = (props: HomeLayoutType) => {
  const { height } = useWindowSize();
  const { currentPage, screen, collapsed } = useBearStore.appStore();
  const { isAuthorized } = useBearStore.userStore();
  const { children } = props;

  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const colOption = (count: number) =>
    screen === "MOBILE"
      ? {
          flex: count,
        }
      : { span: count };

  const isFooterVisible =
    screen === "DESKTOP"
      ? true
      : screen === "MOBILE" && !collapsed
      ? false
      : true;

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
            boxShadow: scrolled
              ? "rgb(234, 236, 240) 0px 0px 1px, rgba(29, 41, 57, 0.08) 0px 6px 12px"
              : "none",
          }}
          // className={headerClass}
        >
          <div>
            <HeaderHome isAuthorized={isAuthorized} />
          </div>
        </Header>
      )}
      <Content
        className="site-layout"
        style={{ minHeight: height - 130, background: "rgb(255, 255, 255)" }}
      >
        {children}
      </Content>
      {isFooterVisible && (
        <Footer style={{ textAlign: "center", background: "#fff" }}>
          <Row>
            <Col {...colOption(12)} style={{ textAlign: "center" }}>
              <Paragraph
                style={{
                  float:
                    !SERVICE_MENU.includes(currentPage) && screen === "DESKTOP"
                      ? "left"
                      : "none",
                  color: "rgb(102, 112, 133)",
                }}
              >
                <img
                  src={Logo}
                  alt=""
                  width={20}
                  style={{
                    position: "relative",
                    top: "5px",
                  }}
                />
                ©2023 Eazy Event
              </Paragraph>
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
      )}
    </Layout>
  );
};
