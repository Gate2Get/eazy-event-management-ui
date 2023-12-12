import React from "react";
import { Avatar, Col, Divider, Row, Space, Typography } from "antd";
import "./styles.scss";
import { PRICING_CARDS } from "../../constants";
import { useBearStore } from "../../store";

const { Text, Title, Paragraph } = Typography;
const cardCount = 24 / PRICING_CARDS.length;

export const Pricing = () => {
  const { screen } = useBearStore.appStore();

  const colOption = (count: number) =>
    screen === "MOBILE"
      ? {
          flex: count,
        }
      : { span: count };
  return (
    <div className="pricing__container">
      <Title level={2} className="pricing-title">
        Communication Channels Pricing Plans
      </Title>
      <Row gutter={[16, 16]}>
        {PRICING_CARDS.map((pricing) => (
          <Col key={pricing.title} {...colOption(cardCount)}>
            <Space className="pricing-card" direction="vertical">
              {pricing.icon}
              <Title level={4}>{pricing.title}</Title>
              <div className="info">
                <ul>
                  {pricing.info.map((info) => (
                    <li key={info}>{info}</li>
                  ))}
                </ul>
              </div>
              <Divider />
              <Title level={5}>{pricing.price}</Title>
            </Space>
          </Col>
        ))}
      </Row>
    </div>
  );
};

// ecf3ff
