import {
  AppstoreOutlined,
  BarsOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
} from "@ant-design/icons";
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
  Badge,
  Space,
  Segmented,
  Tabs,
  Alert,
} from "antd";
import dayjs from "dayjs";
import React, { Dispatch, useState } from "react";
import { API } from "../../api";
import { EventManagement as EventManagementComponent } from "../../components/eventManagement";
import {
  EVENT_DATE_FORMAT,
  EVENT_STATUS,
  EVENT_STATUS_LABEL,
  EVENT_STATUS_LABEL_COLOR,
  EVENT_TYPE_PROPS,
  LOCAL_STORAGE_VIEW,
  PAGE_ACTION,
  TEMPLATE_URL_PATH_ACTION,
} from "../../constants";
import { useBearStore } from "../../store";
import {
  AttachmentType,
  ContactDirectoryType,
  DebounceFnType,
  EventFilterType,
  Events,
  EventType,
  TemplateType,
} from "../../types";
import "./styles.scss";
import NoEvents from "../../assets/svg/no-events.svg";
import { debounce } from "lodash";
import {
  removeEmptyProp,
  removeFalsyValues,
  urlhandler,
} from "../../utils/common.utils";
import FilterListIcon from "@mui/icons-material/FilterList";
import { EmptyData } from "../../components/EmptyData";
import {
  modalClassNames,
  modalStyles,
  useModalStyle,
} from "../../configs/antd.config";
import { useTheme } from "antd-style";
import { useSearchParams } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { EventCard } from "../../components/eventCard";
import { eventColumns } from "./config";
import { EVENT_COLUMN_KEYS, SORT_KEYS } from "./constant";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { DataTable } from "../../components/dataTable";
import { EventAlbum } from "../../components/eventAlbum";
import { initialSelectedEvent } from "../../store/event.store";

const imageUrl = new URL(`../../assets/svg/vaccum-event.svg`, import.meta.url);

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

const eventLabel: any = EVENT_STATUS_LABEL;

