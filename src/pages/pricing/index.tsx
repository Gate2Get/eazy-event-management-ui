import React, { useState } from "react";
import { Avatar, Col, Divider, Row, Space, Typography } from "antd";
import "./styles.scss";
import { PRICING_CARDS } from "../../constants";
import { useBearStore } from "../../store";
import PricingPage from "../../components/PricingCard";
import { API } from "../../api";
import { PlanType } from "../../types";
const { Text, Title, Paragraph } = Typography;
const cardCount = 24 / PRICING_CARDS.length;

export const Pricing = () => {
  const { screen } = useBearStore.appStore();
  const { activePlan } = useBearStore.userStore();
  console.log({activePlan})
  const [plans, setPlans] = useState<any>([]);

  React.useEffect(() => {
    getPlans();
  }, []);
  const colOption = (count: number) =>
    screen === "MOBILE"
      ? {
          flex: count,
        }
      : { span: count };

  const getPlans = (): void => {
    API.commonAPI
      .getPricingPlans()
      .then((data: PlanType[]) => {
        setPlans(data);
      })
      .catch((error: Error) => {
        console.log({ location: "getPlans", error });
      });
  };
  return (
    <div className="pricing__container">
      <Title level={2} className="pricing-title">
        Communication Channels Pricing Plans
      </Title>
      <Row gutter={[16, 16]}>
        {(plans as PlanType[]).map((plan) => (
          <Col {...colOption(8)}>
            <PricingPage
              isActive={plan.id===activePlan?.planId} // get user active plan from user plan api
              actualCost={plan.price}
              contactDirCount={plan.contactDirectoryCount}
              contactsCount={plan.contactCount}
              eventCount={plan.eventCount}
              notificationsCount={plan.notificationCredit}
              planName={plan.type}
              templatesCount={plan.templateCount}
              discountCost={300}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

// ecf3ff
