import {
  Badge,
  Button,
  Col,
  DatePicker,
  Form,
  Row,
  Segmented,
  Select,
  Tabs,
  Tag,
  theme,
  Typography,
} from "antd";
import dayjs from "dayjs";
import React from "react";
import { API } from "../../api";
import {
  EVENT_DATE_FORMAT,
  LOCAL_STORAGE_VIEW,
  PAGE_ACTION,
} from "../../constants";
import { useBearStore } from "../../store";
import { EventFilterType, EventType, MyInvitationType } from "../../types";
import "./styles.scss";
import NoInvitations from "../../assets/svg/no-invitations.svg";
import { removeFalsyValues, urlHandler } from "../../utils/common.utils";
import { EmptyData } from "../../components/EmptyData";
import { useSearchParams } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { EventCard } from "../../components/eventCard";
import { InvitationCard } from "../../components/invitationCard";
import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";
import FilterListIcon from "@mui/icons-material/FilterList";
import { DataTable } from "../../components/dataTable";
import { invitationColumns } from "./config";
import { INVITATION_COLUMN_KEYS, SORT_KEYS } from "./constant";
import { VideoPlayer } from "../../components/videoPlayer";
import { InvitationAlbum } from "../../components/invitationAlbum";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

const STEPS = [
  {
    title: "Invitation",
    content: "first-content",
  },
  {
    title: "Video",
    content: "second-content",
  },
  {
    title: "Album",
    content: "third-content",
  },
];

export const MyInvitation = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { screen, setLoading } = useBearStore.appStore();
  const { user } = useBearStore.userStore();
  const [isPreview, setIsPreview] = React.useState(false);
  const {
    action,
    events,
    filters,
    selectedInvitation,
    myInvitations,
    isListView,
    eventTypes,
    setIsListView,
    setAction,
    setFilters,
    setSelectedInvitation,
    setMyInvitations,
  } = useBearStore.eventStore();
  const [form] = Form.useForm();
  const { token } = theme.useToken();
  const [isFilter, setIsFilter] = React.useState(false);
  const [current, setCurrent] = React.useState(1);

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

    urlHandler(
      searchParams,
      setAction,
      (id) => {
        getMyInvitation(setSelectedInvitation, { id });
      },
      () => {
        getMyInvitation(setMyInvitations, filters);
      }
    );
    return () => {
      setCurrent(1);
    };
  }, [searchParams]);

  React.useEffect(() => {
    setIsListView(
      localStorage.getItem(LOCAL_STORAGE_VIEW.MY_INVITATION) === "List"
    );
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
      id: record.id as string,
      action: PAGE_ACTION.VIEW,
    });
  };

  const gridColumns = React.useMemo(
    () =>
      invitationColumns(eventTypes).map((column) => {
        if (column.key === INVITATION_COLUMN_KEYS.NAME) {
          column.render = (record) => (
            <Text
              style={{ cursor: "pointer" }}
              onClick={() => {
                onViewSelect(record);
              }}
            >
              {record.name}
            </Text>
          );
        }
        return column;
      }),
    [eventTypes, myInvitations]
  );

  const renderEvents = (): React.ReactNode => {
    return myInvitations.length ? (
      isListView ? (
        <DataTable
          columns={gridColumns}
          data={myInvitations}
          sortKeys={SORT_KEYS}
        />
      ) : (
        myInvitations.map((event) => (
          <Col {...colOption(8)}>
            <EventCard {...event} onSelect={() => onViewSelect(event)} />
          </Col>
        ))
      )
    ) : (
      <EmptyData
        image={NoInvitations}
        description={
          user.isMobileVerified
            ? "No invitation to show"
            : "Click on the banner above to verify your account and access the invitation."
        }
      />
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

  const items = STEPS.map((item, index) => ({
    key: `${index + 1}`,
    label: item.title,
    title: item.title,
  })).filter((item) => {
    if (
      (item.title === "Video" && !selectedInvitation.isVideoEnable) ||
      (item.title === "Album" && !selectedInvitation.isAlbumEnable)
    ) {
      return false;
    } else {
      return true;
    }
  });

  const renderComponent = (current: number) => {
    switch (current) {
      case 1: {
        return <InvitationCard {...selectedInvitation} />;
      }
      case 2: {
        return (
          <VideoPlayer
            url={selectedInvitation.videoUrl}
            isVideoEnable={selectedInvitation.isVideoEnable}
          />
        );
      }
      case 3: {
        return <InvitationAlbum isEnabled={selectedInvitation.isAlbumEnable} />;
      }
      default:
        return <></>;
    }
  };

  const onChange = (value: number) => {
    setCurrent(value);
  };

  return (
    <div className="my-invitation__container">
      {(!action || action === "DELETE") && (
        <>
          <Row wrap gutter={[8, 8]}>
            <Col span={12}>
              <Title level={3}> My Invitation</Title>
            </Col>
          </Row>
          <Row wrap gutter={[8, 8]}>
            <Col span={24} className="upcoming-event__pagination">
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
                    LOCAL_STORAGE_VIEW.MY_INVITATION,
                    value.toString()
                  );
                  setIsListView(value === "List");
                }}
              />
            </Col>
          </Row>
          {isFilter && (
            <Row className="my-invitation__filters" gutter={[8, 8]}>
              <Col {...colOption(12)}>
                <Form layout="vertical">
                  <Form.Item label="Event">
                    <Select
                      style={{ width: "100%" }}
                      allowClear
                      placeholder="Select a event"
                      optionFilterProp="children"
                      options={eventTypes}
                      value={filters.type}
                      onChange={(type) => {
                        handleFilterChange({ type });
                      }}
                    />
                  </Form.Item>
                </Form>
              </Col>

              <Col className="upcoming-event__date-picker" {...colOption(12)}>
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
      {action === "VIEW" && (
        <>
          <Tabs
            onChange={(value) => {
              onChange(Number(value));
            }}
            activeKey={current.toString()}
            type="card"
            items={items}
          />

          <div style={contentStyle}>{renderComponent(current)}</div>
        </>
      )}
    </div>
  );
};
