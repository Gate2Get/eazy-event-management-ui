import { IdcardOutlined, MoreOutlined } from "@ant-design/icons";
import {
  Avatar,
  Badge,
  Card,
  Col,
  Dropdown,
  Input,
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

const { Title, Text, Paragraph } = Typography;

type ContactUserCardType = {
  id: string;
  name: string;
  mobile: number;
  image?: string;
  status?: number;
  menuItems?: MenuProps["items"];
  editable?: boolean | EditConfigType;
  isError?: boolean;
  onContactChange?: (id: string, name: string, value: string) => void;
};

export const ContactUserCard = (props: ContactUserCardType) => {
  const {
    mobile,
    name,
    id,
    menuItems,
    editable,
    status,
    image,
    isError,
    onContactChange,
  } = props;

  const avatarClassName = image
    ? ""
    : `ee__avatar-color-${name?.toString()?.[0]?.toLowerCase()}`;

  const userAvatar = image ? (
    <Avatar shape="square" size={50} src={image} />
  ) : (
    <Avatar shape="square" size={50} className={avatarClassName}>
      {name
        ?.toString()
        .split(" ")
        .map((item) => item?.[0])
        .join("")}
    </Avatar>
  );

  return (
    <Badge.Ribbon
      className={!status ? "contact-card__no-status" : ""}
      text={EVENT_SEND_STATUS_MAP[status?.toString() as string]}
      color={EVENT_SEND_STATUS_LABEL_MAP[status?.toString() as string]}
    >
      <Card className="contact-user-card__container">
        <Row gutter={[-8, 16]}>
          <Col span={6}>{userAvatar}</Col>
          <Col span={menuItems ? 15 : 17}>
            <div style={editable ? { marginBottom: "5px" } : {}}>
              {editable ? (
                <Input
                  placeholder="Input user name"
                  status={isError && !name ? "error" : ""}
                  value={name}
                  onChange={(e) => {
                    onContactChange?.(id, "name", e.target.value);
                  }}
                />
              ) : (
                <Text
                  strong
                  placeholder=""
                  contentEditable={true}
                  editable={
                    editable && {
                      tooltip: "click to edit text",
                      onChange: (value) => onContactChange?.(id, "name", value),
                      triggerType: ["text"],
                    }
                  }
                >
                  {name}
                </Text>
              )}
            </div>
            <div>
              {editable ? (
                <Input
                  placeholder="Input user mobile"
                  status={isError && !mobile ? "error" : ""}
                  value={mobile}
                  onChange={(e) => {
                    onContactChange?.(id, "mobile", e.target.value);
                  }}
                  maxLength={10}
                />
              ) : (
                <Text
                  editable={
                    editable && {
                      maxLength: 10,
                      tooltip: "click to edit text",
                      onChange: (value) =>
                        onContactChange?.(id, "mobile", value),
                      triggerType: ["text"],
                    }
                  }
                >
                  {mobile.toString()}
                </Text>
              )}
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
