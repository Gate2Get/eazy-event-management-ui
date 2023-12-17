import React, { Dispatch } from "react";
import type { Dayjs } from "dayjs";
import { CalendarProps, Space, Tag, Typography, Calendar } from "antd";
import { useBearStore } from "../../store";
import { API } from "../../api";
import { EventType } from "../../types";
import dayjs from "dayjs";
import { CalendarMode, SelectInfo } from "antd/es/calendar/generateCalendar";
import { useNavigate } from "react-router-dom";
import { ROUTES_URL } from "../../constants";
import "./styles.scss";

const { Paragraph } = Typography;

export const NoticeCalendar = () => {
  const { setLoading } = useBearStore.appStore();
  const { setCalendarEvents } = useBearStore.dashboardStore();
  const [eventMonthMap, setEventMonthMap]: [
    Record<string, any[]>,
    Dispatch<any>
  ] = React.useState({});
  const [eventYearMap, setEventYearMap]: [
    Record<string, any[]>,
    Dispatch<any>
  ] = React.useState({});
  const [selectedMonthYear, setSelectedMonthYear] = React.useState("");
  const [mode, setMode]: [CalendarMode, Dispatch<any>] =
    React.useState("month");
  const [currentDate, setCurrentDate] = React.useState(dayjs());
  const navigate = useNavigate();

  React.useEffect(() => {
    const day = dayjs().format("YYYY-MM");
    const filter = {
      fromDate: `${day}-01`,
      toDate: `${day}-31`,
    };
    setSelectedMonthYear(day);
    console.log({ day, fromDate: `${day}-01`, toDate: `${day}-31` });
    getEvents(filter, mapMonthEvent);
  }, []);

  const mapMonthEvent = (events: EventType[]) => {
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

  const mapYearEvent = (events: EventType[]) => {
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

  const getEvents = (
    filter = {},
    callback?: (events: EventType[]) => void
  ): void => {
    setLoading(true);
    API.eventManagement
      .getEvent(filter)
      .then((events: EventType[]) => {
        setCalendarEvents(events);
        callback?.(events);
        setLoading(false);
      })
      .catch((error: Error) => {
        setLoading(false);
        console.log({ location: "getEvents", error });
      });
  };

  const monthCellRender = (value: Dayjs) => {
    const month = value.month() + 1;
    const listData = eventYearMap[month];
    console.log({ listData, eventYearMap, month: value.month() });
    return (
      <Space className="events-date" direction="vertical">
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
    return (
      <Space className="events-date" direction="vertical">
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
      getEvents(filter, mapMonthEvent);
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
    if (selectInfo.source === "date") {
      const day = date.format("YYYY-MM-D");
      const filter = {
        fromDate: day,
        toDate: `${day}T23:59:59.000Z`,
      };
      navigate(
        `${ROUTES_URL.EE}/${ROUTES_URL.EVENT_MANAGEMENT}?fromDate=${filter.fromDate}&toDate=${filter.toDate}`
      );
    } else if (selectInfo.source === "month") {
      const day = date.format("YYYY-MM");
      const filter = {
        fromDate: `${day}-01`,
        toDate: `${day}-31`,
      };
      navigate(
        `${ROUTES_URL.EE}/${ROUTES_URL.EVENT_MANAGEMENT}?fromDate=${filter.fromDate}&toDate=${filter.toDate}`
      );
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
      getEvents(filter, mapMonthEvent);
    } else if (mode === "year") {
      const day = date.format("YYYY");
      const filter = {
        fromDate: `${day}-01-01`,
        toDate: `${day}-12-31`,
      };
      console.log({ day, fromDate: `${day}-01-01`, toDate: `${day}-12-31` });
      getEvents(filter, mapYearEvent);
    }
  };

  return (
    <div className="antd-calendar__container">
      <Paragraph strong style={{ fontSize: "16px" }}>
        My Calendar
      </Paragraph>
      <Calendar
        mode={mode}
        cellRender={cellRender}
        onChange={onDateChange}
        onSelect={onSelectDate}
        value={currentDate}
        disabledDate={onDisableDate}
        onPanelChange={onPanelChange}
      />
    </div>
  );
};
