import { EllipsisOutlined } from "@ant-design/icons";
import {
  Col,
  Divider,
  Dropdown,
  Row,
  Space,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import {
  EVENT_STATUS_LABEL,
  EVENT_STATUS_LABEL_COLOR,
  EVENT_TYPE_PROPS,
} from "../../constants";
import { faMapLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./styles.scss";
import { EventCardType, GenericJsonType } from "../../types";

const { Text } = Typography;
const eventStatusLabel: GenericJsonType = EVENT_STATUS_LABEL;

export const BirthdayEventCard = (props: EventCardType) => {
  const {
    name,
    createdAt,
    status: progressionStatus,
    personName,
    type: eventType,
    startDateTime,
    location,
    menuItems,
  } = props;

  const status = eventStatusLabel[progressionStatus as string];

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
              {personName}
            </Text>
            <Text italic type="secondary">
              {startDateTime}
            </Text>

            <Text italic type="secondary">
              <FontAwesomeIcon icon={faMapLocationDot} color="#183153" />{" "}
              {location}
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
            <Text>{location}</Text>
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
