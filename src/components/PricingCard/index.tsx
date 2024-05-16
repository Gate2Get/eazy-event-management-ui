import React from "react";
import "./pricingCard.scss";
import { Badge, Row, Col, Card, Space, Button } from "antd";
import { useBearStore } from "../../store";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ROUTES_URL } from "../../constants";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

type PricingPageType = {
  planName: string;
  actualCost: number;
  discountCost?: number;
  eventCount: number;
  contactDirCount: number;
  contactsCount: number;
  templatesCount: number;
  notificationsCount: number;
  isActive?: boolean;
  isBuy?: boolean;
  onBuy?: () => void;
};

const PricingPage = (props: PricingPageType) => {
  const { screen } = useBearStore.appStore();
  const navigate = useNavigate();
  const {
    actualCost,
    contactDirCount,
    contactsCount,
    eventCount,
    notificationsCount,
    planName,
    templatesCount,
    discountCost,
    isActive,
    isBuy,
    onBuy,
  } = props;
  return (
    <span className="pricing__card">
      <div
        className="pricing-page"
        style={{ padding: screen !== "MOBILE" ? "40px" : "15px" }}
      >
        <Badge.Ribbon
          text={"Active Plan"}
          style={!isActive ? { visibility: "hidden" } : {}}
        >
          <div className={`pricing-plan ${isActive ? "active-plan" : ""}`}>
            <h2 className="pricing-plan-title">{planName}</h2>
            <p className="pricing-plan-price">
              {discountCost && (
                <Space direction="vertical">
                  <span className="original-price">₹{actualCost}</span>
                  <span>₹{discountCost}</span>
                </Space>
              )}
              {!discountCost && <span> ₹{actualCost}</span>}
            </p>
            <ul className="pricing-plan-features">
              <li>
                Create <strong>{eventCount}</strong> events
              </li>
              <li>
                Organize with <strong>{contactDirCount} directories</strong>
              </li>
              <li>
                Up to
                <strong> {contactsCount} contacts </strong> on each directories
              </li>
              <li>
                Create upto <strong>{templatesCount} </strong>custom voice
                templates
              </li>
              <li>
                Fire off{" "}
                <strong>up to {notificationsCount} notifications</strong>
              </li>
            </ul>
            {isBuy && (
              <Row>
                <Col span={24}>
                  <div>
                    <Button type="primary" size="large" onClick={onBuy}>
                      Buy plan
                    </Button>
                  </div>
                </Col>
              </Row>
            )}
            {isActive && (
              <Row style={{ paddingTop: "20px" }}>
                <Col span={24}>
                  <Button
                    type="link"
                    onClick={() => {
                      navigate(
                        `${ROUTES_URL.EE}/${ROUTES_URL.MY_PLAN_DETAILS}`
                      );
                    }}
                    icon={<ArrowForwardIcon fontSize="inherit" />}
                  >
                    <span>View plan info</span>
                  </Button>
                </Col>
              </Row>
            )}
          </div>
        </Badge.Ribbon>
      </div>
    </span>
  );
};

export default PricingPage;
