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
import { TemplateType } from "../../types";
import "./styles.scss";
import {
  CHANNELS,
  CHANNEL_OPTIONS,
  CHANNEL_OPTIONS_MAP,
  EVENT_TYPE_PROPS,
} from "../../constants";

const { Title, Text } = Typography;

type TemplateCardType = {
  template: TemplateType;
  menuItems?: MenuProps["items"];
  onClick?: () => void;
};

export const TemplateCard = (props: TemplateCardType) => {
  const { template, menuItems, onClick } = props;
  const avatarClassName = `ee__avatar-color`;
  // -${template.name?.toString()?.[0]?.toLowerCase()}`;

  const avatarIconLetter = template.name
    ?.toString()
    .split(" ")
    .map((item) => item?.[0])
    .join("");

  const channelComp = CHANNEL_OPTIONS_MAP[template.channel as string];
  const channelLabel = CHANNELS[template.channel as string];

  return (
    <Row gutter={[8, 8]} className="template-card__container">
      <Col span={24}>
        <Row gutter={[8, 8]}>
          <Col
            span={6}
            className="icon__container"
            onClick={() => {
              onClick?.();
            }}
            style={{ cursor: "pointer" }}
          >
            <Avatar shape="square" size={50} className={avatarClassName}>
              {avatarIconLetter}
            </Avatar>
          </Col>
          <Col
            span={menuItems ? 15 : 17}
            onClick={() => {
              onClick?.();
            }}
            style={{ cursor: "pointer" }}
          >
            <Space direction="vertical" size="small">
              <Text strong className="font-size-16">
                {template.name}
              </Text>
              <Text>
                {channelComp} {channelLabel}
              </Text>
            </Space>
          </Col>
          {menuItems && (
            <Col span={3} className="more-item__container">
              <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
                <Tooltip placement="top" title="More info">
                  <MoreOutlined
                    size={64}
                    width={100}
                    className="more-item__icon"
                  />
                </Tooltip>
              </Dropdown>
            </Col>
          )}
        </Row>
      </Col>
    </Row>
  );
};
