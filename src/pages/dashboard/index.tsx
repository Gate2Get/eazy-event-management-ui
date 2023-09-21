import { Alert, Col, Row, Select, Space, Typography } from "antd";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { RecentEvent } from "../../components/recentEvent";
import { StatisticCard } from "../../components/StatisticCard";
import { DASHBOARD_STATS } from "./constants";
import { NoticeCalendar } from "../../components/noticeCalendar";
import { useBearStore } from "../../store";
import { API } from "../../api";
import { EventType } from "../../types";

const { Title } = Typography;

const statColSpan = 24 / DASHBOARD_STATS.length;

export const Dashboard = () => {
  let barChartData: any[] = [];
  const { screen, setLoading } = useBearStore.appStore();
  const {
    recentEvent,
    setRecentEvent,
    selectedEvent,
    setSelectedEvent,
    chartSelectionEventId,
    calendarEvents,
    setChartSelectionEventId,
  } = useBearStore.dashboardStore();
  const colOption = (count: number) =>
    screen === "MOBILE"
      ? {
          flex: count,
        }
      : { span: count };

  React.useEffect(() => {
    getRecentEvent();
  }, []);

  React.useEffect(() => {
    getSelectedEvent(chartSelectionEventId);
  }, [chartSelectionEventId]);

  const getRecentEvent = (): any => {
    setLoading(true);
    API.dashboardAPI
      .getRecentEvent()
      .then((event: EventType) => {
        setRecentEvent(event);
        setLoading(false);
      })
      .catch((error: Error) => {
        setLoading(false);
        console.log({ location: "getRecentEvent", error });
      });
  };

  const getSelectedEvent = (id: string): any => {
    setLoading(true);
    API.dashboardAPI
      .getRecentEvent(id)
      .then((event: EventType) => {
        setSelectedEvent(event);
        setLoading(false);
      })
      .catch((error: Error) => {
        setLoading(false);
        console.log({ location: "getSelectedEvent", error });
      });
  };

  const chartSelectionOptions = calendarEvents.map((item) => ({
    label: item.name,
    value: item._id,
  }));

  if (selectedEvent) {
    barChartData = [
      {
        name: selectedEvent.name,
        Progress: selectedEvent.progress,
        Success: selectedEvent.success,
        Failed: selectedEvent.failed,
      },
    ];
  }

  return (
    <>
      <br />
      <Row gutter={[16, 16]}>
        <Col {...colOption(18)}>
          <Row gutter={[16, 16]}>
            {DASHBOARD_STATS.map((stats) => (
              <Col flex={statColSpan} key={stats.title}>
                <StatisticCard {...stats} />
              </Col>
            ))}
          </Row>
          <br />
          <Row gutter={[8, 8]}>
            <Title level={4}>My Calendar</Title>
            <Row>
              <NoticeCalendar />
            </Row>

            <Space direction="vertical">
              <Title level={4}>My Event chart</Title>
              <Select
                options={chartSelectionOptions}
                size="large"
                style={{ width: "100%" }}
                placeholder="Select event"
                onChange={(value) => {
                  setChartSelectionEventId(value);
                }}
              />
              <BarChart
                title="My Event chart"
                width={500}
                height={300}
                data={barChartData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Count" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Progress" fill="#3498DB" />
                <Bar dataKey="Success" fill="#1ABC9C" />
                <Bar dataKey="Failed" fill="#D35400" />
              </BarChart>
            </Space>
          </Row>
        </Col>
        <Col {...colOption(6)}>
          <Row>
            <RecentEvent {...recentEvent} onRefresh={getRecentEvent} />
          </Row>
        </Col>
      </Row>
    </>
  );
};
