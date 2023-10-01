import { Typography, Col, Row } from "antd";
import React from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import "./styles.scss";

const { Text } = Typography;

type HeaderType = {
  collapsed: boolean;
  currentPage: string;
  setCollapsed: (collapsed: boolean) => void;
};

export const Header = (props: HeaderType) => {
  const { setCollapsed, collapsed, currentPage } = props;
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
            Eazy Event <Text italic>({currentPage})</Text>
          </Text>
        </Col>
        {/* <Col span={12}>
          <Row className="button__container">
            <Col span={12}>
              <Button type="ghost" className="sign-in__button">
                Sign In
              </Button>
            </Col>
            <Col span={12}>
              <Button className="try-free__button">Try Free</Button>
            </Col>
          </Row>
        </Col> */}
      </Row>
    </div>
  );
};
