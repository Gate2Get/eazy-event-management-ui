import { Button, Col, Row } from "antd";
import React from "react";
import "./styles.scss";

export const Header = () => {
  return (
    <div className="header__container">
      <Row>
        <Col span={12} className="">
          Eazy Event
        </Col>
        <Col span={12}>
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
        </Col>
      </Row>
    </div>
  );
};
