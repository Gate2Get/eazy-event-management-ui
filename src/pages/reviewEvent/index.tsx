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
  Tag,
  Typography,
  Modal,
  Input,
  InputNumber,
  Space,
} from "antd";
import dayjs from "dayjs";
import React from "react";
import { API } from "../../api";
import { BirthdayEventCard } from "../../components/birthdayEventCard";
import { MarriageEventCard } from "../../components/marriageEventCard";
import {
  EVENT_ADMIN_ACTION,
  EVENT_DATE_FORMAT,
  EVENT_STATUS_LABEL,
  EVENT_STATUS_LABEL_COLOR,
  EVENT_TYPES,
  EVENT_TYPE_PROPS,
  PAGE_ACTION,
} from "../../constants";
import { useBearStore } from "../../store";
import {
  ContactDirectoryType,
  EventAdminType,
  EventFilterType,
  EventType,
} from "../../types";
import "./styles.scss";
import NoEvents from "../../assets/svg/no-events.svg";
import { urlhandler } from "../../utils/common.utils";
import { OtherEventCard } from "../../components/otherEventCard";
import { EmptyData } from "../../components/EmptyData";
import {
  modalClassNames,
  modalStyles,
  useModalStyle,
} from "../../configs/antd.config";
import { useTheme } from "antd-style";
import { useSearchParams } from "react-router-dom";
import { EventAdminPreview } from "../../components/eventAdminPreview";
import { ButtonProps } from "antd/lib/button";
import { EventCard } from "../../components/eventCard";
const { TextArea } = Input;

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

