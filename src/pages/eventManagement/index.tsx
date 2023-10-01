import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Col,
  ColProps,
  DatePicker,
  Form,
  Row,
  Select,
  MenuProps,
  Tag,
  Typography,
  Modal,
  Space,
} from "antd";
import dayjs from "dayjs";
import React from "react";
import { API } from "../../api";
import { BirthdayEventCard } from "../../components/birthdayEventCard";
import { BirthdayEventCreation } from "../../components/birthdayEventCreation";
import { MarriageEventCard } from "../../components/marriageEventCard";
import { MarriageEventCreation } from "../../components/marriageEventCreation";
import {
  EVENT_DATE_FORMAT,
  EVENT_STATUS,
  EVENT_STATUS_LABEL,
  EVENT_STATUS_LABEL_COLOR,
  EVENT_TYPES,
  EVENT_TYPE_PROPS,
} from "../../constants";
import { useBearStore } from "../../store";
import {
  ContactDirectoryType,
  Events,
  EventType,
  TemplateType,
} from "../../types";
import "./styles.scss";
import FeedbackPrompt from "../../assets/svg/FeedbackPrompt.svg";
import { PreviewEvent } from "../../components/previewEvent";

const { Title, Text } = Typography;
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
  const { screen, setLoading } = useBearStore.appStore();
  const [isPreview, setIsPreview] = React.useState(false);
  const { setDirectoryList, directoryList } = useBearStore.contactStore();
  const { setTemplates, templates } = useBearStore.templateStore();
  const {
    action,
    eventType,
    events,
    filters,
    selectedEvents,
    setAction,
    setEventType,
    setEvents,
    setFilters,
    setSelectedEvents,
  } = useBearStore.eventStore();
  const [form] = Form.useForm();

  React.useEffect(() => {
    form.setFieldValue("eventType", eventType || undefined);
  }, [eventType]);

  React.useEffect(() => {
    getContactDirectory();
    getTemplates();

    return () => {
      setFilters({});
      setEventType("");
      form.resetFields();
      setAction("");
    };
  }, []);

  React.useEffect(() => {
    if (!action) getEvents();
  }, [filters, action]);

  const getMenuItems = (data: EventType): MenuProps["items"] => {
    const menu1 = [
      {
        label: "View",
        key: "view",
        onClick: () => onViewSelect(data),
        icon: <EyeOutlined />,
      },
    ];
    const menu2 = [
      {
        label: "Edit",
        key: "edit",
        onClick: () => onEditSelect(data),
        icon: <EditOutlined />,
      },
      {
        label: "Delete",
        key: "delete",
        onClick: () => onDeleteSelect(data),
        icon: <DeleteOutlined />,
      },
    ];
    if (data.status === EVENT_STATUS.NOT_STARTED) {
      return [...menu1, ...menu2];
    } else {
      return menu1;
    }
  };

  const colProps: ColProps = {};
  if (screen === "MOBILE") {
    colProps.flex = 8;
  } else {
    colProps.span = 8;
  }

  const onCancel = (isClearAction?: boolean) => {
    if (!isPreview || isClearAction) {
      setAction("");
    }
    setIsPreview(false);
  };

  const onDeleteSelect = (record: EventType) => {
    setAction("DELETE");
    setSelectedEvents(record);
  };

  const onViewSelect = (record: EventType) => {
    setAction("VIEW");
    setSelectedEvents(record);
  };

  const onDeleteConfirm = () => {
    const { id } = selectedEvents;
    deleteEvent(id as string);
  };

  const onEditSelect = (record: EventType) => {
    setAction("EDIT");
    setEventType(record.type);
    setSelectedEvents(record);
  };

  const renderEvents = (): React.ReactNode => {
    return events.length ? (
      events.map((event) => {
        if (event.type === EVENT_TYPES.MARRIAGE) {
          return (
            <Col {...colProps}>
              <MarriageEventCard {...event} menuItems={getMenuItems(event)} />
            </Col>
          );
        } else if (event.type === EVENT_TYPES.BIRTHDAY) {
          return (
            <Col {...colProps}>
              <BirthdayEventCard {...event} menuItems={getMenuItems(event)} />
            </Col>
          );
        } else {
          return <></>;
        }
      })
    ) : (
      <Space className="no-events" direction="vertical" size="small">
        <div>
          <img src={FeedbackPrompt} alt="" height={150} />
        </div>
        <Text type="secondary" italic>
          No events to show
        </Text>
        <div>
          <Button
            type="primary"
            size="middle"
            onClick={() => {
              setAction("ADD");
            }}
          >
            Create Event
          </Button>
        </div>
      </Space>
    );
  };

  const handleSubmitEvent = () => {
    if (action === "ADD") {
      createEvent(selectedEvents);
    } else if (action === "EDIT") {
      updateEvent(selectedEvents);
    }
  };

  const handleEventPreview = (event: EventType) => {
    setSelectedEvents({ ...event, type: eventType as Events });
    setIsPreview(true);
  };

  const getContactDirectory = (): any => {
    setLoading(true);
    API.contactManagement
      .getContactDirectory()
      .then((contacts: ContactDirectoryType[]) => {
        setDirectoryList(contacts);
        setLoading(false);
      })
      .catch((error: Error) => {
        setLoading(false);
        console.log({ location: "getContactDirectory", error });
      });
  };

  const getTemplates = (): void => {
    setLoading(true);
    API.templateManagement
      .getTemplate()
      .then((templates: TemplateType[]) => {
        setTemplates(templates);
        setLoading(false);
      })
      .catch((error: Error) => {
        setLoading(false);
        console.log({ location: "getTemplates", error });
      });
  };

  const createEvent = (event: EventType): void => {
    setLoading(true);
    API.eventManagement
      .createEvent({ ...event, type: eventType as Events })
      .then(() => {
        onCancel(true);
        setLoading(false);
      })
      .catch((error: Error) => {
        setLoading(false);
        console.log({ location: "createEvent", error });
      });
  };

  const updateEvent = (event: EventType): void => {
    setLoading(true);
    API.eventManagement
      .updateEvent(event)
      .then(() => {
        onCancel(true);
        setLoading(false);
      })
      .catch((error: Error) => {
        setLoading(false);
        console.log({ location: "updateEvent", error });
      });
  };

  const deleteEvent = (id: string): void => {
    setLoading(true);
    API.eventManagement
      .deleteEvent(id)
      .then(() => {
        setLoading(false);
        onCancel(true);
        getEvents();
      })
      .catch((error: Error) => {
        setLoading(false);
        console.log({ location: "deleteEvent", error });
      });
  };

  const getEvents = (): void => {
    setLoading(true);
    API.eventManagement
      .getEvent(filters)
      .then((events: EventType[]) => {
        setEvents(events);
        setLoading(false);
      })
      .catch((error: Error) => {
        setLoading(false);
        console.log({ location: "getEvents", error });
      });
  };

  return (
    <div className="event-management__container">
      <Modal
        title={<>Delete Confirmation</>}
        open={action === "DELETE"}
        onOk={onDeleteConfirm}
        onCancel={() => onCancel()}
        okText="Yes"
        cancelText="No"
        okType="danger"
      >
        Once deleted it cannot be undo
      </Modal>
      {(!action || action === "DELETE") && (
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
                    value={filters.type}
                    onChange={(type) => {
                      setFilters({ ...filters, type });
                    }}
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
                    onChange={(status) => {
                      setFilters({ ...filters, status });
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
          <Row gutter={[16, 16]}>{renderEvents()}</Row>
        </>
      )}
      {action && action !== "DELETE" && (
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
                  onClick={() => onCancel()}
                />
              </Col>
              <Col>
                <Text strong italic className="back-text">
                  Back
                </Text>
              </Col>
            </Row>
          </Col>
        </Row>
      )}
      <div
        className={
          screen === "MOBILE" ? "creation-form-mobile" : "creation-form"
        }
      >
        {action === "ADD" && !isPreview && (
          <Form layout="vertical" form={form}>
            <Form.Item label="Select Event" name="eventType">
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

        {(action === "ADD" || action === "EDIT") &&
          !isPreview &&
          eventType === EVENT_TYPES.MARRIAGE && (
            <MarriageEventCreation
              contactList={directoryList}
              templates={templates}
              onHandleEvent={handleEventPreview}
              isEdit={action === "EDIT" || action === "ADD"}
              event={selectedEvents}
            />
          )}
        {(action === "ADD" || action === "EDIT") &&
          !isPreview &&
          eventType === EVENT_TYPES.BIRTHDAY && (
            <BirthdayEventCreation
              contactList={directoryList}
              templates={templates}
              onHandleEvent={handleEventPreview}
              isEdit={action === "EDIT" || action === "ADD"}
              event={selectedEvents}
            />
          )}
      </div>
      {(action === "VIEW" ||
        ((action === "ADD" || action === "EDIT") && isPreview)) && (
        <PreviewEvent onSubmit={handleSubmitEvent} />
      )}
    </div>
  );
};
