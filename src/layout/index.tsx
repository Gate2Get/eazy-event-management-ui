import React from "react";
import { Alert, Layout, Row, Space, Spin, Typography } from "antd";
import { useWindowSize } from "../hooks/useWindowSize";
import { Header as AppHeader } from "../components/header";
import "./styles.scss";
import Marquee from "react-fast-marquee";
import { useBearStore } from "../store";
import { SidebarTab } from "../components/sidebarTab";
import BannerPng from "../assets/png/banner-BH.4fd13869.png";
import { API } from "../api";
import { AlertType } from "../types";

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

export const AppLayout: React.FC<any> = (props): React.ReactElement => {
  /* A custom hook that returns the width and height of the window. */
  const { height, width } = useWindowSize();
  const {
    screen,
    currentPage,
    setCurrentPage,
    isLoading,
    setAlerts,
    alerts,
    collapsed,
    setCollapsed,
  } = useBearStore.appStore();

  const { children } = props;

  let sidebarWidth = width;
  if (screen === "MOBILE") {
    sidebarWidth = width;
  } else {
    sidebarWidth = (width * 21) / 100;
  }

  React.useEffect(() => {
    getAlerts();
  }, []);

  const getAlerts = (): any => {
    API.commonAPI
      .getAlerts()
      .then((alert: AlertType[]) => {
        setAlerts(alert);
      })
      .catch((error: Error) => {
        console.log({ location: "getAlerts", error });
      });
  };

  return (
    <Layout className="app__layout">
      <Header className="layout__header">
        <AppHeader collapsed={collapsed} setCollapsed={setCollapsed} />
      </Header>
      <Spin tip="Loading..." spinning={isLoading}>
        <Layout hasSider>
          <Sider
            collapsible
            breakpoint="lg"
            collapsed={collapsed}
            collapsedWidth={0}
            trigger={null}
            width={sidebarWidth}
            className="sidebar__layout"
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
              {/* {isLoading && (
              <div className="overlay-loader">
                <div className="spinner__container-walmart" style={{ height }}>
                  <Spinner
                    className="spinner__walmart-loader"
                    color="gray"
                    size="large"
                    title="Loading"
                  />
                </div>
              </div>
            )} */}

              <div className="banner-text">
                <div className="banner-image">
                  <img
                    src={BannerPng}
                    alt=""
                    style={{ width: "100%" }}
                    height={120}
                  />
                </div>
                <div className="text-on-image">
                  <Title level={2}>{currentPage}</Title>
                </div>
                <div className="alert-container">
                  {alerts.length
                    ? alerts.map((alert) => (
                        <Alert
                          banner
                          {...alert.props}
                          message={
                            <Marquee
                              pauseOnHover
                              gradient={false}
                              {...alert.props}
                            >
                              {alert.text}
                            </Marquee>
                          }
                        />
                      ))
                    : null}
                </div>
              </div>

              {children}
            </Content>
          ) : null}
        </Layout>
      </Spin>
    </Layout>
  );
};
