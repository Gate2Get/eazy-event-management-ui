import { Typography, Col, Row, Popover, Space, Button, Avatar } from "antd";
import React from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import "./styles.scss";
import { useBearStore } from "../../store";
import LogoutIcon from "@mui/icons-material/Logout";
import { API } from "../../api";
import { useNavigate } from "react-router-dom";
import { ROUTES_URL } from "../../constants";
import { userMenuConfig } from "../../configs/userMenu.config";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const { Text } = Typography;

type HeaderType = {
  collapsed: boolean;
  currentPage: string;
  setCollapsed: (collapsed: boolean) => void;
};

export const Header = (props: HeaderType) => {
  const { setCollapsed, collapsed, currentPage } = props;
  const { user, setIsAuthorized, activePlan } = useBearStore.userStore();
  const { setLoading, setCurrentPage, screen } = useBearStore.appStore();
  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();

  const hide = () => {
    if (!collapsed && screen === "MOBILE") {
      setCollapsed(true);
    }
    setOpen(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const logout = () => {
    setLoading(true);
    hide();
    API.userManagement
      .logout()
      .then((isLoggedOut) => {
        setLoading(false);
        setIsAuthorized(false);
        setCurrentPage("");
        navigate(ROUTES_URL.HOME);
      })
      .catch((error) => {
        setLoading(false);
        console.log({ location: "logout", error });
      });
  };

  const handleProfileClick = () => {
    hide();
    navigate(`${ROUTES_URL.EE}/${ROUTES_URL.MY_PROFILE}`);
  };

  const handleMyPlanClick = () => {
    hide();
    navigate(`${ROUTES_URL.EE}/${ROUTES_URL.MY_PLAN}`);
  };

  const handleMyPlanPurchaseHistoryClick = () => {
    hide();
    navigate(`${ROUTES_URL.EE}/${ROUTES_URL.MY_PLAN_TRANSACTION_HISTORY}`);
  };

  const handleServiceTransactionLogsClick = () => {
    hide();
    navigate(`${ROUTES_URL.EE}/${ROUTES_URL.SERVICE_TRANSACTION_LOGS}`);
  };

  return (
    <div className="header__container">
      <Row>
        <Col flex={24}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "layout__trigger-sidebar",
              onClick: () => {
                setCollapsed(!collapsed);
              },
            }
          )}
          <Text className="app__name">
            Eazy Event
            {/* <Text className="current-tab" italic>
              ({currentPage})
            </Text> */}
          </Text>
        </Col>
        <Col span={12}>
          <Popover
            placement="bottomRight"
            content={
              <Space direction="vertical">
                {userMenuConfig.map((item) => (
                  <Button
                    type="text"
                    icon={item.icon}
                    onClick={() => {
                      hide();
                      navigate(item.href);
                    }}
                    style={{ width: "100%", textAlign: "start" }}
                  >
                    {item.name}
                  </Button>
                ))}
                <Button
                  type="text"
                  icon={<LogoutIcon fontSize="inherit" />}
                  onClick={logout}
                  style={{ width: "100%", textAlign: "start" }}
                >
                  Logout
                </Button>
              </Space>
            }
            trigger="click"
            open={open}
            onOpenChange={handleOpenChange}
          >
            <Space className="float-right">
              <Avatar src={user.picture} />
              <div className="user__button">
                <Text>
                  <div style={{ fontSize: "16px" }}>
                    {user.firstName} <ArrowDropDownIcon fontSize="inherit" />
                  </div>
                  <div style={{ fontSize: "12px" }}>
                    <span>
                      {activePlan?.pricingPlan?.name || "No active plan"}
                    </span>
                  </div>
                </Text>
              </div>
            </Space>
          </Popover>
        </Col>
      </Row>
    </div>
  );
};
