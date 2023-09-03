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
import { CHANNEL_OPTIONS, EVENT_TYPE_PROPS } from "../../constants";

const { Title, Text } = Typography;

type TemplateCardType = {
  template: TemplateType;
  menuItems?: MenuProps["items"];
};

export const TemplateCard = (props: TemplateCardType) => {
  const { template, menuItems } = props;
  const avatarClassName = `ee__avatar-color-${template.name
    ?.toString()?.[0]
    ?.toLowerCase()}`;

  const avatarIconLetter = template.name
    ?.toString()
    .split(" ")
    .map((item) => item?.[0])
    .join("");

  const channelComp = CHANNEL_OPTIONS.find(
    (item) => item.value === template.channel
  );

  return (
    <Row gutter={[8, 8]} className="template-card__container">
      <Col span={24}>
        <Row gutter={[8, 8]}>
          <Col span={6} className="icon__container">
            <Avatar shape="square" size={40} className={avatarClassName}>
              {avatarIconLetter}
            </Avatar>
          </Col>
          <Col span={menuItems ? 15 : 17}>
            <Text strong className="font-size-16">
              {template.name}
            </Text>
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
        <Row className="event-type">
          <Col span={12}>
            <Text italic strong className="event-type__label">
              {EVENT_TYPE_PROPS[template.type as string].label}
            </Text>
          </Col>
          <Col span={12} className="event-channel__label">
            {channelComp?.label as React.ReactNode}
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
