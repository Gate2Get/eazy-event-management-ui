import { IdcardOutlined, MoreOutlined } from "@ant-design/icons";
import {
  Avatar,
  Badge,
  Card,
  Col,
  Dropdown,
  MenuProps,
  Row,
  Typography,
} from "antd";
import React from "react";
import { ContactDirectoryType } from "../../types";

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
  return (
    <Badge.Ribbon text={cardContact.noOfContacts} color="">
      <Card>
        <Row gutter={[8, 8]}>
          <Col span={4}>
            <Avatar className={avatarClassName} icon={<IdcardOutlined />} />
          </Col>
          <Col span={menuItems ? 18 : 20}>
            <Text>{cardContact.name}</Text>
          </Col>
          {menuItems && (
            <Col span={2}>
              <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
                <MoreOutlined />
              </Dropdown>
            </Col>
          )}
        </Row>
      </Card>
    </Badge.Ribbon>
  );
};