const STEPS = [
  {
    title: "Event",
    content: "first-content",
  },
  {
    title: "Album",
    content: "second-content",
  },
];

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
  const [searchParams, setSearchParams] = useSearchParams();
  const { screen, setLoading, isLoading } = useBearStore.appStore();
  const { activePlan } = useBearStore.userStore();
  const [isPreview, setIsPreview] = React.useState(false);
  const { setDirectoryList, directoryList, contactList } =
    useBearStore.contactStore();
  const { setTemplates, templates } = useBearStore.templateStore();
  const {
    action,
    events,
    filters,
    selectedEvents,
    isListView,
    setIsListView,
    setAction,
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
  const [isFilter, setIsFilter] = React.useState(false);
  const [current, setCurrent] = React.useState(1);

  const channel = Form.useWatch("channel", { form, preserve: true });
  const eventType = Form.useWatch("eventType", {
    form,
    preserve: true,
  });

  const colOption = (count: number) =>
    screen === "MOBILE"
      ? {
          flex: count,
        }
      : { span: count };

  React.useEffect(() => {
    getTemplates({ channel });
  }, [channel]);

  React.useEffect(() => {
    const filters: EventFilterType = {
      status: searchParams.get("status") as string,
      type: searchParams.get("type") as string,
      fromDate: searchParams.get("fromDate") as string,
      toDate: searchParams.get("toDate") as string,
    };

    urlhandler(searchParams, setAction, getEventById, () => {
      getEvents(filters);
    });
    return () => {
      setCurrent(1);
      setSelectedEvents(initialSelectedEvent);
    };
  }, [searchParams]);

  React.useEffect(() => {
    const filters: EventFilterType = {
      status: searchParams.get("status") as string,
      type: searchParams.get("type") as string,
      fromDate: searchParams.get("fromDate") as string,
      toDate: searchParams.get("toDate") as string,
    };
    setFilters(filters);
  }, []);

  React.useEffect(() => {
    getContactDirectory();
    setIsListView(localStorage.getItem(LOCAL_STORAGE_VIEW.EVENT) === "List");
    return () => {
      console.log("unmounting");
      setFilters({});
      form.resetFields();
      setAction("");
    };
  }, []);

  React.useEffect(() => {
    const search = debounce(getTemplates, 1000);
    setTemplateSearchQuery((prevSearch: DebounceFnType) => {
      if (prevSearch.cancel) {
        prevSearch.cancel();
      }
      return search;
    });
    search({
      name: searchTemplate,
      type: eventType,
      approvalStatus: EVENT_STATUS.APPROVED,
    });
  }, [searchTemplate]);

  React.useEffect(() => {
    const search = debounce(getContactDirectory, 1000);
    setContactSearchQuery((prevSearch: DebounceFnType) => {
      if (prevSearch.cancel) {
        prevSearch.cancel();
      }
      return search;
    });
    search({ name: searchContact?.trim() });
  }, [searchContact]);

  React.useEffect(() => {
    const event = selectedEvents;
    const formValues = removeEmptyProp(event);
    if (event?.startDateTime && event?.endDateTime) {
      if (screen !== "MOBILE") {
        formValues.dateTime = [
          dayjs(event?.startDateTime),
          dayjs(event?.endDateTime),
        ];
      } else {
        formValues.startDateTime = dayjs(event?.startDateTime).format(
          "YYYY-MM-DDTHH:mm"
        );
        formValues.endDateTime = dayjs(event?.endDateTime).format(
          "YYYY-MM-DDTHH:mm"
        );
      }
    }

    form.setFieldsValue(formValues);
  }, [selectedEvents]);

  const handleEvent = (event: any): void => {
    const { dateTime, triggerDateTime } = event;
    if (screen !== "MOBILE") {
      if (dateTime) {
        event.startDateTime = dayjs(dateTime[0]).format();
        event.endDateTime = dayjs(dateTime[1]).format();
      }
    }
    if (triggerDateTime) {
      event.triggerDateTime = dayjs(triggerDateTime).format();
    }
    const selectedEvent = {
      ...selectedEvents,
      ...event,
      type: eventType as Events,
    };
    setSelectedEvents(selectedEvent);
    handleSubmitEvent(selectedEvent);
    // handleEventPreview(event);
  };

  const getMenuItems = (data: EventType): MenuProps["items"] => {
    const menu = [
      {
        label: "View",
        key: "view",
        onClick: () => onViewSelect(data),
        icon: <EyeOutlined />,
      },
    ];

    if (data.isEditable) {
      menu.push({
        label: "Edit",
        key: "edit",
        onClick: () => onEditSelect(data),
        icon: <EditOutlined />,
      });
    }
    if (data.isDeleteAllowed) {
      menu.push({
        label: "Delete",
        key: "delete",
        onClick: () => onDeleteSelect(data),
        icon: <DeleteOutlined />,
      });
    }

    return menu;
  };

  const colProps: ColProps = {};
  if (screen === "MOBILE") {
    colProps.flex = 8;
  } else {
    colProps.span = 8;
  }

  const onCancel = (isClearAction?: boolean) => {
    setIsPreview(false);
    if (!isPreview || isClearAction) {
      setSearchParams({});
      form.resetFields();
    }
    if (action === "DELETE") {
      setAction("");
    }
  };

  const onDeleteSelect = (record: EventType) => {
    setAction("DELETE");
    setSelectedEvents(record);
  };

  const onCancelSelect = () => {
    if (action === "ADD") {
      setSearchParams({});
      form.resetFields();
    } else {
      setSearchParams({
        id: selectedEvents.id as string,
        action: PAGE_ACTION.VIEW,
      });
    }
  };

  const onViewSelect = (record: EventType) => {
    setSearchParams({
      id: record.id as string,
      action: PAGE_ACTION.VIEW,
    });
  };

  const onDeleteConfirm = () => {
    const { id } = selectedEvents;
    deleteEvent(id as string);
  };

  const onEditSelect = (record: EventType) => {
    setSearchParams({
      id: record.id as string,
      action: PAGE_ACTION.EDIT,
    });
  };

  eventColumns.forEach((column) => {
    if (column.key === EVENT_COLUMN_KEYS.ACTION) {
      column.render = (record) => (
        <Space>
          {record.isEditable && (
            <EditOutlinedIcon
              fontSize="inherit"
              onClick={() => {
                onEditSelect(record);
              }}
              style={{ color: "rgb(102, 112, 133)", cursor: "pointer" }}
            />
          )}
          {/* <VisibilityIcon
            fontSize="inherit"
            onClick={() => {
              onViewSelect(record);
            }}
            style={{ color: "rgb(102, 112, 133)", cursor: "pointer" }}
          /> */}
        </Space>
      );
    } else if (column.key === EVENT_COLUMN_KEYS.NAME) {
      column.render = (record) => (
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            onViewSelect(record);
          }}
        >
          {record.name}
        </div>
      );
    }
  });

  const renderEvents = (): React.ReactNode => {
    return events.length ? (
      isListView ? (
        <DataTable columns={eventColumns} data={events} sortKeys={SORT_KEYS} />
      ) : (
        events?.map((event) => (
          <Col {...colProps}>
            <EventCard {...event} onSelect={() => onViewSelect(event)} />
          </Col>
        ))
      )
    ) : (
      <EmptyData
        onClickAction={() => {
          setSearchParams({
            action: PAGE_ACTION.ADD,
          });
        }}
        image={NoEvents}
        description="No events to show"
        buttonText={
          (activePlan?.templateCount as number) > 0 ? "Create" : undefined
        }
      />
    );
  };

  const handleSubmitEvent = (event: EventType) => {
    if (action === "ADD") {
      createEvent(event);
    } else if (action === "EDIT") {
      updateEvent(event);
    }
  };

  const handleUpdateEventNotification = (event: EventType) => {
    updateEvent({ ...event, id: selectedEvents.id }, true);
  };

  const handleEventPreview = (event: EventType) => {
    setSelectedEvents({
      ...selectedEvents,
      ...event,
      type: eventType as Events,
    });
    handleSubmitEvent({
      ...selectedEvents,
      ...event,
      type: eventType as Events,
    });
    // setIsPreview(true);
  };

  const handleFileUpload = async (e: any): Promise<void> => {
    const { file } = e;
    console.log({ file });
    const { status, preview, uid, id, name } = file;
    if (file.status === "removed") {
      const invitationAttachment: AttachmentType[] =
        form.getFieldValue("invitationAttachment") || [];
      const _invitationAttachment = invitationAttachment.filter(
        (invitation: AttachmentType) => invitation.id !== id
      );
      form.setFieldValue("invitationAttachment", _invitationAttachment);
    } else if (file?.size && file.size < 5000000) {
      setLoading(true);
      API.commonAPI
        .uploadFile(file, "invitation")
        .then((blobId: string) => {
          setLoading(false);
          const invitationAttachment: AttachmentType[] =
            form.getFieldValue("invitationAttachment") || [];
          invitationAttachment.push({
            id: uid,
            name,
            url: blobId,
          });
          form.setFieldValue("invitationAttachment", invitationAttachment);
        })
        .catch((error: Error) => {
          setLoading(false);
          console.log({ location: "handleFileUpload", error });
        });
    } else {
      console.error("Upload file error", file);
    }
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
      .getTemplate(TEMPLATE_URL_PATH_ACTION.ALL, filters)
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

  const updateEvent = (
    event: EventType,
    isNotificationUpdate?: boolean
  ): void => {
    setLoading(true);
    API.eventManagement
      .updateEvent(event)
      .then(() => {
        setLoading(false);
        if (isNotificationUpdate) {
          getEventById(selectedEvents.id as string);
        } else {
          onCancel(true);
        }
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

  const getEvents = (filters = {}): void => {
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

  const getEventById = (id: string): void => {
    setLoading(true);
    API.eventManagement
      .getEvent({ id })
      .then((events: EventType[]) => {
        setLoading(false);
        console.log({ reeventscord: events, len: events?.length });
        if (events?.length) {
          const record = events?.[0];
          // setEventType(record.type);
          form.setFieldValue("eventType", record.type);
          console.log({ events });
          setSelectedEvents(record);
        }
      })
      .catch((error: Error) => {
        setLoading(false);
        console.log({ location: "getEvents", error });
      });
  };

  const handleFilterChange = (filter = {}) => {
    const _filters: any = { ...filters, ...filter };
    if (!Object.values(filter)?.[0]) {
      delete _filters[Object.keys(filter)[0]];
    }
    const filterValue = removeFalsyValues(_filters);
    setFilters(filterValue);
    setSearchParams({
      ...filterValue,
    });
  };

  const formatDateRange = (fromDate: string, toDate: string) => {
    if (fromDate && toDate) {
      return [
        dayjs(fromDate, EVENT_DATE_FORMAT),
        dayjs(toDate, EVENT_DATE_FORMAT),
      ];
    }
  };

  const items = STEPS.map((item, index) => ({
    key: `${index + 1}`,
    label: item.title,
    title: item.title,
  }));

  const contentStyle: React.CSSProperties = {
    // lineHeight: "260px",
    // height: height - 300,
    textAlign: "center",
    color: token.colorTextTertiary,
    // backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    // border: `1px solid ${token.colorBorder}`,
    marginTop: 16,
  };

  const renderComponent = (current: number) => {
    switch (current) {
      case 1: {
        return (
          <EventManagementComponent
            contactList={directoryList}
            templates={templates}
            form={form}
            isTemplateFetching={isTemplateFetching}
            onSearchTemplate={(value) => setSearchTemplate(value)}
            onHandleEvent={handleEvent}
            isContactFetching={isContactFetching}
            onSearchContact={(value) => setSearchContact(value)}
            isEdit={action === "EDIT"}
            action={action}
            getContactDirectory={getContactDirectory}
            getTemplates={(filter) =>
              getTemplates({
                ...filter,
                type: selectedEvents.type,
              })
            }
            handleFileUpload={handleFileUpload}
            handleUpdateEventNotification={handleUpdateEventNotification}
          />
        );
      }
      case 2: {
        return <EventAlbum />;
      }
      default:
        return <></>;
    }
  };

  const onChange = (value: number) => {
    setCurrent(value);
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
        confirmLoading={isLoading}
      >
        <img loading="lazy" src={imageUrl as any} width={"100%"} alt="" />
        <Text italic style={{ textAlign: "center" }}>
          Once deleted it cannot be undo
        </Text>
      </Modal>
      {(!action || action === "DELETE") && (
        <>
          <Row wrap gutter={[8, 8]}>
            <Col span={12}>
              <Title level={3}> Events</Title>
            </Col>
          </Row>
          <Row wrap gutter={[8, 8]} className="upcoming-event__pagination">
            <Col span={24}>
              {(activePlan?.eventCount as number) > 0 && (
                <Button
                  type="primary"
                  onClick={() => {
                    setSearchParams({
                      action: PAGE_ACTION.ADD,
                    });
                  }}
                >
                  Create
                </Button>
              )}
              <Button
                type="text"
                icon={
                  <Badge count={Object.values(filters).filter((_) => _).length}>
                    <FilterListIcon fontSize="inherit" />
                  </Badge>
                }
                onClick={() => {
                  setIsFilter(!isFilter);
                }}
              >
                Filter
              </Button>
              <Segmented
                style={{ margin: "10px" }}
                value={isListView ? "List" : "Card"}
                options={[
                  {
                    value: "List",
                    icon: <BarsOutlined />,
                  },
                  {
                    value: "Card",
                    icon: <AppstoreOutlined />,
                  },
                ]}
                onChange={(value) => {
                  localStorage.setItem(
                    LOCAL_STORAGE_VIEW.EVENT,
                    value.toString()
                  );
                  setIsListView(value === "List");
                }}
              />
            </Col>
          </Row>
          {isFilter && (
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
                        handleFilterChange({ type });
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
                        handleFilterChange({ status });
                      }}
                    />
                  </Form.Item>
                </Form>
              </Col>
              <Col className="upcoming-event__date-picker" flex={6}>
                <Form layout="vertical">
                  <Form.Item label="Event date range">
                    <RangePicker
                      style={{ width: "100%" }}
                      value={
                        formatDateRange(
                          filters.fromDate as string,
                          filters.toDate as string
                        ) as any
                      }
                      onChange={(e) => {
                        if (e) {
                          handleFilterChange({
                            fromDate: dayjs(e?.[0]),
                            toDate: dayjs(e?.[1]),
                          });
                        } else {
                          const _filters: any = { ...filters };
                          delete _filters.fromDate;
                          delete _filters.toDate;
                          const filter = removeFalsyValues(_filters);
                          setFilters(filter);
                          setSearchParams(filter);
                        }
                      }}
                      format={EVENT_DATE_FORMAT}
                    />
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          )}
          <div className="padding-bottom-8">
            <Alert
              message={
                (activePlan?.eventCount as number) <= 0
                  ? `According to your plan, you have successfully created all ${activePlan?.pricingPlan?.eventCount} events allowed.`
                  : `According to your plan, you have currently created ${
                      (activePlan?.pricingPlan?.eventCount as number) -
                      (activePlan?.eventCount as number)
                    } out of ${activePlan?.pricingPlan?.eventCount} events.`
              }
              type="info"
              showIcon
              closable
            />
          </div>
          <Row gutter={[16, 16]}>{renderEvents()}</Row>
        </>
      )}
      {action && action !== "DELETE" && (
        <Row gutter={[16, 16]} className="header__row sticky-header">
          <Col flex={12}>
            <Row className="header__container">
              <Col {...colOption(4)} className="back-icon__container">
                <Button
                  type="text"
                  onClick={() => {
                    onCancel();
                  }}
                  icon={<KeyboardBackspaceIcon className="back-icon" />}
                >
                  back
                </Button>
              </Col>

              {current === 1 && (
                <Col {...colOption(20)}>
                  <div style={{ float: "right" }}>
                    {selectedEvents.isEditable && (
                      <Button
                        type={action === "VIEW" ? "primary" : "default"}
                        onClick={() => {
                          action === "VIEW"
                            ? onEditSelect(selectedEvents)
                            : onCancelSelect();
                        }}
                      >
                        {action === "VIEW" ? "Edit" : "Cancel"}
                      </Button>
                    )}
                    {selectedEvents.isDeleteAllowed && action === "VIEW" && (
                      <Button
                        danger
                        onClick={() => {
                          onDeleteSelect(selectedEvents);
                        }}
                        style={{ marginLeft: ".5rem" }}
                      >
                        Delete
                      </Button>
                    )}
                  </div>
                </Col>
              )}
            </Row>
          </Col>
        </Row>
      )}
      <div
        className={
          screen === "MOBILE" ? "creation-form-senderId" : "creation-form"
        }
      >
        {action === "ADD" && !isPreview && (
          <Form layout="vertical" form={form}>
            <Form.Item label="Select Event" name="eventType">
              <Select
                style={{ width: "100%" }}
                allowClear
                placeholder="Select a event"
                optionFilterProp="children"
                options={eventTypeOptions}
              />
            </Form.Item>
          </Form>
        )}

        {(action === "ADD" || action === "EDIT" || action === "VIEW") &&
          eventType &&
          !isPreview && (
            <>
              {action === "VIEW" && (
                <Tabs
                  onChange={(value) => {
                    onChange(Number(value));
                  }}
                  activeKey={current.toString()}
                  type="card"
                  items={items}
                />
              )}

              <div style={contentStyle}>{renderComponent(current)}</div>
            </>
          )}
      </div>
    </div>
  );
};
