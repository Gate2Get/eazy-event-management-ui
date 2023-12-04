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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import "./styles.scss";
import { ReloadOutlined } from "@ant-design/icons";
import { EventType, GenericJsonType } from "../../types";
import {
  CHANNEL_OPTIONS,
  EVENT_STATUS_LABEL,
  EVENT_STATUS_LABEL_COLOR,
} from "../../constants";
import { PieChart } from "@mui/x-charts";
import { useBearStore } from "../../store";
import EventIcon from "@mui/icons-material/Event";
import { DefaultOptionType } from "antd/es/select";

const { Text } = Typography;
const eventStatusLabel: GenericJsonType = EVENT_STATUS_LABEL;

type RecentEventProps = {
  onRefresh: () => void;
  chartSelectionOptions?: DefaultOptionType[];
  setChartSelectionEventId: (value: string) => void;
};

type RecentEventType = EventType & RecentEventProps;

export const RecentEvent = (props: RecentEventType) => {
  const {
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
    failed = 4,
    success = 14,
    progress = 10,
    onRefresh,
  } = props;
  const { screen } = useBearStore.appStore();
  const status = eventStatusLabel[progressionStatus as string];
  const channelLabel = CHANNEL_OPTIONS.find((item) => item.value === channel);

  const colOption = (count: number) =>
    screen === "MOBILE"
      ? {
          flex: count,
        }
      : { span: count };

  const chartData = [
    {
      label: "Failed",
      value: failed as number,
      color: "rgb(240, 68, 56)",
    },
    {
      label: "Success",
      value: success as number,
      color: "rgb(18, 183, 106)",
    },
    {
      label: "Progress",
      value: progress as number,
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
            <Col span={12}>
              <Select
                options={chartSelectionOptions}
                style={{ width: "100%" }}
                placeholder="Select event"
                onChange={(value) => {
                  setChartSelectionEventId(value);
                }}
              />
            </Col>
          </Row>
        }
        bordered={false}
        style={{ width: "100%" }}
        className="recent-event__container"
      >
        <Row>
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
          <Col {...colOption(12)}>
            <div className="event-details__container">
              <Row>
                <Col span={12}>
                  <Text strong type="secondary">
                    Total
                  </Text>
                </Col>
                <Col span={12}>
                  <Text italic style={{ float: "right" }}>
                    {(progress || 0) + (success || 0) + (failed || 0)}
                  </Text>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <span className="legend-chart-progress"></span>
                  <Text strong type="secondary">
                    Inprogress
                  </Text>
                </Col>
                <Col span={12}>
                  <Text italic style={{ float: "right" }}>
                    {progress || "-"}
                  </Text>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <span className="legend-chart-success"></span>
                  <Text strong type="secondary">
                    Success
                  </Text>
                </Col>
                <Col span={12}>
                  <Text italic style={{ float: "right" }}>
                    {success || "-"}
                  </Text>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <span className="legend-chart-failed"></span>
                  <Text strong type="secondary">
                    Failed
                  </Text>
                </Col>
                <Col span={12}>
                  <Text italic style={{ float: "right" }}>
                    {failed || "-"}
                  </Text>
                </Col>
              </Row>
            </div>
            <div style={{ textAlign: "center" }}>
              <Tag color={EVENT_STATUS_LABEL_COLOR?.[status as any]}>
                {status}
              </Tag>
            </div>
            <div className="refresh__btn">
              <Button type="link" icon={<ReloadOutlined />} onClick={onRefresh}>
                Refresh
              </Button>
            </div>
          </Col>
        </Row>
      </Card>
    </>
  );
};
