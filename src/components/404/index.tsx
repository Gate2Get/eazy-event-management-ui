import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Result, Typography } from "antd";
import NotFound from "../../assets/svg/404.svg";
import { useBearStore } from "../../store";

const { Title, Paragraph } = Typography;

export const App404: React.FC = () => {
  const { screen } = useBearStore.appStore();
  return (
    <Result
      subTitle={
        <div>
          <Paragraph>
            The page you are trying to access does not exist or has been moved.
          </Paragraph>
          <Paragraph>Try going back to our homepage.</Paragraph>
        </div>
      }
      title={<Title level={3}>Oops! Page not found</Title>}
      icon={
        <img
          src={NotFound}
          alt=""
          width={screen === "MOBILE" ? "100%" : "30%"}
        />
      }
      extra={
        <Button
          type="primary"
          onClick={() => {
            window.location.replace("/");
          }}
        >
          Back to home
        </Button>
      }
    />
  );
};
