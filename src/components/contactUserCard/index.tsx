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
import {
  EVENT_SEND_STATUS_LABEL_MAP,
  EVENT_SEND_STATUS_MAP,
} from "../../constants";
import { ContactDirectoryType, EditConfigType } from "../../types";
import "./styles.scss";

const { Title, Text } = Typography;

type ContactUserCardType = {
  id: string;
  name: string;
  mobile: number;
  status?: number;
  menuItems?: MenuProps["items"];
  editable?: boolean | EditConfigType;
};

export const ContactUserCard = (props: ContactUserCardType) => {
  const { mobile, name, id, menuItems, editable, status } = props;

  const avatarClassName = `ee__avatar-color-${name
    ?.toString()?.[0]
    ?.toLowerCase()}`;

  const avatarIconLetter = name
    ?.toString()
    .split(" ")
    .map((item) => item?.[0])
    .join("");

  return (
    <Badge.Ribbon
      className={!status ? "contact-card__no-status" : ""}
      text={EVENT_SEND_STATUS_MAP[status?.toString() as string]}
      color={EVENT_SEND_STATUS_LABEL_MAP[status?.toString() as string]}
    >
      <Card className="contact-user-card__container">
        <Row gutter={[8, 8]}>
          <Col span={4}>
            <Avatar size={40} className={avatarClassName}>
              {avatarIconLetter}
            </Avatar>
          </Col>
          <Col span={menuItems ? 18 : 20}>
            <div>
              <Text strong ellipsis editable={editable}>
                {name}
              </Text>
            </div>
            <div>
              <Text>{mobile}</Text>
            </div>
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
