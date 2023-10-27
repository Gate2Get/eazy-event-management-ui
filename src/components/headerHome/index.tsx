import { Typography, Col, Row, Button } from "antd";
import React from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import "./styles.scss";
import { useNavigate } from "react-router-dom";
import { ROUTES_URL } from "../../constants";

const { Text } = Typography;

type HeaderHomeType = {
  onLoginHandle?: () => void;
};

export const HeaderHome = (props: HeaderHomeType) => {
  const { onLoginHandle } = props;
  const navigate = useNavigate();

  const verifyAuth = () => {
    navigate(ROUTES_URL.AUTHORIZER);
  };

  return (
    <div className="header-home__container">
      <Text className="app__name" italic>
        Eazy Event
      </Text>
      <div className="get-started__button">
        {onLoginHandle && (
          <Button type="primary" onClick={verifyAuth}>
            Get Started
          </Button>
        )}
      </div>
    </div>
  );
};
