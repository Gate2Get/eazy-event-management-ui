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
import { CHANNEL_OPTIONS_MAP, ROUTES_URL } from "../../constants";

const { Title, Text, Paragraph } = Typography;

const statColSpan = 24 / DASHBOARD_STATS.length;

export const Dashboard = () => {
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
    label: (
      <>
        {CHANNEL_OPTIONS_MAP[item.channel as string]} {item.name} (${item.type})
      </>
    ),
    value: item.id,
  }));

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
          <RecentEvent
            {...recentEvent}
            onRefresh={getRecentEvent}
            chartSelectionOptions={chartSelectionOptions}
            setChartSelectionEventId={setChartSelectionEventId}
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
            <NoticeCalendar />
          </Row>
        </Col>
      </Row>
    </div>
  );
};
