import { Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { CHANNELS, CHANNEL_OPTIONS_MAP, DATE_FORMAT } from "../../../constants";
import { TemplateType } from "../../../types";
import { TEMPLATE_COLUMN_KEYS, TEMPLATE_COLUMN_NAME } from "../constant";

export const templateColumns: ColumnsType<TemplateType> = [
  {
    key: TEMPLATE_COLUMN_KEYS.NAME,
    dataIndex: TEMPLATE_COLUMN_KEYS.NAME,
    title: TEMPLATE_COLUMN_NAME.NAME,
  },
  {
    key: TEMPLATE_COLUMN_KEYS.CHANNEL,
    dataIndex: TEMPLATE_COLUMN_KEYS.CHANNEL,
    title: TEMPLATE_COLUMN_NAME.CHANNEL,
    render: (value) => (
      <Tag bordered={false} icon={CHANNEL_OPTIONS_MAP[value]}>
        {" "}
        {CHANNELS[value]}
      </Tag>
    ),
  },
  {
    key: TEMPLATE_COLUMN_KEYS.CREATED_AT,
    dataIndex: TEMPLATE_COLUMN_KEYS.CREATED_AT,
    title: TEMPLATE_COLUMN_NAME.CREATED_AT,
    render: (value) => dayjs(value).format(DATE_FORMAT),
  },
  {
    key: TEMPLATE_COLUMN_KEYS.UPDATED_AT,
    dataIndex: TEMPLATE_COLUMN_KEYS.UPDATED_AT,
    title: TEMPLATE_COLUMN_NAME.UPDATED_AT,
    render: (value) => dayjs(value).format(DATE_FORMAT),
  },
  {
    key: TEMPLATE_COLUMN_KEYS.ACTION,
    dataIndex: TEMPLATE_COLUMN_KEYS.ACTION,
    title: TEMPLATE_COLUMN_NAME.ACTION,
  },
];
