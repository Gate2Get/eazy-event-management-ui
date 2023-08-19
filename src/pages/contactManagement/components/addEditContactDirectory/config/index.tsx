import { ColumnsType } from "antd/es/table";
import { ContactListType } from "../../../../../types";
import {
  CONTACT_LIST_COLUMN_KEYS,
  CONTACT_LIST_COLUMN_NAME,
} from "../constants";

export const contactListColumns: ColumnsType<ContactListType> = [
  {
    key: CONTACT_LIST_COLUMN_KEYS.NAME,
    dataIndex: CONTACT_LIST_COLUMN_KEYS.NAME,
    title: CONTACT_LIST_COLUMN_NAME.NAME,
  },
  {
    key: CONTACT_LIST_COLUMN_KEYS.MOBILE,
    dataIndex: CONTACT_LIST_COLUMN_KEYS.MOBILE,
    title: CONTACT_LIST_COLUMN_NAME.MOBILE,
  },
];

export const SORT_KEYS = [
  CONTACT_LIST_COLUMN_KEYS.NAME,
  CONTACT_LIST_COLUMN_KEYS.MOBILE,
  CONTACT_LIST_COLUMN_KEYS.UPDATED_AT,
  CONTACT_LIST_COLUMN_KEYS.CREATED_AT,
];
