import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios if you prefer to use it for API calls
import { useNavigate, useSearchParams } from "react-router-dom";
import { API } from "../../api";
import { useBearStore } from "../../store";
import { useWindowSize } from "../../hooks/useWindowSize";
import { Button, Col, Result, Row, Typography } from "antd";
import SuccessTransaction from "../../assets/svg/successful-purchase-animate.svg";
import FailedTransaction from "../../assets/svg/missed-chances-animate.svg";
import { ROUTES_URL } from "../../constants";

export const BuyPlan = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { screen } = useBearStore.appStore();
  const { height } = useWindowSize();

  const status = searchParams.get("status");
  const transactionId = searchParams.get("transactionId");
  const isSuccessTransaction = status === "success";

  return (
    <Row justify="center">
      <Col xs={24} sm={22} md={20} lg={18} xl={22}>
        <Result
          status={isSuccessTransaction ? "success" : "error"}
          icon={
            <img
              loading="lazy"
              src={
                isSuccessTransaction ? SuccessTransaction : FailedTransaction
              }
              alt=""
              width={screen === "MOBILE" ? "100%" : "30%"}
            />
          }
          title={
            isSuccessTransaction
              ? "Successfully Purchased plan!"
              : "Transaction failed!"
          }
          subTitle={
            isSuccessTransaction
              ? "Click the button below to access your dashboard and start using our services."
              : "If the amount has been deducted from your account, please wait a few moments for the plan to be activated in your account."
          }
          extra={[
            <Button
              type="primary"
              key="console"
              onClick={() => {
                navigate(
                  isSuccessTransaction
                    ? `${ROUTES_URL.EE}/${ROUTES_URL.DASHBOARD}`
                    : `${ROUTES_URL.EE}/${ROUTES_URL.MY_PLAN_INVOICE}/${transactionId}`
                );
              }}
            >
              {isSuccessTransaction
                ? "Go to dashboard"
                : "Check the transaction status"}
            </Button>,
          ]}
        />
      </Col>
    </Row>
  );
};
