import { EditOutlined, EllipsisOutlined, EyeOutlined } from "@ant-design/icons";
import {
  Col,
  Divider,
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
import { BirthdayEventCardType } from "./types";
import { faMapLocationDot, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./styles.scss";

const { Title, Text } = Typography;

export const BirthdayEventCard = (props: BirthdayEventCardType) => {
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

  return (
    <Space
      className="birthday-event-card__container"
      size="small"
      direction="vertical"
    >
      <Row className="birthday-image" gutter={[8, 8]}>
        <Col span={24} className=""></Col>
        <Col span={24} className="event-info">
          <Space direction="vertical">
            <Text strong italic>
              Birthday person Name
            </Text>
            <Text italic type="secondary">
              2023-01-01, 7am to 10am
            </Text>

            <Text italic type="secondary">
              <FontAwesomeIcon icon={faMapLocationDot} color="#183153" />{" "}
              Holiday Inn
            </Text>
          </Space>
        </Col>
        <Col span={24} className="event-place"></Col>
      </Row>
      <Divider />
      <Row gutter={[8, 16]}>
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
      <Row className="event-type">
        <Col span={12}>
          <Text strong className="event-type__label">
            {EVENT_TYPE_PROPS[eventType].label}
          </Text>
        </Col>
        <Col span={12}>
          <Space>
            <Text>Holiday Inn, Chennai</Text>
            <FontAwesomeIcon icon={faMapLocationDot} color="#183153" />
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
