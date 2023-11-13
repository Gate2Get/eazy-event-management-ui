import React from "react";
import { Button, Col, Row, theme, Typography } from "antd";
import "./styles.scss";
import { useBearStore } from "../../store";
import { howIsItWorksContent } from "../../configs/home.config";
import { HomeHowIsItWorks } from "../../components/homeHowIsItWorks";
import { useNavigate } from "react-router-dom";
import { ROUTES_URL } from "../../constants";
import { AnimatedText } from "../../components/animatedText";
import EmailCampaign from "../../assets/svg/email-campaign.svg";
import MailBro from "../../assets/svg/mail-bro.svg";

const { Title, Text } = Typography;

export const Home = () => {
  const { screen } = useBearStore.appStore();
  const { isAuthorized } = useBearStore.userStore();
  const navigate = useNavigate();

  const colOption = (count: number, flexOption = {}) =>
    screen === "MOBILE"
      ? {
          flex: count,
          ...flexOption,
        }
      : { span: count };

  const verifyAuth = () => {
    navigate(ROUTES_URL.AUTHORIZER);
  };

  return (
    <>
      <div style={{ minHeight: 380 }} className="body-content">
        {/* <AnimatedText /> */}
        <Title className="headline">
          Delivering Joyful Event Notifications
        </Title>
        <div>
          <img
            src={EmailCampaign}
            alt=""
            width={screen === "MOBILE" ? "50%" : "25%"}
          />
        </div>
        <Button type="primary" size="large" onClick={verifyAuth}>
          Get Started
        </Button>
        <Title level={2} className="sub-heading">
          Make every event memorable with our voice call, SMS, and WhatsApp
          notification service.
        </Title>
      </div>
      <div
        className="how-is-it-works"
        style={{ padding: screen === "MOBILE" ? "2rem 2rem" : "2rem 6rem" }}
      >
        <Title className="notes">
          Sending event notifications has never been easier!
        </Title>
        <Title className="steps">
          Just follow these simple steps to spread happiness.
        </Title>
        {howIsItWorksContent.map((content, index) => (
          <HomeHowIsItWorks
            {...content}
            isOdd={(index + 1) % 2 !== 0}
            key={content.text}
          />
        ))}
      </div>

      <div className="cta-outer-row">
        <div style={{ textAlign: "center" }}>
          <img
            src={MailBro}
            alt=""
            width={screen === "MOBILE" ? "50%" : "25%"}
          />
        </div>
        <Row className="cta-inner-row" gutter={[0, 8]}>
          <Col {...colOption(16, { order: 2 })}>
            <Title level={2} className="content-title">
              Sign up today and experience the power of seamless event
              management and communication with Eazy Event.
            </Title>
            <Text className="content-title font-size-16" italic>
              Elevate your events, engage your guests, and create unforgettable
              moments!
            </Text>
          </Col>
          <Col {...colOption(4, { order: 1 })}>
            <div style={{ textAlign: "center" }}>
              <img src={MailBro} alt="" width={"100%"} />
            </div>
          </Col>
          {!isAuthorized && (
            <Col
              {...colOption(4, { order: 3 })}
              className="content-btn"
              style={
                screen !== "MOBILE" ? { position: "relative", top: "50px" } : {}
              }
            >
              <Button type="primary" size="large" onClick={verifyAuth}>
                Get Started
              </Button>
            </Col>
          )}
        </Row>
      </div>
    </>
  );
};
