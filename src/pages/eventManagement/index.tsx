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
import React, { Dispatch, useState } from "react";
import { API } from "../../api";
import { BirthdayEventCard } from "../../components/birthdayEventCard";
import { BirthdayEventCreation } from "../../components/birthdayEventCreation";
import { MarriageEventCard } from "../../components/marriageEventCard";
import { MarriageEventCreation } from "../../components/marriageEventCreation";
import {
  EDITABLE_EVENT_STATUS,
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
  DebounceFnType,
  Events,
  EventType,
  TemplateType,
} from "../../types";
import "./styles.scss";
import NoEvents from "../../assets/svg/no-events.svg";
import { PreviewEvent } from "../../components/previewEvent";
import { OtherEventCreation } from "../../components/otherEventCreation";
import { debounce } from "lodash";
import { removeEmptyProp } from "../../utils/common.utils";
import { OtherEventCard } from "../../components/otherEventCard";
import { EmptyData } from "../../components/EmptyData";
import {
  modalClassNames,
  modalStyles,
  useModalStyle,
} from "../../configs/antd.config";
import { createStyles, useTheme } from "antd-style";

const imageUrl = new URL(`../../assets/svg/vaccum-event.svg`, import.meta.url);

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
  const { styles } = useModalStyle();
  const token = useTheme();
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
  const [searchTemplate, setSearchTemplate] = useState("");
  const [isTemplateFetching, setIsTemplateFetching] = useState(false);
  const [searchContact, setSearchContact] = useState("");
  const [isContactFetching, setIsContactFetching] = useState(false);
  const [templateSearchQuery, setTemplateSearchQuery]: [
    DebounceFnType,
    Dispatch<any>
  ] = React.useState({});
  const [contactSearchQuery, setContactSearchQuery]: [
    DebounceFnType,
    Dispatch<any>
  ] = React.useState({});

  const channel = Form.useWatch("channel", { form, preserve: true });
  const messageTemplate = Form.useWatch("messageTemplate", {
    form,
    preserve: true,
  });
  console.log({ messageTemplate });

  React.useEffect(() => {
    console.log({ channel });
    form.setFieldValue("messageTemplate", undefined);
    getTemplates({ channel });
  }, [channel]);

  React.useEffect(() => {
    form.setFieldValue("eventType", eventType || undefined);
  }, [eventType]);

  React.useEffect(() => {
    getContactDirectory();
    return () => {
      console.log("unmounting");
      setFilters({});
      setEventType("");
      form.resetFields();
      setAction("");
    };
  }, []);

  React.useEffect(() => {
    console.log({ searchTemplate });
    if (searchTemplate) {
      const search = debounce(getTemplates, 1000);
      setTemplateSearchQuery((prevSearch: DebounceFnType) => {
        if (prevSearch.cancel) {
          prevSearch.cancel();
        }
        return search;
      });
      search({ name: searchTemplate, type: eventType });
    }
  }, [searchTemplate]);

  React.useEffect(() => {
    console.log({ searchContact });
    if (searchContact) {
      const search = debounce(getContactDirectory, 1000);
      setContactSearchQuery((prevSearch: DebounceFnType) => {
        if (prevSearch.cancel) {
          prevSearch.cancel();
        }
        return search;
      });
      search({ name: searchContact });
    }
  }, [searchContact]);

  React.useEffect(() => {
    if (!action) getEvents();
  }, [filters, action]);

  React.useEffect(() => {
    const isEdit = action === "EDIT" || action === "ADD";

    if (isEdit) {
      const event = selectedEvents;
      const formValues = removeEmptyProp(event);
      if (event?.startDateTime && event?.endDateTime) {
        formValues.dateTime = [
          dayjs(event?.startDateTime),
          dayjs(event?.endDateTime),
        ];
      }
      if (event?.triggerDateTime) {
        formValues.triggerDateTime = dayjs(event?.triggerDateTime);
      }

      form.setFieldsValue(formValues);
    }
  }, []);

  const handleEvent = (event: any): void => {
    const { dateTime, triggerDateTime } = event;
    if (dateTime) {
      event.startDateTime = dayjs(dateTime[0]).format();
      event.endDateTime = dayjs(dateTime[1]).format();
    }
    if (triggerDateTime) {
      event.triggerDateTime = dayjs(triggerDateTime).format();
    }
    console.log(event);
    handleEventPreview(event);
  };

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
    if (EDITABLE_EVENT_STATUS.includes(data.status as string)) {
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
        } else if (event.type === EVENT_TYPES.OTHERS) {
          return (
            <Col {...colProps}>
              <OtherEventCard {...event} menuItems={getMenuItems(event)} />
            </Col>
          );
        } else {
          return <></>;
        }
      })
    ) : (
      <EmptyData
        onClickAction={() => {
          setAction("ADD");
        }}
        image={NoEvents}
        description="No events to show"
        buttonText="Create Event"
      />
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

  const getContactDirectory = (filters = {}): any => {
    setIsContactFetching(true);
    API.contactManagement
      .getContactDirectory(filters)
      .then((contacts: ContactDirectoryType[]) => {
        setDirectoryList(contacts);
        setIsContactFetching(false);
      })
      .catch((error: Error) => {
        setIsContactFetching(false);
        console.log({ location: "getContactDirectory", error });
      });
  };

  const getTemplates = (filters = {}): void => {
    setIsTemplateFetching(true);
    API.templateManagement
      .getTemplate(filters)
      .then((templates: TemplateType[]) => {
        setTemplates(templates);
        setIsTemplateFetching(false);
      })
      .catch((error: Error) => {
        setIsTemplateFetching(false);
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
        classNames={modalClassNames(styles)}
        styles={modalStyles(token) as any}
      >
        <img src={imageUrl as any} width={"100%"} alt="" />
        <Text italic style={{ textAlign: "center" }}>
          Once deleted it cannot be undo
        </Text>
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
                    // defaultValue={[
                    //   dayjs("2015/01/01", EVENT_DATE_FORMAT),
                    //   dayjs("2015/01/01", EVENT_DATE_FORMAT),
                    // ]}
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
                <Button
                  size="large"
                  type="text"
                  onClick={() => {
                    onCancel;
                  }}
                  icon={
                    <FontAwesomeIcon icon={faArrowLeft} className="back-icon" />
                  }
                >
                  back
                </Button>
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
              form={form}
              isTemplateFetching={isTemplateFetching}
              onSearchTemplate={(value) => setSearchTemplate(value)}
              onHandleEvent={handleEvent}
              isContactFetching={isContactFetching}
              onSearchContact={(value) => setSearchContact(value)}
              isEdit={action === "EDIT" || action === "ADD"}
            />
          )}
        {(action === "ADD" || action === "EDIT") &&
          !isPreview &&
          eventType === EVENT_TYPES.BIRTHDAY && (
            <BirthdayEventCreation
              contactList={directoryList}
              templates={templates}
              isTemplateFetching={isTemplateFetching}
              form={form}
              onSearchTemplate={(value) => setSearchTemplate(value)}
              onHandleEvent={handleEvent}
              isContactFetching={isContactFetching}
              onSearchContact={(value) => setSearchContact(value)}
              isEdit={action === "EDIT" || action === "ADD"}
            />
          )}
        {(action === "ADD" || action === "EDIT") &&
          !isPreview &&
          eventType === EVENT_TYPES.OTHERS && (
            <OtherEventCreation
              contactList={directoryList}
              templates={templates}
              form={form}
              isTemplateFetching={isTemplateFetching}
              onSearchTemplate={(value) => setSearchTemplate(value)}
              isContactFetching={isContactFetching}
              onSearchContact={(value) => setSearchContact(value)}
              onHandleEvent={handleEvent}
              isEdit={action === "EDIT" || action === "ADD"}
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
