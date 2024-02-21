import { Typography, Col, Row, Button, Drawer, Space, Divider } from "antd";
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
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Logo from "../../assets/png/logoEazyEvent.png";
import CloseIcon from "@mui/icons-material/Close";
import { homeDrawerMenu } from "../../configs/home.config";

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
        <img
          loading="lazy"
          src={Logo}
          alt=""
          width={30}
          style={{ position: "relative", top: "7px" }}
        />
        {"  "}Eazy Event
      </Text>
      {screen === "MOBILE" ? (
        <span>
          <MenuOutlined onClick={showDrawer} className="menu-icon" size={64} />
        </span>
      ) : (
        <span>
          <div className="get-started__button">
            <Button type="text" onClick={() => navigate(ROUTES_URL.PRICING)}>
              Pricing
            </Button>
            <Button type="text" onClick={() => navigate(ROUTES_URL.CONTACT_US)}>
              Contact us
            </Button>
            {!NON_PROTECTED_ROUTES.includes(window.location.pathname) && (
              <Button type="primary" onClick={verifyAuth}>
                Get Started
              </Button>
            )}
          </div>
        </span>
      )}

      <Drawer
        placement="top"
        width={500}
        onClose={onClose}
        open={open}
        closeIcon={<CloseIcon />}
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          {homeDrawerMenu.map((menu) => (
            <Row
              onClick={() => {
                navigate(menu.link);
                onClose();
              }}
              key={menu.label}
            >
              <Col span={20}>
                <Button type="text">{menu.label}</Button>
              </Col>
              <Col span={4}>
                <ArrowForwardIcon
                  style={{ float: "right", color: "#667085" }}
                />
              </Col>
            </Row>
          ))}

          <Divider style={{ margin: "0px" }} />
          <Row
            onClick={() => {
              verifyAuth();
              onClose();
            }}
          >
            <Col span={20}>
              <Button type="text">Get Started</Button>
            </Col>
            <Col span={4}>
              <ArrowForwardIcon style={{ float: "right", color: "#667085" }} />
            </Col>
          </Row>

          <Divider style={{ margin: "0px" }} />
        </Space>
      </Drawer>
    </div>
  );
};
