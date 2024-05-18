import React from "react";
import {
  Button,
  Card,
  Col,
  Divider,
  Row,
  Select,
  Skeleton,
  Space,
  Tag,
  Typography,
} from "antd";
import "./styles.scss";
import { ReloadOutlined } from "@ant-design/icons";
import { EventNotificationType, EventType, GenericJsonType } from "../../types";
import {
  CHANNEL_OPTIONS,
  EVENT_STATUS_LABEL,
  EVENT_STATUS_LABEL_COLOR,
  ROUTES_URL,
} from "../../constants";
import { PieChart } from "@mui/x-charts";
import { useBearStore } from "../../store";
import EventIcon from "@mui/icons-material/Event";
import { DefaultOptionType } from "antd/es/select";
import NotFound from "../../assets/svg/illustration-not-found.svg";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { Carousel } from "primereact/carousel";

const { Text, Paragraph } = Typography;
const eventStatusLabel: GenericJsonType = EVENT_STATUS_LABEL;

type RecentEventType = {
  onRefresh: () => void;
  chartSelectionOptions?: DefaultOptionType[];
  setChartSelectionEventId: (value: string) => void;
  allEventNotifications: EventNotificationType[];
  selectedEventNotification: EventNotificationType;
  isFetching: boolean;
};

export const RecentEvent = (props: RecentEventType) => {
  const {
    allEventNotifications,
    selectedEventNotification,
    chartSelectionOptions,
    setChartSelectionEventId,
    onRefresh,
    isFetching,
  } = props;
  const { screen } = useBearStore.appStore();
  const {
    status: progressionStatus,
    name,
    progress,
    success,
    failed,
    notStarted,
    channel,
  } = selectedEventNotification;
  const status = eventStatusLabel[progressionStatus as string];
  const navigate = useNavigate();

  const colOption = (count: number) =>
    screen === "MOBILE"
      ? {
          flex: count,
        }
      : { span: count };

  const chartData = [
    {
      label: "Failed",
      value: (failed || 0) as number,
      color: "rgb(240, 68, 56)",
    },
    {
      label: "Success",
      value: (success || 0) as number,
      color: "rgb(18, 183, 106)",
    },
    {
      label: "Progress",
      value: (progress || 0) as number,
      color: "rgb(247, 144, 9)",
    },
    {
      label: "Not strated",
      value: (notStarted || 0) as number,
      color: "rgb(234, 236, 240)",
    },
  ];

  const renderCharts = (notification: EventNotificationType) => {
    return (
      <Row gutter={[8, 8]}>
        <Col {...colOption(12)}>
          <PieChart
            series={[
              {
                paddingAngle: 5,
                innerRadius: 60,
                outerRadius: 80,
                data: chartData,
              },
            ]}
            margin={{ right: 5 }}
            width={200}
            height={200}
            legend={{
              hidden: true,
            }}
          />
        </Col>
        <Col {...colOption(12)} style={{ alignSelf: "center" }}>
          <div className="event-details__container">
            <Row>
              <Col span={20}>
                <Text strong type="secondary">
                  Total
                </Text>
              </Col>
              <Col span={4}>
                <Text italic>
                  {(progress || 0) +
                    (success || 0) +
                    (failed || 0) +
                    (notStarted || 0)}
                </Text>
              </Col>
            </Row>
            <Row>
              <Col span={20}>
                <span className="legend-chart-not-started"></span>
                <Text type="secondary">Not started</Text>
              </Col>
              <Col span={4}>
                <Text italic>{notStarted || "-"}</Text>
              </Col>
            </Row>
            <Row>
              <Col span={20}>
                <span className="legend-chart-progress"></span>
                <Text type="secondary">Inprogress</Text>
              </Col>
              <Col span={4}>
                <Text italic>{progress || 0 || "-"}</Text>
              </Col>
            </Row>
            <Row>
              <Col span={20}>
                <span className="legend-chart-success"></span>
                <Text type="secondary">Success</Text>
              </Col>
              <Col span={4}>
                <Text italic>{success || "-"}</Text>
              </Col>
            </Row>
            <Row>
              <Col span={20}>
                <span className="legend-chart-failed"></span>
                <Text type="secondary">Failed</Text>
              </Col>
              <Col span={4}>
                <Text italic>{failed || "-"}</Text>
              </Col>
            </Row>
          </div>
          {status && (
            <div style={{ textAlign: "center" }}>
              <Tag
                bordered={false}
                color={EVENT_STATUS_LABEL_COLOR?.[status as any]}
              >
                {status}
              </Tag>
            </div>
          )}
          <div className="refresh__btn">
            <Button type="link" icon={<ReloadOutlined />} onClick={onRefresh}>
              Refresh
            </Button>
          </div>
        </Col>
      </Row>
    );
  };

  const onPageChange = (pageNumber: number) => {
    const notification = allEventNotifications.find(
      (item, index) => pageNumber === index
    );
    if (notification) {
      setChartSelectionEventId(notification.id as string);
    }
  };

  return (
    <>
      <Card
        title={
          <Row>
            <Col span={12}>
              <Space>
                <EventIcon style={{ position: "relative", top: "5px" }} />
                Recent Event Notifications
              </Space>
            </Col>
            {/* {id && (
                <Col span={12}>
                  <Select
                    suffixIcon={<ArrowDropDownIcon />}
                    value={id}
                    options={chartSelectionOptions}
                    style={{ width: "100%" }}
                    placeholder="Select event"
                    onChange={(value) => {
                      setChartSelectionEventId(value);
                    }}
                  />
                </Col>
              )} */}
          </Row>
        }
        bordered={false}
        style={{
          width: "100%",
          boxShadow:
            "rgb(234, 236, 240) 0px 0px 1px, rgba(29, 41, 57, 0.08) 0px 6px 12px",
        }}
        className="recent-event__container"
      >
        {isFetching ? (
          <Skeleton
            style={{ padding: "0rem 1rem" }}
            active
            paragraph={{ rows: 5 }}
          />
        ) : allEventNotifications.length ? (
          <Carousel
            showIndicators={false}
            value={allEventNotifications}
            numVisible={1}
            numScroll={allEventNotifications.length}
            itemTemplate={renderCharts}
            onPageChange={(event) => {
              onPageChange(event.page);
            }}
          />
        ) : (
          <div style={{ textAlign: "center" }}>
            <img loading="lazy" src={NotFound} alt="No recent event" />
            <Paragraph>There are no recent notification to show.</Paragraph>
            <Button
              type="primary"
              onClick={() => {
                navigate(
                  `${ROUTES_URL.EE}/${ROUTES_URL.EVENT_MANAGEMENT}?action=ADD`
                );
              }}
              icon={<AddIcon fontSize="inherit" />}
            >
              Create Event
            </Button>
          </div>
        )}
      </Card>
    </>
  );
};
