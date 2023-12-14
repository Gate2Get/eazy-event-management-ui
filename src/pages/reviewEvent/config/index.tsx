import { Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import {
  CHANNELS,
  CHANNEL_OPTIONS_MAP,
  DATE_FORMAT,
  EVENT_STATUS_LABEL,
  EVENT_STATUS_LABEL_COLOR,
} from "../../../constants";
import { EventType } from "../../../types";
import { EVENT_COLUMN_KEYS, EVENT_COLUMN_NAME } from "../constant";

export const eventColumns: ColumnsType<EventType> = [
  {
    key: EVENT_COLUMN_KEYS.NAME,
    dataIndex: EVENT_COLUMN_KEYS.NAME,
    title: EVENT_COLUMN_NAME.NAME,
  },
  {
    key: EVENT_COLUMN_KEYS.CHANNEL,
    dataIndex: EVENT_COLUMN_KEYS.CHANNEL,
    title: EVENT_COLUMN_NAME.CHANNEL,
    render: (value) => (
      <Tag icon={CHANNEL_OPTIONS_MAP[value]}> {CHANNELS[value]}</Tag>
    ),
  },
  {
    key: EVENT_COLUMN_KEYS.TYPE,
    dataIndex: EVENT_COLUMN_KEYS.TYPE,
    title: EVENT_COLUMN_NAME.TYPE,
  },
  {
    key: EVENT_COLUMN_KEYS.STATUS,
    dataIndex: EVENT_COLUMN_KEYS.STATUS,
    title: EVENT_COLUMN_NAME.STATUS,
    render: (value) =>
      EVENT_STATUS_LABEL?.[value] && (
        <div className="event-status">
          <Tag color={EVENT_STATUS_LABEL_COLOR?.[EVENT_STATUS_LABEL?.[value]]}>
            {EVENT_STATUS_LABEL?.[value]}
          </Tag>
        </div>
      ),
  },
  {
    key: EVENT_COLUMN_KEYS.LOCATION,
    dataIndex: EVENT_COLUMN_KEYS.LOCATION,
    title: EVENT_COLUMN_NAME.LOCATION,
  },
  {
    key: EVENT_COLUMN_KEYS.CREATED_AT,
    dataIndex: EVENT_COLUMN_KEYS.CREATED_AT,
    title: EVENT_COLUMN_NAME.CREATED_AT,
    render: (value) => dayjs(value).format(DATE_FORMAT),
  },
  {
    key: EVENT_COLUMN_KEYS.UPDATED_AT,
    dataIndex: EVENT_COLUMN_KEYS.UPDATED_AT,
    title: EVENT_COLUMN_NAME.UPDATED_AT,
    render: (value) => dayjs(value).format(DATE_FORMAT),
  },
];
