import { Button, Card, Col, Row, Typography } from "antd";
import React from "react";
import { RecentEvent } from "../../components/recentEvent";
import { StatisticCard } from "../../components/StatisticCard";
import { DASHBOARD_STATS } from "./constants";
import { NoticeCalendar } from "../../components/noticeCalendar";
import { useBearStore } from "../../store";
import { API } from "../../api";
import { EventNotificationType, EventType } from "../../types";
import userIconAnimate from "../../assets/svg/user-icon-animate.svg";
import "./styles.scss";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { EVENT_STATUS, ROUTES_URL } from "../../constants";

const { Title, Text, Paragraph } = Typography;

const statColSpan = 24 / DASHBOARD_STATS.length;

export const Dashboard = () => {
  const { screen, setLoading } = useBearStore.appStore();
  const navigate = useNavigate();
  const {
    selectedEvent,
    setSelectedEvent,
    chartSelectionEventId,
    calendarEvents,
    setChartSelectionEventId,
    statistics,
    setStatistics,
    setEventNotifications,
    setSelectedEventNotification,
    selectedEventNotification,
    eventNotifications,
  } = useBearStore.dashboardStore();
  const { user } = useBearStore.userStore();
  const colOption = (count: number) =>
    screen === "MOBILE"
      ? {
          flex: count,
        }
      : { span: count };

  React.useEffect(() => {
    getEventStatistics();
    return () => {
      setChartSelectionEventId("");
    };
  }, []);

  React.useEffect(() => {
    getSelectedEventNotification(chartSelectionEventId);
  }, [chartSelectionEventId]);

  React.useEffect(() => {
    if (!chartSelectionEventId) {
      setChartSelectionEventId(eventNotifications?.[0]?.id as string);
    }
  }, [eventNotifications]);

  const getSelectedEventNotification = (id?: string): void => {
    setLoading(true);
    API.dashboardAPI
      .getRecentEventNotification(id)
      .then((notification: EventNotificationType[]) => {
        if (id && notification?.[0]) {
          setSelectedEventNotification(
            notification?.[0] as EventNotificationType
          );
        } else {
          setEventNotifications(notification);
        }
        setLoading(false);
      })
      .catch((error: Error) => {
        setLoading(false);
        console.log({ location: "getSelectedEventNotification", error });
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
        {item.name} ({item.type})
      </>
    ),
    value: item.id,
  }));

  const renderStatistics = () => {
    const statistic: Record<string, any> = {};

    Object.keys(statistics)?.forEach((stats) => {
      let total = 0;
      const _stats: Record<string, number> = {};
      statistics[stats]?.forEach((element: { _id: string; count: number }) => {
        _stats[element._id] = element.count;
        total += element.count;
      });
      statistic[stats] = { ..._stats, TOTAL: total };
    });
    return DASHBOARD_STATS.map((stats) => {
      stats.stats = statistic[stats.key];
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
                <Paragraph italic style={{ color: "#fff", fontSize: "16px" }}>
                  {!user.isMobileVerified || !user.isEmailVerified ? (
                    <div>
                      <p>
                        Unlock a personalized experience! 🚀 Complete your
                        account details to tailor our services just for you.
                        Your journey to a more customized and efficient
                        experience begins now. 🌟{" "}
                      </p>
                      <p>#PersonalizationPerfection #CompleteYourProfile</p>
                    </div>
                  ) : (
                    <div>
                      <p>
                        Transform your event planning experience with our
                        intuitive notification system. Let's craft memorable
                        moments together! 🎉{" "}
                      </p>{" "}
                      <p> #EventExcellence #NotificationMagic</p>
                    </div>
                  )}
                </Paragraph>

                <Button
                  type="primary"
                  onClick={() =>
                    navigate(
                      !user.isMobileVerified || !user.isEmailVerified
                        ? `${ROUTES_URL.EE}/${ROUTES_URL.MY_PROFILE}`
                        : `${ROUTES_URL.EE}/${ROUTES_URL.EVENT_MANAGEMENT}?action=ADD`
                    )
                  }
                >
                  {!user.isMobileVerified || !user.isEmailVerified
                    ? "Go to Account"
                    : "Event Creation"}{" "}
                  <ArrowRightOutlined
                    style={{ color: "#fff" }}
                    className="right-arrow-icon"
                  />
                </Button>
              </Col>
              <Col span={6}>
                <img
                  src={userIconAnimate}
                  alt=""
                  width={"100%"}
                  className="user-illustration"
                />
              </Col>
            </Row>
          </Card>
        </Col>
        {screen !== "MOBILE" && (
          <Col {...colOption(12)}>
            <RecentEvent
              allEventNotifications={eventNotifications}
              selectedEventNotification={selectedEventNotification}
              onRefresh={() =>
                getSelectedEventNotification(chartSelectionEventId)
              }
              chartSelectionOptions={chartSelectionOptions}
              setChartSelectionEventId={setChartSelectionEventId}
            />
          </Col>
        )}
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

      {screen === "MOBILE" && (
        <div>
          <RecentEvent
            allEventNotifications={eventNotifications}
            selectedEventNotification={selectedEventNotification}
            onRefresh={() =>
              getSelectedEventNotification(chartSelectionEventId)
            }
            chartSelectionOptions={chartSelectionOptions}
            setChartSelectionEventId={setChartSelectionEventId}
          />
        </div>
      )}
    </div>
  );
};
