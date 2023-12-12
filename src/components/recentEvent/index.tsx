import React from "react";
import {
  Button,
  Card,
  Col,
  Divider,
  Row,
  Select,
  Space,
  Tag,
  Typography,
} from "antd";
import "./styles.scss";
import { ReloadOutlined } from "@ant-design/icons";
import { EventType, GenericJsonType } from "../../types";
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
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const { Text, Paragraph } = Typography;
const eventStatusLabel: GenericJsonType = EVENT_STATUS_LABEL;

type RecentEventProps = {
  onRefresh: () => void;
  chartSelectionOptions?: DefaultOptionType[];
  setChartSelectionEventId: (value: string) => void;
};

type RecentEventType = EventType & RecentEventProps;

export const RecentEvent = (props: RecentEventType) => {
  const {
    id,
    name,
    type: eventType,
    status: progressionStatus,
    createdAt,
    groomName,
    brideName,
    startDateTime,
    location,
    chartSelectionOptions,
    setChartSelectionEventId,
    channel,
    failed,
    success,
    progress,
    onRefresh,
  } = props;
  const { screen } = useBearStore.appStore();
  const status = eventStatusLabel[progressionStatus as string];
  const channelLabel = CHANNEL_OPTIONS.find((item) => item.value === channel);
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
  ];

  return (
    <>
      <Card
        title={
          <Row>
            <Col span={12}>
              <Space>
                <EventIcon style={{ position: "relative", top: "5px" }} />
                Recent Event
              </Space>
            </Col>
            {id && (
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
            )}
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
        {id ? (
          <Row>
            <Col {...colOption(10)}>
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
            <Col {...colOption(14)}>
              <div className="event-details__container">
                <Row>
                  <Col span={20}>
                    <Text strong type="secondary">
                      Total
                    </Text>
                  </Col>
                  <Col span={4}>
                    <Text italic>
                      {(progress || 0) + (success || 0) + (failed || 0)}
                    </Text>
                  </Col>
                </Row>
                <Row>
                  <Col span={20}>
                    <span className="legend-chart-progress"></span>
                    <Text type="secondary">Inprogress</Text>
                  </Col>
                  <Col span={4}>
                    <Text italic>{progress || "-"}</Text>
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
                  <Tag color={EVENT_STATUS_LABEL_COLOR?.[status as any]}>
                    {status}
                  </Tag>
                </div>
              )}
              <div className="refresh__btn">
                <Button
                  type="link"
                  icon={<ReloadOutlined />}
                  onClick={onRefresh}
                >
                  Refresh
                </Button>
              </div>
            </Col>
          </Row>
        ) : (
          <div style={{ textAlign: "center" }}>
            <img src={NotFound} alt="No recent event" />
            <Paragraph>There are no recent event to show.</Paragraph>
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
