import { EditOutlined, EllipsisOutlined, EyeOutlined } from "@ant-design/icons";
import {
  Col,
  Dropdown,
  MenuProps,
  Row,
  Space,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import React from "react";
import {
  EVENT_STATUS,
  EVENT_STATUS_LABEL,
  EVENT_STATUS_LABEL_COLOR,
  EVENT_TYPES,
  EVENT_TYPE_PROPS,
} from "../../constants";
import { EventCardType } from "./types";
import "./styles.scss";

const { Title, Text } = Typography;

export const EventCard = (props: EventCardType) => {
  const { name, createdAt, approvalStatus, progressionStatus, eventType } =
    props;
  let status;
  let eventTypeLabel;

  if (progressionStatus === EVENT_STATUS.DRAFT) {
    status = EVENT_STATUS_LABEL.DRAFT;
  } else if (progressionStatus === EVENT_STATUS.COMPLETED) {
    status = EVENT_STATUS_LABEL.COMPLETED;
  } else if (progressionStatus === EVENT_STATUS.IN_PROGRESS) {
    status = EVENT_STATUS_LABEL?.[approvalStatus];
  }

  const menuItems: MenuProps["items"] = [
    {
      label: "View",
      key: "view",
      // onClick: () => onViewSelect(data),
      icon: <EyeOutlined />,
    },
    {
      label: "Edit",
      key: "edit",
      // onClick: () => onEditSelect(data),
      icon: <EditOutlined />,
    },
  ];

  // if (eventType === EVENT_TYPES.MARRIAGE)
  return (
    <Space className="event-card__container" size="middle" direction="vertical">
      <Row gutter={[16, 16]}>
        <Col flex={20}>
          <Text strong className="font-size-16">
            {name}
          </Text>
        </Col>

        <Col flex={4} className="more-info">
          <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
            <Tooltip placement="top" title="More info">
              <EllipsisOutlined
                size={64}
                width={100}
                className="more-item__icon"
              />
            </Tooltip>
          </Dropdown>
        </Col>
      </Row>
      <Row>
        <Col flex={24} className="event-type">
          <Space>
            <Text strong className="event-type__label">
              {EVENT_TYPE_PROPS[eventType].label}
            </Text>
          </Space>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col flex={12}>
          <Text type="secondary" italic>
            {createdAt}
          </Text>
        </Col>
        <Col flex={12} className="event-status">
          <Tag color={EVENT_STATUS_LABEL_COLOR?.[status as any]}>{status}</Tag>
        </Col>
      </Row>
    </Space>
  );
};
