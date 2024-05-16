import React, { useState } from "react";
import { Alert, Avatar, Col, Divider, Row, Space, Typography } from "antd";
import "./styles.scss";
import { PRICING_CARDS, ROUTES_URL } from "../../constants";
import { useBearStore } from "../../store";
import PricingPage from "../../components/PricingCard";
import { API } from "../../api";
import { PricingPlanType } from "../../types";
import { useNavigate } from "react-router-dom";
const { Text, Title, Paragraph, Link } = Typography;
const cardCount = 24 / PRICING_CARDS.length;

type PricingType = {
  isPricingPage?: boolean;
};

export const Pricing = (props: PricingType) => {
  const { isPricingPage } = props;
  const { screen, setLoading } = useBearStore.appStore();
  const { activePlan } = useBearStore.userStore();
  console.log({ activePlan });
  const [plans, setPlans] = useState<any>([]);
  const navigate = useNavigate();

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
          const _plan = [];
          const plan = data.filter((item) => item.id !== activePlan?.planId);
          const _activePlan = data.find(
            (item) => item.id === activePlan?.planId
          );
          console.log({ _activePlan, data });
          if (_activePlan) {
            _plan.push(_activePlan);
          }
          _plan.push(...plan);
          console.log({ _plan });
          setPlans(_plan);
        }
      })
      .catch((error: Error) => {
        console.log({ location: "getPlans", error });
      });
  };

  const buyPlanPayment = (planId: string): void => {
    setLoading(true);
    API.paymentAPI
      .buyPlanPayment(planId)
      .then((data) => {
        setLoading(false);
        const { status, url } = data;
        if (status) {
          // navigate(
          //   `${ROUTES_URL.EE}/${ROUTES_URL.BUY_PLAN}?paymentUrl=${btoa(url)}`
          // );
          window.location.href = url;
        }
      })
      .catch((error: Error) => {
        setLoading(false);
        console.log({ location: "buyPlanPayment", error });
      });
  };

  console.log({ plans, activePlan });

  return (
    <div className="pricing__container">
      <Title level={2} className="pricing-title">
        Communication Channels Pricing Plans
      </Title>
      <Alert
        type="info"
        message={
          <Title level={5}>
            Are the following plans not suitable for your case?
          </Title>
        }
        description={
          <Text italic>
            If you're seeking a customized plan, please contact us at{" "}
            <Link href="mailto:admin@eazy-event.com?subject=Custom%20Plan%20&body=Hi%20Team,%0D%0A%0D%0AI%20am%20interested%20in%20a%20customized%20plan%20for%20my%20event.%20Please%20find%20the%20below%20requirement%0D%0AAlbum%20Count%20-%20%0D%0AEvent%20Count%20-%20%0D%0AContact%20Directory%20-%20%0D%0AContact%20Count%20(each%20directory)%20-%20%0D%0ATemplate%20Count%20-%20%0D%0ANotification%20Credit%20-%20%0D%0A%0D%0AThanks.">
              Eazy Event
            </Link>{" "}
            and fill the required values and send it .
          </Text>
        }
      />
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
              isBuy={plan.type !== "FREE"}
              onBuy={() => {
                buyPlanPayment(plan.id);
              }}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};
