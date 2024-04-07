import React from "react";
import { Alert, Layout, Spin, Typography } from "antd";
import { useWindowSize } from "../hooks/useWindowSize";
import { Header as AppHeader } from "../components/header";
import "./styles.scss";
import Marquee from "react-fast-marquee";
import { useBearStore } from "../store";
import { SidebarTab } from "../components/sidebarTab";
import { API } from "../api";
import { AlertType } from "../types";
import { ServiceRoutes } from "../routes";
import { ROUTES_URL } from "../constants";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ProfileVerification } from "../components/profileVerification";
import { useSpring, animated } from "react-spring";

const { Header, Content, Sider } = Layout;
const { Title, Text } = Typography;

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
    setLoading,
  } = useBearStore.appStore();
  const {
    setUser,
    isAuthorized,
    user,
    isVerificationOpen,
    setIsVerificationOpen,
    setActivePlan,
  } = useBearStore.userStore();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  let sidebarWidth = width;
  if (screen === "MOBILE") {
    sidebarWidth = width;
  } else {
    sidebarWidth = (width * 21) / 100;
  }

  // Animated styles for the Content component
  const contentAnimation = useSpring({
    marginLeft: collapsed ? 0 : sidebarWidth,
  });

  React.useEffect(() => {
    if (!isAuthorized) {
      let returnTo;
      if (searchParams.get("returnTo")) {
        returnTo = searchParams.get("returnTo");
        console.log("returnTo 1", returnTo);
      } else if (window.location.pathname === ROUTES_URL.AUTHORIZER) {
        returnTo = `${ROUTES_URL.EE}/${ROUTES_URL.DASHBOARD}`;
        console.log("returnTo 2", returnTo);
      } else {
        returnTo =
          window.location.pathname === "/"
            ? `${ROUTES_URL.EE}/${ROUTES_URL.DASHBOARD}`
            : window.location.pathname;
        console.log("returnTo 3", returnTo);
      }
      navigate(`${ROUTES_URL.AUTHORIZER}?returnTo=${btoa(returnTo as string)}`);
    }
    getUserInfo();
    getAlerts();
  }, []);

  React.useEffect(() => {
    getActiveUserPricingPlan();
  }, [currentPage]);

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

  const getActiveUserPricingPlan = (): any => {
    API.userManagement
      .getActiveUserPricingPlan()
      .then((plan) => {
        setActivePlan(plan);
      })
      .catch((error: Error) => {
        console.log({ location: "getAlerts", error });
      });
  };

  const getUserInfo = () => {
    setLoading(true);
    API.userManagement
      .getUserInfo()
      .then((userInfo) => {
        setLoading(false);
        setUser(userInfo);
      })
      .catch((error) => {
        setLoading(false);
        console.log({ location: "getUserInfo", error });
      });
  };

  const onCloseVerification = () => {
    setIsVerificationOpen(false);
    getUserInfo();
  };

  const renderAccountWarning = () => {
    if (!user.mobile) {
      return (
        <>
          <Text
            className="link-text"
            onClick={() => setIsVerificationOpen(true)}
          >
            Click here
          </Text>
          <Text> to complete the account verification to unlock more.</Text>
        </>
      );
    } else if (!user.isMobileVerified) {
      return (
        <>
          <Text
            className="link-text"
            onClick={() => setIsVerificationOpen(true)}
          >
            Click here
          </Text>
          <Text> to verify the mobile to start sending yourself and more.</Text>
        </>
      );
    }
  };

  return (
    <Layout className="app__layout">
      <ProfileVerification
        isOpen={isVerificationOpen}
        setIsOpen={setIsVerificationOpen}
        userInfo={user}
        onCloseVerification={onCloseVerification}
      />
      <Header className="layout__header">
        <AppHeader
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          currentPage={currentPage}
        />
      </Header>
      <Spin tip="Loading..." spinning={isLoading}>
        <Layout hasSider style={{ flexDirection: "column" }}>
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
            <animated.div style={contentAnimation}>
              <Content
                style={{
                  margin: "0px 10px 10px 10px",
                  padding: 10,
                  minHeight: height,
                  background: "rgb(252, 252, 253)",
                  // marginLeft: collapsed ? 0 : sidebarWidth,
                }}
              >
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
                {!user.mobile || !user.isMobileVerified ? (
                  <Alert message={renderAccountWarning()} type="warning" />
                ) : null}
                <div className="banner-text"></div>

                <div style={{ visibility: isLoading ? "hidden" : "visible" }}>
                  <ServiceRoutes />
                </div>
              </Content>
            </animated.div>
          ) : null}
        </Layout>
      </Spin>
    </Layout>
  );
};
