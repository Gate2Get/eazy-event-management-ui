import React from "react";
import { Button, Card, Col, Divider, Row, Space, Tag, Typography } from "antd";
import "./styles.scss";
import { valueType } from "antd/es/statistic/utils";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import {
  EVENT_STATUS_LABEL,
  EVENT_STATUS_LABEL_COLOR,
  TEMPLATE_STATUS_LABEL,
  TEMPLATE_STATUS_LABEL_COLOR,
} from "../../constants";

type StatisticCardType = {
  icon: React.ReactNode;
  title: React.ReactNode;
  stats: Record<string, number>;
  url?: string;
  urlLabel?: string;
};

const { Text, Paragraph } = Typography;

const statusLabelColor: Record<string, string> = {
  ...EVENT_STATUS_LABEL_COLOR,
  ...TEMPLATE_STATUS_LABEL_COLOR,
  TOTAL: "default",
};

const statusLabel: Record<string, string> = {
  ...TEMPLATE_STATUS_LABEL,
  ...EVENT_STATUS_LABEL,
  TOTAL: "Total",
};

export const StatisticCard = (props: StatisticCardType) => {
  const { icon, stats, title, url, urlLabel } = props;
  const navigate = useNavigate();
  return (
    <Card className="statistic-card__container">
      <Row gutter={[8, 8]}>
        <Col span={4}>
          <div className="stat-icon">{icon}</div>
        </Col>
        <Col span={20}>
          <Paragraph className="stat-title">{title}</Paragraph>
          <Space className="stat-value">
            {Object.keys(stats || {})?.map((stat) => (
              <Tag
                color={statusLabelColor?.[statusLabel?.[stat]]}
                className={statusLabelColor?.[statusLabel?.[stat]]}
              >
                {statusLabel?.[stat]} {stats?.[stat]}
              </Tag>
            ))}
          </Space>
        </Col>
      </Row>
      {/* <Divider />
      <Button
        type="text"
        onClick={() => {
          url && navigate(url);
        }}
      >
        {urlLabel}
        <ArrowRightOutlined className="right-arrow-icon" />
      </Button> */}
    </Card>
  );
};
