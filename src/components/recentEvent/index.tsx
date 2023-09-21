import React from "react";
import { Button, Card, Divider, Space, Tag, Typography } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import "./styles.scss";
import { ReloadOutlined } from "@ant-design/icons";
import { EventType, GenericJsonType } from "../../types";
import {
  CHANNEL_OPTIONS,
  EVENT_STATUS_LABEL,
  EVENT_STATUS_LABEL_COLOR,
} from "../../constants";

const { Text } = Typography;
const eventStatusLabel: GenericJsonType = EVENT_STATUS_LABEL;

type RecentEventProps = {
  onRefresh: () => void;
};

type RecentEventType = EventType & RecentEventProps;

export const RecentEvent = (props: RecentEventType) => {
  const {
    name,
    type: eventType,
    status: progressionStatus,
    createdAt,
    groomName,
    brideName,
    startDateTime,
    location,
    channel,
    failed,
    success,
    progress,
    onRefresh,
  } = props;
  const status = eventStatusLabel[progressionStatus as string];
  const channelLabel = CHANNEL_OPTIONS.find((item) => item.value === channel);

  return (
    <Card
      title={
        <Space>
          <FontAwesomeIcon
            icon={faCalendarDays}
            // className="dark-color"
            size="2x"
          />
          Recent Event
        </Space>
      }
      bordered={false}
      style={{ width: "100%" }}
      className="recent-event__container"
    >
      <Space direction="vertical" size="middle">
        <div>
          <Text strong type="secondary">
            Event Name
          </Text>{" "}
          : <Text italic>{name}</Text>
        </div>
        <div>
          <Text strong type="secondary">
            Event Type
          </Text>{" "}
          : <Text italic>{eventType}</Text>
        </div>
        <div>
          <Text strong type="secondary">
            Channel
          </Text>{" "}
          : <Text italic>{channelLabel?.label}</Text>
        </div>
        <Divider />
        <Text strong underline>
          Notification
        </Text>
        <div>
          <Text strong type="secondary">
            Total
          </Text>{" "}
          :{" "}
          <Text italic>{(progress || 0) + (success || 0) + (failed || 0)}</Text>
        </div>
        <div>
          <Text strong type="secondary">
            Inprogress
          </Text>{" "}
          : <Text italic>{progress || "-"}</Text>
        </div>
        <div>
          <Text strong type="secondary">
            Success
          </Text>{" "}
          : <Text italic>{success || "-"}</Text>
        </div>
        <div>
          <Text strong type="secondary">
            Failed
          </Text>{" "}
          : <Text italic>{failed || "-"}</Text>
        </div>
        <div>
          <Tag color={EVENT_STATUS_LABEL_COLOR?.[status as any]}>{status}</Tag>
        </div>
        <div className="refresh__btn">
          <Button type="link" icon={<ReloadOutlined />} onClick={onRefresh}>
            Refresh
          </Button>
        </div>
      </Space>
    </Card>
  );
};
