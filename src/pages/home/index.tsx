import React from "react";
import {
  Button,
  Card,
  Col,
  Row,
  Space,
  Statistic,
  theme,
  Typography,
} from "antd";
import "./styles.scss";
import { useBearStore } from "../../store";
import { howIsItWorksContent } from "../../configs/home.config";
import { HomeHowIsItWorks } from "../../components/homeHowIsItWorks";
import { useNavigate } from "react-router-dom";
import { HOME_STAT, ROUTES_URL } from "../../constants";
import { AnimatedText } from "../../components/animatedText";
import EmailCampaign from "../../assets/svg/email-campaign.svg";
import MailBro from "../../assets/svg/mail-bro.svg";
import { StatisticCard } from "../../components/StatisticCard";
import { useSpring, animated } from "react-spring";
import { useInView } from "react-intersection-observer";

const { Title, Text, Paragraph } = Typography;
const AnimatedCard = animated(Card);

export const Home = () => {
  const { screen } = useBearStore.appStore();
  const { isAuthorized } = useBearStore.userStore();
  const navigate = useNavigate();

  const [ref, inView] = useInView({
    triggerOnce: false,
    delay: 200,
  });

  const cardAnimation = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(-50px)",
    config: { tension: 50, friction: 10 },
  });

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
        <Title className="headline" level={screen === "MOBILE" ? 2 : 1}>
          Delivering Joyful Event Notifications
        </Title>
        <div>
          <img
            src={EmailCampaign}
            alt=""
            width={screen === "MOBILE" ? "50%" : "25%"}
          />
        </div>
        <Button type="primary" onClick={verifyAuth}>
          Get Started
        </Button>
        <Title level={screen === "MOBILE" ? 4 : 2} className="sub-heading">
          Make every event memorable with our voice call, SMS notification
          service.
        </Title>
      </div>
      <div
        className="how-is-it-works"
        style={{ padding: screen === "MOBILE" ? "2rem 2rem" : "2rem 6rem" }}
      >
        <Title className="notes" level={screen === "MOBILE" ? 3 : 1}>
          Sending event notifications has never been easier!
        </Title>
        {/* <Title className="steps" level={screen === "MOBILE" ? 3 : 1}>
          Just follow these simple steps to spread happiness.
        </Title> */}
        {howIsItWorksContent.map((content, index) => (
          <HomeHowIsItWorks
            {...content}
            isOdd={(index + 1) % 2 !== 0}
            key={content.text}
          />
        ))}
      </div>

      <div className="cta-outer-row" ref={ref}>
        <AnimatedCard style={{ ...cardAnimation }}>
          <Row className="cta-inner-row" gutter={[0, 8]}>
            <Col {...colOption(16, { order: 2 })}>
              <Title
                level={screen === "MOBILE" ? 3 : 2}
                className="content-title"
                style={{ paddingLeft: screen === "MOBILE" ? 0 : " 2rem" }}
              >
                Sign up today and experience the power of seamless event
                management and communication with Eazy Event.
              </Title>
              <Text
                className="content-title font-size-16"
                style={{ paddingLeft: screen === "MOBILE" ? 0 : " 2rem" }}
                italic
              >
                Elevate your events, engage your guests, and create
                unforgettable moments!
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
                  screen !== "MOBILE"
                    ? { position: "relative", top: "50px" }
                    : {}
                }
              >
                <Button type="primary" onClick={verifyAuth}>
                  Get Started
                </Button>
              </Col>
            )}
          </Row>
        </AnimatedCard>
      </div>
      <Row style={{ textAlign: "center", padding: "0px 24px" }}>
        <Space direction="vertical" style={{ width: "100%" }}>
          <Title style={{ color: "rgb(18, 183, 106)" }}>
            Do you have a special case?
          </Title>
          <Paragraph style={{ fontSize: "1rem", color: "rgb(102, 112, 133)" }}>
            Let’s talk about your specific requirements and see how we can help
            you.
          </Paragraph>
          <Button
            type="primary"
            onClick={() => {
              navigate(ROUTES_URL.CONTACT_US);
            }}
          >
            Contact us
          </Button>
        </Space>
      </Row>
    </>
  );
};
