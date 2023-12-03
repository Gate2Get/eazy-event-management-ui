import React from "react";
import {
  Button,
  Card,
  Col,
  Divider,
  Row,
  Space,
  Statistic,
  Typography,
} from "antd";
import "./styles.scss";
import { valueType } from "antd/es/statistic/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { ROUTES_URL } from "../../constants";

type StatisticCardType = {
  icon: React.ReactNode;
  title: React.ReactNode;
  stats: valueType;
  url?: string;
  urlLabel?: string;
};

const { Text, Paragraph } = Typography;

export const StatisticCard = (props: StatisticCardType) => {
  const { icon, stats, title, url, urlLabel } = props;
  const navigate = useNavigate();
  return (
    <Card className="statistic-card__container">
      <Row>
        <Col span={4}>
          <div className="stat-icon">{icon}</div>
        </Col>
        <Col>
          <Paragraph className="stat-title">{title}</Paragraph>
          <Paragraph className="stat-value">{stats}</Paragraph>
        </Col>
      </Row>
      <Divider />
      <Button
        type="text"
        onClick={() => {
          url && navigate(url);
        }}
      >
        {urlLabel}
        <ArrowRightOutlined className="right-arrow-icon" />
      </Button>
    </Card>
  );
};
