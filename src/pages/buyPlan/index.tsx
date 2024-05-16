import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios if you prefer to use it for API calls
import { useSearchParams } from "react-router-dom";
import { API } from "../../api";
import { useBearStore } from "../../store";
import { useWindowSize } from "../../hooks/useWindowSize";
import { Typography } from "antd";

const { Title, Text } = Typography;

export const BuyPlan = () => {
  const [paymentStatus, setPaymentStatus] = useState(undefined);
  const [searchParams, setSearchParams] = useSearchParams();
  const { setLoading } = useBearStore.appStore();
  const { height } = useWindowSize();

  useEffect(() => {
    const paymentToken = searchParams.get("paymentToken");
    if (paymentToken) {
      checkPlanPaymentAndAssignPlan(paymentToken);
    }
    return () => {
      setPaymentStatus(undefined);
    };
  }, []); // Empty dependency array ensures useEffect runs only once, similar to componentDidMount

  const checkPlanPaymentAndAssignPlan = (paymentToken: string): void => {
    setLoading(true);
    API.paymentAPI
      .checkPlanPaymentAndAssignPlan(paymentToken)
      .then((data) => {
        setLoading(false);
        const { status, message } = data;
        setPaymentStatus(status);
      })
      .catch((error: Error) => {
        setLoading(false);
        console.log({ location: "checkPlanPaymentAndAssignPlan", error });
      });
  };

  return (
    <div style={{ textAlign: "center", height: height - 100 }}>
      {/* Render the HTML content using dangerouslySetInnerHTML */}
      <Title level={3}>Processing payment....</Title>
      <div>
        <Text italic> Please don't close your browser</Text>
      </div>
      {paymentStatus === true && <div>Payment success</div>}
      {paymentStatus === false && <div>Payment failed!</div>}
    </div>
  );
};
