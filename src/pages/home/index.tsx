import React from "react";
import { Button, Col, Row, theme, Typography } from "antd";
import "./styles.scss";
import { useBearStore } from "../../store";
import { howIsItWorksContent } from "../../configs/home.config";
import { HomeHowIsItWorks } from "../../components/homeHowIsItWorks";
import { useNavigate } from "react-router-dom";
import { ROUTES_URL } from "../../constants";

const { Title, Text } = Typography;

export const Home = () => {
  const { screen } = useBearStore.appStore();
  const navigate = useNavigate();

  const colOption = (count: number) =>
    screen === "MOBILE"
      ? {
          flex: count,
        }
      : { span: count };

  const verifyAuth = () => {
    navigate(ROUTES_URL.AUTHORIZER);
  };

  return (
    <>
      <div style={{ minHeight: 380 }} className="body-content">
        <Title className="headline">
          Delivering Joyful Event Notifications
        </Title>
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
        <Row className="cta-inner-row">
          <Col {...colOption(20)}>
            <Title level={2} className="content-title">
              Sign up today and experience the power of seamless event
              management and communication with Eazy Event.
            </Title>
            <Text className="content-title font-size-16" italic>
              Elevate your events, engage your guests, and create unforgettable
              moments!
            </Text>
          </Col>
          <Col
            {...colOption(4)}
            className="content-btn"
            style={
              screen !== "MOBILE" ? { position: "relative", top: "50px" } : {}
            }
          >
            <Button type="primary" size="large" onClick={verifyAuth}>
              Get Started
            </Button>
          </Col>
        </Row>
      </div>
    </>
  );
};
