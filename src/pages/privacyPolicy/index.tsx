import React from "react";
import { Typography } from "antd";
import { useBearStore } from "../../store";
import { privacyPolicyConfig } from "../../configs/privacyPolicy.config";
import "./styles.scss";

const { Title, Paragraph } = Typography;

export const PrivacyPolicy = () => {
  const { screen } = useBearStore.appStore();

  return (
    <div
      className="privacy-policy"
      style={{ padding: screen === "MOBILE" ? "0px 2rem" : "0px 20rem" }}
    >
      <Title level={2}>Privacy Policy</Title>
      <Paragraph className="policy-paragraph">
      Respecting your privacy and protecting it is our commitment.
      <br/>When using Eazy Event, you consent to the practices detailed in this privacy policy.
      </Paragraph>
      {privacyPolicyConfig.map((policy, index) => (
        <Paragraph key={index}>
          <br />
          <strong className="policy-title">
            {index + 1}. {policy.section}
          </strong>
          {policy.content.map((info, subIndex) => (
            <p className="policy-paragraph" key={subIndex}>
              {index + 1}.{subIndex + 1}. <strong>{info.title}:</strong>{" "}
              {info.description}
              
            </p>
          ))}
        </Paragraph>
      ))}
      <br />
      <strong className="policy-title">Modification of this Privacy</strong>
      <br />
      <p className="policy-paragraph">
        Policy We reserve the right to change this Privacy Policy from time to
        time to ensure that it complies with current legal requirements or to
        implement changes to our services in the Privacy Policy, such as when
        introducing new services. Your new visit will be subject to the new
        privacy policy.
      </p>
      <p className="policy-paragraph">Last Updated: 10th Dec, 2023</p>
    </div>
  );
};
