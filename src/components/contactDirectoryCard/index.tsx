import {
  ContactsOutlined,
  IdcardOutlined,
  MoreOutlined,
} from "@ant-design/icons";
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
  Space,
  Tag,
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
  onClick?: () => void;
};

export const ContactDirectoryCard = (props: ContactCardType) => {
  const { cardContact, menuItems, onClick } = props;
  const avatarClassName = `ee__avatar-color-${cardContact.name
    ?.toString()?.[0]
    ?.toLowerCase()}`;

  const avatarIconLetter = cardContact.image ? (
    <img src={cardContact.image} alt="" />
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
