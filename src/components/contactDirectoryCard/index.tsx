import { IdcardOutlined, MoreOutlined } from "@ant-design/icons";
import {
  Avatar,
  Badge,
  Card,
  Col,
  Divider,
  Dropdown,
  Image,
  MenuProps,
  Row,
  Tooltip,
  Typography,
} from "antd";
import React from "react";
import { ContactDirectoryType } from "../../types";
import ContactBookIcon from "../../assets/png/contact-book.png";
import { faAddressBook } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./styles.scss";

const { Title, Text } = Typography;

type ContactCardType = {
  cardContact: ContactDirectoryType;
  menuItems?: MenuProps["items"];
};

export const ContactDirectoryCard = (props: ContactCardType) => {
  const { cardContact, menuItems } = props;
  const avatarClassName = `ee__avatar-color-${cardContact.name
    ?.toString()?.[0]
    ?.toLowerCase()}`;

  const avatarIconLetter = cardContact.name
    ?.toString()
    .split(" ")
    .map((item) => item?.[0])
    .join("");
  return (
    <Row gutter={[8, 8]} className="contact-directory-card__container">
      <Col span={6} className="icon__container">
        <Avatar shape="square" size={40} className={avatarClassName}>
          {avatarIconLetter}
        </Avatar>
      </Col>
      <Col span={menuItems ? 15 : 17}>
        <Text strong className="font-size-16">
          {cardContact.name}
        </Text>
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
