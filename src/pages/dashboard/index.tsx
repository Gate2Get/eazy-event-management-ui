import {
  Alert,
  Button,
  Card,
  Col,
  List,
  Row,
  Select,
  Space,
  Typography,
} from "antd";
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
import illustrationReports from "../../assets/png/illustration-reports.png";
import "./styles.scss";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { ROUTES_URL } from "../../constants";

const { Title, Text, Paragraph } = Typography;

const statColSpan = 24 / DASHBOARD_STATS.length;

const data = [
  "Racing car sprays burning fuel into crowd.",
  "Japanese princess to wed commoner.",
  "Australian walks 100km after outback crash.",
  "Man charged over missing wedding girl.",
  "Los Angeles battles huge wildfires.",
];

export const Dashboard = () => {
  let barChartData: any[] = [];
  const { screen, setLoading } = useBearStore.appStore();
  const navigate = useNavigate();
  const {
    recentEvent,
    setRecentEvent,
    selectedEvent,
    setSelectedEvent,
    chartSelectionEventId,
    calendarEvents,
    setChartSelectionEventId,
    statistics,
    setStatistics,
  } = useBearStore.dashboardStore();
  const { user } = useBearStore.userStore();
  const colOption = (count: number) =>
    screen === "MOBILE"
      ? {
          flex: count,
        }
      : { span: count };

  React.useEffect(() => {
    getRecentEvent();
    getEventStatistics();
  }, []);

  React.useEffect(() => {
    getSelectedEvent(chartSelectionEventId);
  }, [chartSelectionEventId]);

  const getRecentEvent = (): void => {
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

  const getSelectedEvent = (id: string): void => {
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

  const getEventStatistics = (): void => {
    setLoading(true);
    API.dashboardAPI
      .getEventStatistics()
      .then((stats) => {
        setLoading(false);
        setStatistics(stats);
      })
      .catch((error: Error) => {
        setLoading(false);
        console.log({ location: "getSelectedEvent", error });
      });
  };

  const chartSelectionOptions = calendarEvents.map((item) => ({
    label: item.name,
    value: item.id,
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

  const renderStatistics = () => {
    let total = 0;
    Object.values(statistics).forEach((stats) => {
      total += stats;
    });
    return DASHBOARD_STATS.map((stats) => {
      if (stats.key === "TOTAL") {
        stats.stats = total;
      } else if (stats.key === "INPROGRESS") {
        stats.stats =
          (statistics["IN_PROGRESS"] || 0) + (statistics["NOT_STARTED"] || 0);
      } else {
        stats.stats = statistics[stats.key] || 0;
      }
      return stats;
    });
  };

  return (
    <div className="dashboard__container">
      <br />
      <Row gutter={[16, 16]}>
        <Col {...colOption(12)}>
          <Card style={{ background: "rgb(16, 24, 40)" }}>
            <Row gutter={[16, 16]}>
              <Col span={18}>
                <Title level={3} style={{ color: "#fff" }}>
                  Welcome, {user.firstName || "User"} !
                </Title>
                <Paragraph style={{ color: "#fff", fontSize: "16px" }}>
                  Let’s complete your account information so we can gather more
                  accurate data for you.
                </Paragraph>

                <Button
                  type="primary"
                  onClick={() =>
                    navigate(`${ROUTES_URL.EE}/${ROUTES_URL.MY_PROFILE}`)
                  }
                >
                  Go to Account{" "}
                  <ArrowRightOutlined
                    style={{ color: "#fff" }}
                    className="right-arrow-icon"
                  />
                </Button>
              </Col>
              <Col span={6}>
                <img
                  src={illustrationReports}
                  alt=""
                  className="user-illustration"
                />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col {...colOption(12)}>
          <List
            size="default"
            header={
              <Text strong style={{ fontSize: "16px" }}>
                Notifications
              </Text>
            }
            footer={<Button type="text">See all notifications</Button>}
            bordered
            dataSource={[]}
            renderItem={(item) => <List.Item>{item}</List.Item>}
          />
        </Col>
      </Row>
      <br />
      <Row gutter={[16, 16]}>
        <Col {...colOption(24)}>
          <Row gutter={[16, 16]}>
            {renderStatistics().map((stats) => (
              <Col flex={statColSpan} key={stats.title}>
                <StatisticCard {...stats} />
              </Col>
            ))}
          </Row>
          <br />
          <Row gutter={[8, 8]} style={{ padding: "1rem" }}>
            <Title level={4}>My Calendar</Title>

            <NoticeCalendar />

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
        {/* <Col {...colOption(6)}>
          <Row>
            <RecentEvent {...recentEvent} onRefresh={getRecentEvent} />
          </Row>
        </Col> */}
      </Row>
    </div>
  );
};
