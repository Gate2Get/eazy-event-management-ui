import React from "react";
import { Card, Col, Row, Space, Statistic, Typography } from "antd";
import "./styles.scss";
import { valueType } from "antd/es/statistic/utils";

type StatisticCardType = {
  icon: React.ReactNode;
  title: React.ReactNode;
  stats: valueType;
};

const { Text } = Typography;

export const StatisticCard = (props: StatisticCardType) => {
  const { icon, stats, title } = props;
  return (
    <Card bordered={false}>
      <Statistic title={title} value={stats} prefix={icon} />
    </Card>
  );
};
