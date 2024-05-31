import { DatePicker, Tag } from "antd";
import dayjs from "dayjs";
import { DataTableColumnType } from "../../../components/dataTable/types";
import {
  CHANNELS,
  CHANNEL_OPTIONS_MAP,
  DATE_FORMAT,
  EVENT_STATUS_LABEL,
  TEMPLATE_STATUS_LABEL,
  TEMPLATE_STATUS_LABEL_COLOR,
} from "../../../constants";
import { TEMPLATE_COLUMN_KEYS, TEMPLATE_COLUMN_NAME } from "../constant";
import { convertToTitleCase } from "../../../utils/common.utils";

export const templateColumns: DataTableColumnType[] = [
  {
    key: TEMPLATE_COLUMN_KEYS.NAME,
    dataIndex: TEMPLATE_COLUMN_KEYS.NAME,
    title: TEMPLATE_COLUMN_NAME.NAME,
    sortable: true,
    filterable: true,
  },
  {
    key: TEMPLATE_COLUMN_KEYS.CHANNEL,
    dataIndex: TEMPLATE_COLUMN_KEYS.CHANNEL,
    title: TEMPLATE_COLUMN_NAME.CHANNEL,
    render: (record) => (
      <Tag
        bordered={false}
        icon={CHANNEL_OPTIONS_MAP[record?.[TEMPLATE_COLUMN_KEYS.CHANNEL]]}
      >
        {CHANNELS[record?.[TEMPLATE_COLUMN_KEYS.CHANNEL]]}
      </Tag>
    ),
    sortable: true,
    filterable: true,
  },
  {
    key: TEMPLATE_COLUMN_KEYS.TYPE,
    dataIndex: TEMPLATE_COLUMN_KEYS.TYPE,
    title: TEMPLATE_COLUMN_NAME.TYPE,
    sortable: true,
    filterable: true,
    render: (record) => (record?.type ? convertToTitleCase(record?.type) : ""),
  },
  {
    key: TEMPLATE_COLUMN_KEYS.APPROVAL_STATUS,
    dataIndex: TEMPLATE_COLUMN_KEYS.APPROVAL_STATUS,
    title: TEMPLATE_COLUMN_NAME.APPROVAL_STATUS,
    render: (record) => {
      return (
        EVENT_STATUS_LABEL?.[
          record?.[TEMPLATE_COLUMN_KEYS.APPROVAL_STATUS]
        ] && (
          <div className="event-status">
            <Tag
              bordered={false}
              color={
                TEMPLATE_STATUS_LABEL_COLOR?.[
                  record?.[TEMPLATE_COLUMN_KEYS.APPROVAL_STATUS]
                ]
              }
            >
              {
                TEMPLATE_STATUS_LABEL?.[
                  record?.[TEMPLATE_COLUMN_KEYS.APPROVAL_STATUS]
                ]
              }
            </Tag>
          </div>
        )
      );
    },
    sortable: true,
    filterable: true,
  },
  {
    key: TEMPLATE_COLUMN_KEYS.CREATED_AT,
    dataIndex: TEMPLATE_COLUMN_KEYS.CREATED_AT,
    title: TEMPLATE_COLUMN_NAME.CREATED_AT,
    render: (record) =>
      dayjs(record?.[TEMPLATE_COLUMN_KEYS.CREATED_AT]).format(DATE_FORMAT),
    sortable: true,
    filterable: true,
    // filterElement: (options) => (
    //   <DatePicker
    //     onChange={(value) => {
    //       console.log({ value });
    //       options.filterApplyCallback(value ? dayjs(value) : value);
    //     }}
    //     value={options.value}
    //     format="YYYY-MM-DD"
    //   />
    // ),
  },
  {
    key: TEMPLATE_COLUMN_KEYS.UPDATED_AT,
    dataIndex: TEMPLATE_COLUMN_KEYS.UPDATED_AT,
    title: TEMPLATE_COLUMN_NAME.UPDATED_AT,
    render: (record) =>
      dayjs(record?.[TEMPLATE_COLUMN_KEYS.UPDATED_AT]).format(DATE_FORMAT),
    sortable: true,
    filterable: true,
  },
  {
    key: TEMPLATE_COLUMN_KEYS.ACTION,
    dataIndex: TEMPLATE_COLUMN_KEYS.ACTION,
    title: TEMPLATE_COLUMN_NAME.ACTION,
  },
];
