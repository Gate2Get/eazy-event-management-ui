import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Col,
  ColProps,
  DatePicker,
  Form,
  Pagination,
  Row,
  Select,
  Space,
  Tag,
  Typography,
} from "antd";
import dayjs from "dayjs";
import React, { Dispatch } from "react";
import { API } from "../../api";
import { BirthdayEventCard } from "../../components/birthdayEventCard";
import { BirthdayEventCreation } from "../../components/birthdayEventCreation";
import { MarriageEventCard } from "../../components/marriageEventCard";
import { MarriageEventCreation } from "../../components/marriageEventCreation";
import {
  EVENT_DATE_FORMAT,
  EVENT_STATUS_LABEL,
  EVENT_STATUS_LABEL_COLOR,
  EVENT_TYPES,
  EVENT_TYPE_PROPS,
} from "../../constants";
import { useBearStore } from "../../store";
import { ActionType, ContactDirectoryType, TemplateType } from "../../types";
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

console.log({ eventTypeOptions });

export const EventManagement = () => {
  const { screen } = useBearStore.appStore();
  const [isFetching, setIsFetching] = React.useState(false);
  const { setDirectoryList, directoryList } = useBearStore.contactStore();
  const { setTemplates, templates } = useBearStore.templateStore();

  const [action, setAction]: [ActionType, Dispatch<any>] = React.useState("");
  const [eventType, setEventType] = React.useState("");

  React.useEffect(() => {
    getContactDirectory();
    getTemplates();
  }, []);

  const colProps: ColProps = {};
  if (screen === "MOBILE") {
    colProps.flex = 8;
  } else {
    colProps.span = 8;
  }

  const onCancel = () => {
    setAction("");
  };

  const getContactDirectory = (): any => {
    setIsFetching(true);
    API.contactManagement
      .getContactDirectory()
      .then((contacts: ContactDirectoryType[]) => {
        setDirectoryList(contacts);
      })
      .catch((error: Error) => {
        setIsFetching(false);
        console.log({ location: "getContactDirectory", error });
      });
  };

  const getTemplates = (): void => {
    setIsFetching(true);
    API.templateManagement
      .getTemplate()
      .then((templates: TemplateType[]) => {
        setTemplates(templates);
      })
      .catch((error: Error) => {
        setIsFetching(false);
        console.log({ location: "getTemplates", error });
      });
  };

  return (
    <div className="event-management__container">
      {!action && (
        <>
          <Row className="event-management__filters" gutter={[8, 8]}>
            <Col flex={6}>
              <Form layout="vertical">
                <Form.Item label="Event">
                  <Select
                    style={{ width: "100%" }}
                    allowClear
                    placeholder="Select a event"
                    optionFilterProp="children"
                    options={eventTypeOptions}
                  />
                </Form.Item>
              </Form>
            </Col>
            <Col flex={6}>
              <Form layout="vertical">
                <Form.Item label="Status">
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
                </Form.Item>
              </Form>
            </Col>
            <Col className="upcoming-event__date-picker" flex={6}>
              <Form layout="vertical">
                <Form.Item label="Event date range">
                  <RangePicker
                    size="middle"
                    defaultValue={[
                      dayjs("2015/01/01", EVENT_DATE_FORMAT),
                      dayjs("2015/01/01", EVENT_DATE_FORMAT),
                    ]}
                    format={EVENT_DATE_FORMAT}
                  />
                </Form.Item>
              </Form>
            </Col>
          </Row>
          <Row wrap gutter={[8, 8]}>
            <Col span={12}>
              <Title level={3}> Events</Title>
            </Col>
            <Col span={12} className="upcoming-event__pagination">
              <Button
                type="primary"
                size="large"
                onClick={() => {
                  setAction("ADD");
                }}
              >
                Create Event
              </Button>
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
        </>
      )}
      {action && (
        <Row gutter={[16, 16]} className="header__row">
          <Col flex={12}>
            <Row className="header__container">
              <Col
                span={screen === "MOBILE" ? 4 : 1}
                className="back-icon__container"
              >
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  size="2x"
                  className="back-icon"
                  onClick={onCancel}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      )}
      {action === "ADD" && (
        <Form layout="vertical">
          <Form.Item label="Select Event">
            <Select
              style={{ width: "100%" }}
              size="large"
              allowClear
              placeholder="Select a event"
              optionFilterProp="children"
              options={eventTypeOptions}
              onChange={(value) => setEventType(value)}
            />
          </Form.Item>
        </Form>
      )}
      {action === "ADD" && eventType === EVENT_TYPES.MARRIAGE && (
        <MarriageEventCreation
          contactList={directoryList}
          templates={templates}
        />
      )}
      {action === "ADD" && eventType === EVENT_TYPES.BIRTHDAY && (
        <BirthdayEventCreation />
      )}
    </div>
  );
};
