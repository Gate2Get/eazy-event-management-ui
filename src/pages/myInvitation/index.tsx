import {
  Button,
  Col,
  DatePicker,
  Form,
  Row,
  Select,
  Tag,
  Typography,
} from "antd";
import dayjs from "dayjs";
import React from "react";
import { API } from "../../api";
import {
  EVENT_DATE_FORMAT,
  EVENT_STATUS_LABEL,
  EVENT_STATUS_LABEL_COLOR,
  EVENT_TYPE_PROPS,
  PAGE_ACTION,
} from "../../constants";
import { useBearStore } from "../../store";
import { EventFilterType, EventType, MyInvitationType } from "../../types";
import "./styles.scss";
import NoEvents from "../../assets/svg/no-events.svg";
import { removeFalsyValues, urlhandler } from "../../utils/common.utils";
import { EmptyData } from "../../components/EmptyData";
import { useModalStyle } from "../../configs/antd.config";
import { useSearchParams } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { EventCard } from "../../components/eventCard";
import { InvitationCard } from "../../components/invitationCard";

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

export const MyInvitation = () => {
  const { styles } = useModalStyle();
  const [searchParams, setSearchParams] = useSearchParams();
  const { screen, setLoading } = useBearStore.appStore();
  const [isPreview, setIsPreview] = React.useState(false);
  const {
    action,
    events,
    filters,
    selectedInvitation,
    myInvitations,
    setAction,
    setFilters,
    setSelectedInvitation,
    setMyInvitations,
  } = useBearStore.eventStore();
  const [form] = Form.useForm();

  const colOption = (count: number) =>
    screen === "MOBILE"
      ? {
          flex: count,
        }
      : { span: count };

  React.useEffect(() => {
    const filters: EventFilterType = {
      status: searchParams.get("status") as string,
      type: searchParams.get("type") as string,
      fromDate: searchParams.get("fromDate") as string,
      toDate: searchParams.get("toDate") as string,
    };

    urlhandler(
      searchParams,
      setAction,
      (id) => {
        getMyInvitation(setSelectedInvitation, { id });
      },
      () => {
        getMyInvitation(setMyInvitations, filters);
      }
    );
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

  const onCancel = (isClearAction?: boolean) => {
    setIsPreview(false);
    if (!isPreview || isClearAction) {
      setSearchParams({});
    }
    if (action === "DELETE") {
      setAction("");
    }
    form.resetFields();
  };

  const onViewSelect = (record: EventType) => {
    setSearchParams({
      id: record.id,
      action: PAGE_ACTION.VIEW,
    });
  };

  const renderEvents = (): React.ReactNode => {
    return myInvitations.length ? (
      myInvitations.map((event) => (
        <Col {...colOption(8)}>
          <EventCard {...event} onSelect={() => onViewSelect(event)} />
        </Col>
      ))
    ) : (
      <EmptyData image={NoEvents} description="No invitation to show" />
    );
  };

  const getMyInvitation = (updateState: any, filters = {}): void => {
    setLoading(true);
    API.eventManagement
      .getMyInvitation(filters)
      .then((invitation: MyInvitationType[] | MyInvitationType) => {
        updateState(invitation);
        setLoading(false);
      })
      .catch((error: Error) => {
        setLoading(false);
        console.log({ location: "getMyInvitation", error });
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

  return (
    <div className="event-management__container">
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
          <Row wrap gutter={[8, 8]}>
            <Col span={12}>
              <Title level={3}>Invitation</Title>
            </Col>
            <Col span={12} className="upcoming-event__pagination"></Col>
          </Row>
          <Row gutter={[16, 16]}>{renderEvents()}</Row>
        </>
      )}
      {action === "VIEW" && (
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
            </Row>
          </Col>
        </Row>
      )}
      {action === "VIEW" && <InvitationCard {...selectedInvitation} />}
    </div>
  );
};
