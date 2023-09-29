import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { DATE_FORMAT } from "../../../../../constants";
import { ContactDirectoryType } from "../../../../../types";
import {
  CONTACT_DIRECTORY_COLUMN_KEYS,
  CONTACT_DIRECTORY_COLUMN_NAME,
} from "../constant";

export const contactDirectoryColumns: ColumnsType<ContactDirectoryType> = [
  {
    key: CONTACT_DIRECTORY_COLUMN_KEYS.NAME,
    dataIndex: CONTACT_DIRECTORY_COLUMN_KEYS.NAME,
    title: CONTACT_DIRECTORY_COLUMN_NAME.NAME,
  },
  {
    key: CONTACT_DIRECTORY_COLUMN_KEYS.NO_OF_CONTACTS,
    dataIndex: CONTACT_DIRECTORY_COLUMN_KEYS.NO_OF_CONTACTS,
    title: CONTACT_DIRECTORY_COLUMN_NAME.NO_OF_CONTACTS,
  },
  {
    key: CONTACT_DIRECTORY_COLUMN_KEYS.CREATED_AT,
    dataIndex: CONTACT_DIRECTORY_COLUMN_KEYS.CREATED_AT,
    title: CONTACT_DIRECTORY_COLUMN_NAME.CREATED_AT,
    render: (value) => dayjs(value).format(DATE_FORMAT),
  },
  {
    key: CONTACT_DIRECTORY_COLUMN_KEYS.UPDATED_AT,
    dataIndex: CONTACT_DIRECTORY_COLUMN_KEYS.UPDATED_AT,
    title: CONTACT_DIRECTORY_COLUMN_NAME.UPDATED_AT,
    render: (value) => dayjs(value).format(DATE_FORMAT),
  },
  {
    key: CONTACT_DIRECTORY_COLUMN_KEYS.ACTION,
    dataIndex: CONTACT_DIRECTORY_COLUMN_KEYS.ACTION,
    title: CONTACT_DIRECTORY_COLUMN_NAME.ACTION,
  },
];
