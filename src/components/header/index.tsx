import { Button, Col, Row } from "antd";
import React from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import "./styles.scss";

type HeaderType = {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
};

export const Header = (props: HeaderType) => {
  const { setCollapsed, collapsed } = props;
  return (
    <div className="header__container">
      <Row>
        <Col span={12} className="">
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "layout__trigger-sidebar",
              onClick: () => {
                setCollapsed(!collapsed);
              },
            }
          )}
          Eazy Event
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
