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
  DATE_FORMAT,
  EVENT_STATUS_LABEL,
  EVENT_STATUS_LABEL_COLOR,
  EVENT_TYPE_PROPS,
  ILLUSTRATION_ASSETS,
} from "../../constants";
import { faMapLocationDot, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./styles.scss";
import { EventCardType, GenericJsonType } from "../../types";
import dayjs from "dayjs";

const { Text } = Typography;

const eventStatusLabel: GenericJsonType = EVENT_STATUS_LABEL;

export const MarriageEventCard = (props: EventCardType) => {
  const {
    name,
    type: eventType,
    status: progressionStatus,
    createdAt,
    groomName,
    brideName,
    startDateTime,
    location,
    menuItems,
  } = props;
  const status = eventStatusLabel[progressionStatus as string];
  const randomIndex = Math.ceil(
    Math.random() * (ILLUSTRATION_ASSETS.marriage - 1)
  );
  const imageUrl = new URL(
    `../../assets/svg/marriage/card-${randomIndex}.svg`,
    import.meta.url
  );

  return (
    <Space
      className="marriage-event-card__container"
      size="small"
      direction="vertical"
    >
      <Row className="marriage-image" gutter={[8, 8]}>
        <Col span={12} className="">
          <img src={imageUrl as any} width={"100%"} alt="" height={180} />
        </Col>
        <Col span={12} className="marriage-content">
          <Space direction="vertical">
            <Text strong italic>
              {groomName}
            </Text>
            <FontAwesomeIcon icon={faHeart} color="#e31b23" />
            <Text strong italic>
              {brideName}
            </Text>
            <Text italic type="secondary">
              {dayjs(startDateTime).format(DATE_FORMAT)}
            </Text>
          </Space>
        </Col>
      </Row>
      <Divider />
      <Row gutter={[8, 16]}>
        <Col flex={20}>
          <Text strong className="font-size-16">
            {name}
          </Text>
        </Col>

        {menuItems && (
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
        )}
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
            {dayjs(createdAt).format(DATE_FORMAT)}
          </Text>
        </Col>
        <Col flex={12} className="event-status">
          <Tag color={EVENT_STATUS_LABEL_COLOR?.[status as any]}>{status}</Tag>
        </Col>
      </Row>
    </Space>
  );
};
