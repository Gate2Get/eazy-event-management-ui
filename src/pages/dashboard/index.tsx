import { Alert, Col, Row } from "antd";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Marquee from "react-fast-marquee";
import { RecentEvent } from "../../components/recentEvent";
import { StatisticCard } from "../../components/StatisticCard";
import { DASHBOARD_STATS } from "./constants";

// import styles from "./style.scss";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const dataProps = {
  pv: {
    fill: "#8884d8",
    dataKey: "pv",
  },
  uv: {
    fill: "#82ca9d",
    dataKey: "uv",
  },
  amt: {
    fill: "#000000",
    dataKey: "amt",
  },
};

const statColSpan = 24 / DASHBOARD_STATS.length;

export const Dashboard = () => {
  return (
    <>
      <Alert
        banner
        type="info"
        message={
          <Marquee pauseOnHover gradient={false}>
            I can be a React component, multiple React components, or just some
            text.
          </Marquee>
        }
      />
      <br />
      <Row gutter={[16, 16]}>
        <Col flex={18}>
          <Row gutter={[16, 16]}>
            {DASHBOARD_STATS.map((stats) => (
              <Col flex={statColSpan}>
                <StatisticCard {...stats} />
              </Col>
            ))}
          </Row>
          <br />
          <Row gutter={[8, 8]}>
            <Col span={24}>
              <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pv" fill="#8884d8" />
                <Bar dataKey="uv" fill="#82ca9d" />
              </BarChart>
            </Col>
          </Row>
        </Col>
        <Col flex={6}>
          <Row>
            <RecentEvent />
          </Row>
        </Col>
      </Row>
    </>
  );
};
