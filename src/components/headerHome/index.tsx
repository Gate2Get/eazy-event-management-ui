import { Typography, Col, Row, Button } from "antd";
import React from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import "./styles.scss";
import { useNavigate } from "react-router-dom";
import { NON_PROTECTED_ROUTES, ROUTES_URL } from "../../constants";

const { Text } = Typography;

type HeaderHomeType = {
  isAuthorized?: boolean | null;
};

export const HeaderHome = (props: HeaderHomeType) => {
  const { isAuthorized } = props;
  const navigate = useNavigate();

  const verifyAuth = () => {
    navigate(ROUTES_URL.AUTHORIZER);
  };
  console.log(
    { pa: window.location.pathname },
    isAuthorized,
    NON_PROTECTED_ROUTES.includes(window.location.pathname)
  );
  return (
    <div className="header-home__container">
      <Text className="app__name" italic>
        Eazy Event
      </Text>
      <div className="get-started__button">
        {!NON_PROTECTED_ROUTES.includes(window.location.pathname) && (
          <Button type="primary" onClick={verifyAuth}>
            Get Started
          </Button>
        )}
      </div>
    </div>
  );
};
