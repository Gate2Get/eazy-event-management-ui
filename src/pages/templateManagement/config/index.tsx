import { Tag } from "antd";
import dayjs from "dayjs";
import { DataTableColumnType } from "../../../components/dataTable/types";
import { CHANNELS, CHANNEL_OPTIONS_MAP, DATE_FORMAT } from "../../../constants";
import { TEMPLATE_COLUMN_KEYS, TEMPLATE_COLUMN_NAME } from "../constant";

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
        {" "}
        {CHANNELS[record?.[TEMPLATE_COLUMN_KEYS.CHANNEL]]}
      </Tag>
    ),
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
