import {
  Col,
  ColProps,
  DatePicker,
  Pagination,
  Row,
  Select,
  Space,
  Tag,
  Typography,
} from "antd";
import dayjs from "dayjs";
import React from "react";
import { BirthdayEventCard } from "../../components/birthdayEventCard";
import { MarriageEventCard } from "../../components/marriageEventCard";
import {
  EVENT_DATE_FORMAT,
  EVENT_STATUS_LABEL,
  EVENT_STATUS_LABEL_COLOR,
  EVENT_TYPE_PROPS,
} from "../../constants";
import { useBearStore } from "../../store";
import "./styles.scss";

const { Title } = Typography;
const { RangePicker } = DatePicker;

const eventLabel: any = EVENT_STATUS_LABEL;

const eventTypeOptions = Object.keys(EVENT_TYPE_PROPS).map((event: string) => ({
  label: EVENT_TYPE_PROPS[event].label,
  value: event,
}));

const eventStatusOptions = Object.entries(eventLabel).map((event: any) => ({
  label: (
    <Tag
      color={EVENT_STATUS_LABEL_COLOR?.[event[1] as any]}
      className="event-status__tag"
    >
      {eventLabel?.[event[0]]}
    </Tag>
  ),

  value: event[0],
}));

export const EventManagement = () => {
  const { screen } = useBearStore.appStore();

  const colProps: ColProps = {};
  if (screen === "MOBILE") {
    colProps.flex = 8;
  } else {
    colProps.span = 8;
  }

  return (
    <div className="event-management__container">
      <Row className="event-management__filters" gutter={[8, 8]}>
        <Col flex={6}>
          <Select
            style={{ width: "100%" }}
            allowClear
            placeholder="Select a event"
            optionFilterProp="children"
            options={eventTypeOptions}
          />
        </Col>
        <Col flex={6}>
          <Select
            style={{ width: "100%" }}
            allowClear
            mode="multiple"
            placeholder="Select a status"
            optionFilterProp="children"
            options={eventStatusOptions}
            tagRender={({ label }) => {
              return (
                <Tag
                  color={EVENT_STATUS_LABEL_COLOR[label as string]}
                  className="event-status__tag"
                >
                  {label}
                </Tag>
              );
            }}
          />
        </Col>
        <Col className="upcoming-event__date-picker" flex={6}>
          <RangePicker
            size="middle"
            defaultValue={[
              dayjs("2015/01/01", EVENT_DATE_FORMAT),
              dayjs("2015/01/01", EVENT_DATE_FORMAT),
            ]}
            format={EVENT_DATE_FORMAT}
          />
        </Col>
      </Row>
      <Row wrap gutter={[8, 8]}>
        <Col span={12}>
          <Title level={3}> Events</Title>
        </Col>
        <Col span={12} className="upcoming-event__pagination">
          <Pagination simple defaultCurrent={2} total={50} />
        </Col>
      </Row>
      <Row>
        <Col {...colProps}>
          <MarriageEventCard
            name="My first event"
            approvalStatus="APPROVED"
            progressionStatus="COMPLETED"
            createdAt="2023-01-01"
            eventType="MARRIAGE"
          />
        </Col>
        <Col {...colProps}>
          <BirthdayEventCard
            name="My first event"
            approvalStatus="APPROVED"
            progressionStatus="COMPLETED"
            createdAt="2023-01-01"
            eventType="BIRTHDAY"
          />
        </Col>
      </Row>
    </div>
  );
};
