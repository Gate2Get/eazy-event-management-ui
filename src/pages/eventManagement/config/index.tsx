import { Select, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { DataTableColumnType } from "../../../components/dataTable/types";
import {
  DATE_FORMAT,
  EVENT_STATUS_LABEL,
  EVENT_STATUS_LABEL_COLOR,
} from "../../../constants";
import { convertToTitleCase } from "../../../utils/common.utils";
import { EVENT_COLUMN_KEYS, EVENT_COLUMN_NAME } from "../constant";
import { EventTypeType } from "../../../types";

export const eventColumns = (
  eventTypeOptions: EventTypeType[]
): DataTableColumnType[] => [
  {
    key: EVENT_COLUMN_KEYS.NAME,
    dataIndex: EVENT_COLUMN_KEYS.NAME,
    title: EVENT_COLUMN_NAME.NAME,
    sortable: true,
    filterable: true,
  },
  // {
  //   key: EVENT_COLUMN_KEYS.CHANNEL,
  //   dataIndex: EVENT_COLUMN_KEYS.CHANNEL,
  //   title: EVENT_COLUMN_NAME.CHANNEL,
  //   render: (record) => (
  //     <Tag
  //       bordered={false}
  //       icon={CHANNEL_OPTIONS_MAP[record?.[EVENT_COLUMN_KEYS.CHANNEL]]}
  //     >
  //       {" "}
  //       {CHANNELS[record?.[EVENT_COLUMN_KEYS.CHANNEL]]}
  //     </Tag>
  //   ),
  //   sortable: true,
  //   filterable: true,
  // },
  {
    key: EVENT_COLUMN_KEYS.TYPE,
    dataIndex: EVENT_COLUMN_KEYS.TYPE,
    title: EVENT_COLUMN_NAME.TYPE,
    sortable: true,
    filterable: true,
    render: (record) => (
      <div className="event-status">
        <Tag bordered={false} color="processing">
          {convertToTitleCase(record?.[EVENT_COLUMN_KEYS.TYPE])}
        </Tag>
      </div>
    ),
    filterElement: (options) => (
      <Select
        value={options.value}
        options={eventTypeOptions}
        onChange={(value) => options.filterApplyCallback(value)}
        placeholder="Any"
        className="p-column-filter"
        style={{ width: "100%" }}
        allowClear
      />
    ),
  },
  {
    key: EVENT_COLUMN_KEYS.STATUS,
    dataIndex: EVENT_COLUMN_KEYS.STATUS,
    title: EVENT_COLUMN_NAME.STATUS,
    render: (record) =>
      EVENT_STATUS_LABEL?.[record?.[EVENT_COLUMN_KEYS.STATUS]] && (
        <div className="event-status">
          <Tag
            bordered={false}
            color={
              EVENT_STATUS_LABEL_COLOR?.[
                EVENT_STATUS_LABEL?.[record?.[EVENT_COLUMN_KEYS.STATUS]]
              ]
            }
          >
            {EVENT_STATUS_LABEL?.[record?.[EVENT_COLUMN_KEYS.STATUS]]}
          </Tag>
        </div>
      ),
    sortable: true,
    filterable: true,
  },
  {
    key: EVENT_COLUMN_KEYS.LOCATION,
    dataIndex: EVENT_COLUMN_KEYS.LOCATION,
    title: EVENT_COLUMN_NAME.LOCATION,
    sortable: true,
    filterable: true,
  },
  {
    key: EVENT_COLUMN_KEYS.START_DATE_TIME,
    dataIndex: EVENT_COLUMN_KEYS.START_DATE_TIME,
    title: EVENT_COLUMN_NAME.START_DATE_TIME,
    render: (record) =>
      dayjs(record?.[EVENT_COLUMN_KEYS.START_DATE_TIME]).format(DATE_FORMAT),
    sortable: true,
    filterable: true,
  },
  {
    key: EVENT_COLUMN_KEYS.END_DATE_TIME,
    dataIndex: EVENT_COLUMN_KEYS.END_DATE_TIME,
    title: EVENT_COLUMN_NAME.END_DATE_TIME,
    render: (record) =>
      dayjs(record?.[EVENT_COLUMN_KEYS.END_DATE_TIME]).format(DATE_FORMAT),
    sortable: true,
    filterable: true,
  },
  {
    key: EVENT_COLUMN_KEYS.ACTION,
    dataIndex: EVENT_COLUMN_KEYS.ACTION,
    title: EVENT_COLUMN_NAME.ACTION,
  },
];
