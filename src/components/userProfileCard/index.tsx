import React from "react";
import { Avatar, Col, Row } from "antd";

type UserProfileCardType = {
  name: string;
  mobile?: string;
  picture: string;
};

export const UserProfileCard = (props: UserProfileCardType) => {
  const { name, picture, mobile } = props;
  return (
    <div>
      <Row>
        <Col span={6} style={{ alignSelf: "center" }}>
          <Avatar
            shape="square"
            size={48}
            icon={
              <img loading="lazy" src={picture} alt={name?.[0] as string} />
            }
          />
        </Col>
        <Col span={18}>
          <div>{name}</div>
          <div>{mobile}</div>
        </Col>
      </Row>
    </div>
  );
};
