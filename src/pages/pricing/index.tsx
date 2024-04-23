import React, { useState } from "react";
import { Avatar, Col, Divider, Row, Space, Typography } from "antd";
import "./styles.scss";
import { PRICING_CARDS } from "../../constants";
import { useBearStore } from "../../store";
import PricingPage from "../../components/PricingCard";
import { API } from "../../api";
import { PricingPlanType } from "../../types";
const { Text, Title, Paragraph } = Typography;
const cardCount = 24 / PRICING_CARDS.length;

type PricingType = {
  isPricingPage?: boolean;
};

export const Pricing = (props: PricingType) => {
  const { isPricingPage } = props;
  const { screen, currentPage } = useBearStore.appStore();
  const { activePlan } = useBearStore.userStore();
  console.log({ activePlan });
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
      .then((data: PricingPlanType[]) => {
        if (isPricingPage) {
          setPlans(data);
        } else {
          const plan = data.filter((item) => item.id !== activePlan?.planId);
          const _activePlan = data.find(
            (item) => item.id === activePlan?.planId
          );
          setPlans([_activePlan, ...plan]);
        }
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
        {(plans as PricingPlanType[]).map((plan) => (
          <Col {...colOption(8)}>
            <PricingPage
              isActive={plan.id === activePlan?.planId} // get user active plan from user plan api
              actualCost={plan.price}
              contactDirCount={plan.contactDirectoryCount}
              contactsCount={plan.contactCount}
              eventCount={plan.eventCount}
              notificationsCount={plan.notificationCredit}
              planName={plan.type}
              templatesCount={plan.templateCount}
              discountCost={plan.discountPrice}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};
