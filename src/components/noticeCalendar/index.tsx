import React from "react";
import type { Dayjs } from "dayjs";
import type { BadgeProps, CalendarProps } from "antd";
import { Badge, Calendar } from "antd";
import { useBearStore } from "../../store";
import { API } from "../../api";
import { EventType } from "../../types";
import dayjs from "dayjs";

const getMonthData = (value: Dayjs) => {
  if (value.month() === 8) {
    return 1394;
  }
};

export const NoticeCalendar = () => {
  const { setLoading } = useBearStore.appStore();
  const { setCalendarEvents } = useBearStore.dashboardStore();
  const [eventMap, setEventMap]: any = React.useState({});

  React.useEffect(() => {
    const day = dayjs().format("YYYY-MM");
    const filter = {
      fromDate: `${day}-01`,
      toDate: `${day}-31`,
    };
    console.log({ day, fromDate: `${day}-01`, toDate: `${day}-31` });
    getEvents(filter);
  }, []);

  const getEvents = (filter = {}): void => {
    setLoading(true);
    API.eventManagement
      .getEvent(filter)
      .then((events: EventType[]) => {
        setCalendarEvents(events);
        const eventMap: any = {};
        events.forEach((event) => {
          const day = dayjs(event.startDateTime).format("D");
          if (eventMap[day]) {
            eventMap[day].push(event);
          } else {
            eventMap[day] = [event];
          }
        });
        console.log({ eventMap });
        setEventMap(eventMap);
        setLoading(false);
      })
      .catch((error: Error) => {
        setLoading(false);
        console.log({ location: "getEvents", error });
      });
  };

  const monthCellRender = (value: Dayjs) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = eventMap[value.date()];
    return (
      <ul className="events">
        {listData?.map((item: any) => (
          <li key={item.id}>
            <Badge
              status={item.type as BadgeProps["status"]}
              text={item.name}
            />
          </li>
        ))}
      </ul>
    );
  };

  const onDateChange = (e: any) => {
    const day = e.format("YYYY-MM");
    const filter = {
      fromDate: `${day}-01`,
      toDate: `${day}-31`,
    };
    console.log({ day, fromDate: `${day}-01`, toDate: `${day}-31` });
    getEvents(filter);
  };

  const cellRender: CalendarProps<Dayjs>["cellRender"] = (current, info) => {
    if (info.type === "date") {
      return dateCellRender(current);
    }
    if (info.type === "month") return monthCellRender(current);
    return info.originNode;
  };

  return <Calendar cellRender={cellRender} onChange={onDateChange} />;
};
