import React from "react";
import { MoreOutlined } from "@ant-design/icons";
import {
  Avatar,
  Col,
  Dropdown,
  MenuProps,
  Row,
  Space,
  Tooltip,
  Typography,
} from "antd";
import { ContactDirectoryType } from "../../types";
import "./styles.scss";

const { Title, Text } = Typography;

type ContactCardType = {
  cardContact: ContactDirectoryType;
  menuItems?: MenuProps["items"];
  onClick?: () => void;
};

export const ContactDirectoryCard = (props: ContactCardType) => {
  const { cardContact, menuItems, onClick } = props;
  const avatarClassName = `ee__avatar-color`;
  // - ${ cardContact.name?.toString()?.[0]?.toLowerCase()}`;

  const avatarIconLetter = cardContact.image ? (
    <img loading="lazy" src={cardContact.image} alt="" />
  ) : (
    cardContact.name
      ?.toString()
      .split(" ")
      .map((item) => item?.[0])
      .join("")
  );
  return (
    <Row gutter={[-8, 16]} className="contact-directory-card__container">
      <Col span={6} className="icon__container" onClick={() => onClick?.()}>
        <Avatar shape="square" size={50} className={avatarClassName}>
          {avatarIconLetter}
        </Avatar>
      </Col>
      <Col span={menuItems ? 15 : 17} onClick={() => onClick?.()}>
        <Space direction="vertical">
          <Text strong className="font-size-16">
            {cardContact.name}
          </Text>
          {/* <Tag
            icon={<ContactsOutlined />}
            // color="#d0e1fd"
            className="contact-tag"
          > */}
          <Text italic>{cardContact.noOfContacts} contact's</Text>
          {/* </Tag> */}
        </Space>
      </Col>
      {menuItems && (
        <Col span={3} className="more-item__container">
          <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
            <Tooltip placement="top" title="More info">
              <MoreOutlined size={64} width={100} className="more-item__icon" />
            </Tooltip>
          </Dropdown>
        </Col>
      )}
    </Row>
  );
};
