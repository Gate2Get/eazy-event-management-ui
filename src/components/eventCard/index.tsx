import { Col, Divider, Row, Space, Tag, Typography } from "antd";
import {
  DATE_FORMAT,
  EVENT_STATUS_LABEL,
  EVENT_STATUS_LABEL_COLOR,
  EVENT_TYPE_PROPS,
  ILLUSTRATION_ASSETS,
} from "../../constants";
import { faMapLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EventCardType, GenericJsonType } from "../../types";
import dayjs from "dayjs";
import React from "react";
import "./styles.scss";

const { Text, Paragraph } = Typography;
const eventStatusLabel: GenericJsonType = EVENT_STATUS_LABEL;

export const EventCard = (props: EventCardType) => {
  const {
    name,
    createdAt,
    status: progressionStatus,
    personName,
    type: eventType,
    startDateTime,
    location,
    menuItems,
    onSelect,
  } = props;

  const status = eventStatusLabel[progressionStatus as string];
  const randomIndex = Math.ceil(
    Math.random() *
      (ILLUSTRATION_ASSETS?.[eventType?.toLowerCase() as string] - 1)
  );

  const imageUrl = React.useMemo(() => {
    return new URL(
      `../../assets/svg/${eventType?.toLowerCase()}/card-${randomIndex}.svg`,
      import.meta.url
    );
  }, []);

  return (
    <Space className="event-card__container" size="small" direction="vertical">
      <Row className="other-image" gutter={[8, 8]} onClick={onSelect}>
        <Col span={8} className="">
          <img
            loading="lazy"
            src={imageUrl as any}
            width={"100%"}
            alt=""
            height={100}
          />
        </Col>
        <Col span={16} className="event-info">
          <Space direction="vertical" style={{ width: "100%" }}>
            <Text strong className="font-size-16">
              {name}
            </Text>

            {/* {menuItems && (
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
            )} */}
            <Row className="event-type">
              <Col span={12}>
                <Text strong className="event-type__label">
                  {EVENT_TYPE_PROPS?.[eventType as string]?.label}
                </Text>
              </Col>
              <Col span={10}>
                <Text ellipsis={{ tooltip: location }}>{location}</Text>
              </Col>
              <Col span={2}>
                <FontAwesomeIcon icon={faMapLocationDot} color="#183153" />
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col flex={12}>
                <Text type="secondary" italic>
                  {dayjs(createdAt).format(DATE_FORMAT)}
                </Text>
              </Col>
              {EVENT_STATUS_LABEL_COLOR?.[status] && (
                <Col flex={12} className="event-status">
                  <Tag
                    bordered={false}
                    color={EVENT_STATUS_LABEL_COLOR?.[status]}
                  >
                    {status}
                  </Tag>
                </Col>
              )}
            </Row>
          </Space>
        </Col>
      </Row>
    </Space>
  );
};
