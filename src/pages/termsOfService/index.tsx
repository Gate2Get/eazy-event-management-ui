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
      {termsOfServiceConfig.map((terms, index) => (
        <Paragraph key={index}>
          <br />
          <strong className="terms-title">
            {index + 1}. {terms.title}
          </strong>
          <br />
          {terms.information.map((info, subIndex) => (
            <p className="terms-paragraph" key={subIndex}>
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
