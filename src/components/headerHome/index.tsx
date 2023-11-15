import { Typography, Col, Row, Button, Drawer, Space } from "antd";
import React from "react";
import {
  MenuFoldOutlined,
  MenuOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import "./styles.scss";
import { useNavigate } from "react-router-dom";
import { NON_PROTECTED_ROUTES, ROUTES_URL } from "../../constants";
import { useBearStore } from "../../store";
import { faPhone, faIndianRupee } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const { Text } = Typography;

type HeaderHomeType = {
  isAuthorized?: boolean | null;
};

export const HeaderHome = (props: HeaderHomeType) => {
  const { isAuthorized } = props;
  const { screen } = useBearStore.appStore();
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const verifyAuth = () => {
    navigate(ROUTES_URL.AUTHORIZER);
  };

  return (
    <div className="header-home__container">
      <Text
        className="app__name"
        onClick={() => {
          navigate("/");
        }}
      >
        Eazy Event
      </Text>
      {screen === "MOBILE" ? (
        <span>
          <MenuOutlined onClick={showDrawer} className="menu-icon" size={64} />
        </span>
      ) : (
        <span>
          <div className="get-started__button">
            <Button
              size="large"
              type="text"
              onClick={() => navigate(ROUTES_URL.PRICING)}
            >
              Pricing
            </Button>
            {!NON_PROTECTED_ROUTES.includes(window.location.pathname) && (
              <Button type="primary" onClick={verifyAuth}>
                Get Started
              </Button>
            )}
          </div>
        </span>
      )}

      <Drawer placement="top" width={500} onClose={onClose} open={open}>
        <Space direction="vertical">
          <Button
            icon={<FontAwesomeIcon icon={faIndianRupee} />}
            size="large"
            type="text"
            onClick={() => {
              navigate(ROUTES_URL.PRICING);
              onClose();
            }}
          >
            Pricing
          </Button>
          <Button
            type="text"
            onClick={() => {
              verifyAuth();
              onClose();
            }}
          >
            Get Started
          </Button>
        </Space>
      </Drawer>
    </div>
  );
};
