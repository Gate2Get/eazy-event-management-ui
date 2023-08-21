import React from "react";
import { Button, Card, Divider, Space, Tag, Typography } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import "./styles.scss";
import { ReloadOutlined } from "@ant-design/icons";

const { Text } = Typography;

export const RecentEvent = () => {
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
          : <Text italic>Marriage Day</Text>
        </div>
        <div>
          <Text strong type="secondary">
            Event Type
          </Text>{" "}
          : <Text italic>Marriage</Text>
        </div>
        <Divider />
        <Text strong underline>
          Notification
        </Text>
        <div>
          <Text strong type="secondary">
            Total
          </Text>{" "}
          : <Text italic>100</Text>
        </div>
        <div>
          <Text strong type="secondary">
            Inprogress
          </Text>{" "}
          : <Text italic>10</Text>
        </div>
        <div>
          <Text strong type="secondary">
            Success
          </Text>{" "}
          : <Text italic>90</Text>
        </div>

        <div>
          <Tag color="success">Completed</Tag>
          <Tag color="processing">processing</Tag>
        </div>
        <div className="refresh__btn">
          <Button type="link" icon={<ReloadOutlined />}>
            Refresh
          </Button>
        </div>
      </Space>
    </Card>
  );
};
