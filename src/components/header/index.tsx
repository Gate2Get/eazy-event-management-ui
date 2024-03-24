import { Typography, Col, Row, Popover, Space, Button } from "antd";
import React from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import "./styles.scss";
import { useBearStore } from "../../store";
import LogoutIcon from "@mui/icons-material/Logout";
import { API } from "../../api";
import { useNavigate } from "react-router-dom";
import { ROUTES_URL } from "../../constants";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import PersonIcon from "@mui/icons-material/Person";
import ArticleIcon from "@mui/icons-material/Article";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

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
                <Button
                  type="text"
                  icon={<PersonIcon fontSize="inherit" />}
                  onClick={handleProfileClick}
                >
                  My profile
                </Button>

                <Button
                  type="text"
                  icon={<ArticleIcon fontSize="inherit" />}
                  onClick={handleMyPlanClick}
                >
                  My plan
                </Button>
                <Button
                  type="text"
                  icon={<ReceiptLongIcon fontSize="inherit" />}
                  onClick={handleServiceTransactionLogsClick}
                >
                  Transaction logs
                </Button>
                <Button
                  type="text"
                  icon={<LogoutIcon fontSize="inherit" />}
                  onClick={logout}
                >
                  Logout
                </Button>
              </Space>
            }
            trigger="click"
            open={open}
            onOpenChange={handleOpenChange}
          >
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
          </Popover>
        </Col>
      </Row>
    </div>
  );
};