export const ReviewEvent = () => {
  const { styles } = useModalStyle();
  const token = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  const { screen, setLoading } = useBearStore.appStore();
  const [adminActionStatus, setAdminActionStatus] = React.useState("");
  const [comment, setComment] = React.useState("");
  const [isError, setIsError] = React.useState(false);
  const [price, setPrice] = React.useState(0);
  const { setDirectoryList } = useBearStore.contactStore();
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
  }, [searchParams]);

  React.useEffect(() => {
    getContactDirectory();
    return () => {
      console.log("unmounting");
      setFilters({});
      setEventType("");
      setAction("");
      onCancel();
    };
  }, []);

  const colProps: ColProps = {};
  if (screen === "MOBILE") {
    colProps.flex = 8;
  } else {
    colProps.span = 8;
  }

  const onCancel = (isClearAction?: boolean) => {
    if (isClearAction) {
      setSearchParams({});
    }
    setComment("");
    setIsError(false);
    setPrice(0);
    setAdminActionStatus("");
  };

  const onAdminActionSelect = (status: string) => {
    setAdminActionStatus(status);
  };

  const onViewSelect = (record: EventType) => {
    setSearchParams({
      id: record.id,
      action: PAGE_ACTION.VIEW,
    });
  };

  const onActionConfirm = () => {
    const { id } = selectedEvents;
    let isValid;
    if (adminActionStatus === "APPROVED") {
      isValid = comment && price;
    } else {
      isValid = comment;
    }

    if (isValid) {
      setIsError(false);
      adminEventAction({
        id,
        approvalStatus: adminActionStatus,
        price,
      });
      onCancel();
    } else {
      setIsError(true);
    }
  };

  const renderEvents = (): React.ReactNode => {
    return events.length ? (
      events.map((event) => (
        <Col {...colProps} onClick={() => onViewSelect(event)}>
          <EventCard {...event} />
        </Col>
      ))
    ) : (
      <EmptyData
        image={NoEvents}
        description="No events to show"
        buttonText="Create Event"
      />
    );
  };

  const getContactDirectory = (filters = {}): any => {
    setLoading(true);
    API.contactManagement
      .getContactDirectory(filters)
      .then((contacts: ContactDirectoryType[]) => {
        setDirectoryList(contacts);
        setLoading(false);
      })
      .catch((error: Error) => {
        setLoading(false);
        console.log({ location: "getContactDirectory", error });
      });
  };

  const adminEventAction = (payload: EventAdminType): any => {
    setLoading(true);
    API.adminAPI
      .adminEventAction(payload)
      .then((response) => {
        setLoading(false);
        getEventById(selectedEvents.id);
      })
      .catch((error: Error) => {
        setLoading(false);
        console.log({ location: "adminEventAction", error });
      });
  };

  const getEvents = (filters = {}): void => {
    setLoading(true);
    API.adminAPI
      .getEvents(filters)
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
    API.adminAPI
      .getEvents({ id })
      .then((events: EventType[]) => {
        setLoading(false);
        if (events?.length) {
          const record = events?.[0];
          setEventType(record.type);
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
    console.log(Object.values(filter), "Object.values(filter)");
    if (!Object.values(filter)?.[0]) {
      delete _filters[Object.keys(filter)[0]];
    }
    console.log({ _filters });
    setFilters(_filters);
    setSearchParams({
      ..._filters,
    });
  };

  const colOption = (count: number) =>
    screen === "MOBILE"
      ? {
          flex: count,
        }
      : { span: count };

  return (
    <div className="event-review__container">
      <Modal
        title={
          <>
            {adminActionStatus} - {selectedEvents.name} ?
          </>
        }
        open={!!adminActionStatus}
        onOk={onActionConfirm}
        onCancel={() => onCancel()}
        okText="Yes"
        cancelText="No"
        okType={adminActionStatus === "REJECTED" ? "danger" : "primary"}
        classNames={modalClassNames(styles)}
        styles={modalStyles(token) as any}
      >
        <Space direction="vertical" size="small" style={{ width: "100%" }}>
          {adminActionStatus === "APPROVED" && (
            <InputNumber
              status={isError && !price ? "error" : ""}
              value={price}
              placeholder="Price"
              addonBefore="₹"
              onChange={(value) => {
                setPrice(Number(value));
              }}
              style={{ float: "left" }}
            />
          )}
          <TextArea
            showCount
            maxLength={150}
            value={comment}
            status={isError && !comment ? "error" : ""}
            onChange={(e) => {
              setComment(e.target.value);
            }}
            placeholder="Comments"
            style={{ marginBottom: "10px" }}
          />
        </Space>
      </Modal>
      {(!action || action === "DELETE") && (
        <>
          <Row className="event-review__filters" gutter={[8, 8]}>
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
                    size="middle"
                    // defaultValue={[
                    //   dayjs("2015/01/01", EVENT_DATE_FORMAT),
                    //   dayjs("2015/01/01", EVENT_DATE_FORMAT),
                    // ]}
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
                        setFilters(_filters);
                        setSearchParams({
                          ..._filters,
                        });
                      }
                    }}
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
          </Row>
          <Row gutter={[16, 16]} className="event-list">
            {renderEvents()}
          </Row>
        </>
      )}
      {action && action !== "DELETE" && (
        <Row gutter={[16, 16]} className="header__row">
          <Col flex={12}>
            <Row className="header__container">
              <Col {...colOption(4)} className="back-icon__container">
                <Button
                  type="text"
                  onClick={() => {
                    onCancel(true);
                  }}
                  icon={
                    <FontAwesomeIcon icon={faArrowLeft} className="back-icon" />
                  }
                >
                  back
                </Button>
              </Col>
              <Col {...colOption(20)}>
                {EVENT_ADMIN_ACTION.map((button) => (
                  <Button
                    {...(button.props as ButtonProps)}
                    onClick={() => {
                      onAdminActionSelect(button.key);
                    }}
                    style={{ float: "right", margin: ".1rem" }}
                  >
                    {button.label}
                  </Button>
                ))}
              </Col>
            </Row>
          </Col>
        </Row>
      )}
      {action === "VIEW" && <EventAdminPreview />}
    </div>
  );
};
