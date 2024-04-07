import React, { Dispatch } from "react";
import type { Dayjs } from "dayjs";
import {
  CalendarProps,
  Space,
  Tag,
  Typography,
  Calendar,
  Modal,
  Card,
  Divider,
  Skeleton,
} from "antd";
import { useBearStore } from "../../store";
import { API } from "../../api";
import { MyInvitationType } from "../../types";
import dayjs from "dayjs";
import { CalendarMode, SelectInfo } from "antd/es/calendar/generateCalendar";
import { useNavigate } from "react-router-dom";
import { ROUTES_URL } from "../../constants";
import "./styles.scss";
import { CalendarInvitationCard } from "../calendarInvitationCard";
import { useWindowSize } from "../../hooks/useWindowSize";
import { isToday } from "../../utils/common.utils";

const { Paragraph, Title } = Typography;

export const InvitationCalendar = () => {
  const [isFetchingInvitation, setIsFetchingInvitation] = React.useState(false);
  const { setCalendarEvents, setTodaysInvitations } =
    useBearStore.dashboardStore();
  const [eventMonthMap, setEventMonthMap]: [
    Record<string, any[]>,
    Dispatch<any>
  ] = React.useState({});
  const [eventYearMap, setEventYearMap]: [
    Record<string, any[]>,
    Dispatch<any>
  ] = React.useState({});
  const [selectedMonthYear, setSelectedMonthYear] = React.useState("");
  const [mode, setMode] = React.useState<CalendarMode>("month");
  const [currentDate, setCurrentDate] = React.useState(dayjs());
  const [currentSelection, setCurrentSelection] = React.useState("");
  const { height } = useWindowSize();

  React.useEffect(() => {
    const day = dayjs().format("YYYY-MM");
    const filter = {
      fromDate: `${day}-01`,
      toDate: `${day}-31`,
    };
    setSelectedMonthYear(day);
    console.log({ day, fromDate: `${day}-01`, toDate: `${day}-31` });
    getInvitations(filter, mapMonthEvent);

    return () => {
      setCurrentSelection("");
    };
  }, []);

  const mapMonthEvent = (events: MyInvitationType[]) => {
    const eventMonthMap: any = {};
    events.forEach((event) => {
      const day = dayjs(event.startDateTime).format("D");
      console.log({
        "dayjs(event.startDateTime)": dayjs(event.startDateTime),
        day,
        "event.startDateTime": event.startDateTime,
      });
      if (eventMonthMap[day]) {
        eventMonthMap[day].push(event);
      } else {
        eventMonthMap[day] = [event];
      }
    });
    console.log({ eventMonthMap });
    setEventMonthMap(eventMonthMap);
  };

  const mapYearEvent = (events: MyInvitationType[]) => {
    const eventYearMap: any = {};
    events.forEach((event) => {
      const day = dayjs(event.startDateTime).format("M");
      if (eventYearMap[day]) {
        eventYearMap[day].push(event);
      } else {
        eventYearMap[day] = [event];
      }
    });
    console.log({ eventYearMap });
    setEventYearMap(eventYearMap);
  };

  const getInvitations = (
    filter = {},
    callback?: (events: MyInvitationType[]) => void
  ): void => {
    setIsFetchingInvitation(true);
    API.eventManagement
      .getMyInvitation(filter)
      .then((invitations) => {
        callback?.(invitations);
        setIsFetchingInvitation(false);
      })
      .catch((error: Error) => {
        setIsFetchingInvitation(false);
        console.log({ location: "getInvitations", error });
      });
  };

  const monthCellRender = (value: Dayjs) => {
    const month = value.month() + 1;
    const listData = eventYearMap[month];
    const day = value.format("M");
    return (
      <Space
        className="events-date"
        direction="vertical"
        onClick={() => {
          setCurrentSelection(day);
        }}
        style={{ width: "100%" }}
      >
        {listData?.map((item: any) => (
          <Tag
            bordered={false}
            key={item.name}
            color="success"
            style={{ width: "100%" }}
          >
            {item.name}
          </Tag>
        ))}
      </Space>
    );
  };

  const dateCellRender = (value: Dayjs) => {
    const monthYear = value.format("YYYY-MM");
    const listData =
      monthYear === selectedMonthYear ? eventMonthMap[value.date()] : [];
    const day = value.format("D");

    return (
      <Space
        className="events-date"
        direction="vertical"
        style={{ width: "100%" }}
        onClick={() => setCurrentSelection(day)}
      >
        {listData?.map((item: any) => (
          <Tag
            bordered={false}
            key={item.name}
            color="success"
            style={{ width: "100%" }}
          >
            {item.name}
          </Tag>
        ))}
      </Space>
    );
  };

  const onDateChange = (e: any) => {
    console.log({ e });
    const day = e.format("YYYY-MM");
    if (selectedMonthYear !== day) {
      const filter = {
        fromDate: `${day}-01`,
        toDate: `${day}-31`,
      };
      console.log({ day, fromDate: `${day}-01`, toDate: `${day}-31` });
      getInvitations(filter, mapMonthEvent);
      setSelectedMonthYear(day);
    }
  };

  const cellRender: CalendarProps<Dayjs>["cellRender"] = (current, info) => {
    if (info.type === "date") {
      return dateCellRender(current);
    }
    if (info.type === "month") {
      return monthCellRender(current);
    }
    return info.originNode;
  };

  const onDisableDate = (date: any) => {
    if (mode === "month") {
      const day = date.format("D");
      const isDisabled = eventMonthMap[day];
      return !isDisabled;
    } else {
      return false;
    }
  };

  const onSelectDate = (date: Dayjs, selectInfo: SelectInfo) => {
    setCurrentDate(date);
    console.log({ date, selectInfo });
    if (selectInfo.source === "date") {
      const day = date.format("D");
      // setCurrentSelection(day);
      const filter = {
        fromDate: day,
        toDate: `${day}T23:59:59.000Z`,
      };
      // navigate(
      //   `${ROUTES_URL.EE}/${ROUTES_URL.EVENT_MANAGEMENT}?fromDate=${filter.fromDate}&toDate=${filter.toDate}`
      // );
    } else if (selectInfo.source === "month") {
      const day = date.format("M");
      // setCurrentSelection(day);
      console.log({ day });
      // const filter = {
      //   fromDate: `${day}-01`,
      //   toDate: `${day}-31`,
      // };
      // navigate(
      //   `${ROUTES_URL.EE}/${ROUTES_URL.EVENT_MANAGEMENT}?fromDate=${filter.fromDate}&toDate=${filter.toDate}`
      // );
    }
  };

  const onPanelChange = (date: any, mode: CalendarMode) => {
    console.log({ mode });
    setMode(mode);
    if (mode === "month") {
      const day = date.format("YYYY-MM");
      const filter = {
        fromDate: `${day}-01`,
        toDate: `${day}-31`,
      };
      console.log({ day, fromDate: `${day}-01`, toDate: `${day}-31` });
      getInvitations(filter, mapMonthEvent);
    } else if (mode === "year") {
      const day = date.format("YYYY");
      const filter = {
        fromDate: `${day}-01-01`,
        toDate: `${day}-12-31`,
      };
      console.log({ day, fromDate: `${day}-01-01`, toDate: `${day}-12-31` });
      getInvitations(filter, mapYearEvent);
    }
  };

  return (
    <div className="antd-calendar__container">
      <Modal
        title={<Title level={4}>Invitations</Title>}
        centered
        open={!!currentSelection}
        footer={<></>}
        onOk={() => setCurrentSelection("")}
        onCancel={() => {
          setCurrentSelection("");
        }}
        width={"100%"}
        style={{ height }}
        styles={{
          body: { height: height - 120 },
        }}
      >
        <Card
          bordered={false}
          style={{ overflow: "auto", height: height - 120 }}
        >
          <Space direction="vertical" style={{ width: "100%" }} size="middle">
            {(mode === "year"
              ? eventYearMap[currentSelection]
              : eventMonthMap[currentSelection]
            )?.map((invitation) => (
              <>
                <CalendarInvitationCard {...invitation} />
                <Divider />
              </>
            ))}
          </Space>
        </Card>
      </Modal>
      <Paragraph strong style={{ fontSize: "16px" }}>
        My Calendar
      </Paragraph>
      <Skeleton
        paragraph={{ rows: 10 }}
        loading={isFetchingInvitation}
        style={{ width: "100%" }}
        active
      >
        <Calendar
          mode={mode}
          cellRender={cellRender}
          onChange={onDateChange}
          onSelect={onSelectDate}
          value={currentDate}
          disabledDate={onDisableDate}
          onPanelChange={onPanelChange}
        />
      </Skeleton>
    </div>
  );
};
