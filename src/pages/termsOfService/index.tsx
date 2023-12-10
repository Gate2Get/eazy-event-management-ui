import React from "react";
import { Typography } from "antd";
import { useBearStore } from "../../store";
import { termsOfServiceConfig } from "../../configs/termsOfService.config";
import "./styles.scss";

const { Title, Paragraph } = Typography;

export const TermsOfService = () => {
  const { screen } = useBearStore.appStore();

  return (
    <div
      className="terms-of-service"
      style={{ padding: screen === "MOBILE" ? "0px 2rem" : "0px 20rem" }}
    >
      <Title level={2}>Terms of Service</Title>
      <Paragraph className="terms-paragraph">
        Thank you for choosing Eazy Event! These Terms of Service ("Terms")
        govern your use of our application and the services we provide. By
        accessing or using Eazy Event ("the App"), you agree to comply with and
        be bound by these Terms. If you do not agree with these Terms, please do
        not use the App.
      </Paragraph>
      {termsOfServiceConfig.map((terms, index) => (
        <Paragraph>
          <strong className="terms-title">
            {index + 1}. {terms.title}
          </strong>
          <br />
          <br />
          {terms.information.map((info, subIndex) => (
            <p className="terms-paragraph">
              {index + 1}.{subIndex + 1}. <strong>{info.title}:</strong>{" "}
              {info.information}
              <br />
            </p>
          ))}
        </Paragraph>
      ))}
      <br />
      <p className="terms-paragraph">
        By using the App, you agree to these Terms of Service. We reserve the
        right to update or modify these Terms at any time without prior notice.
        It is your responsibility to review these Terms periodically.
      </p>
      <p className="terms-paragraph">Last Updated: 10th Dec, 2023</p>
    </div>
  );
};
