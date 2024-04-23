import { DataTableColumnType } from "../../../../../components/dataTable/types";
import {
  CONTACT_LIST_COLUMN_KEYS,
  CONTACT_LIST_COLUMN_NAME,
} from "../constants";

export const contactListColumns: DataTableColumnType[] = [
  {
    key: CONTACT_LIST_COLUMN_KEYS.NAME,
    dataIndex: CONTACT_LIST_COLUMN_KEYS.NAME,
    title: CONTACT_LIST_COLUMN_NAME.NAME,
    sortable: true,
    filterable: true,
  },
  {
    key: CONTACT_LIST_COLUMN_KEYS.MOBILE,
    dataIndex: CONTACT_LIST_COLUMN_KEYS.MOBILE,
    title: CONTACT_LIST_COLUMN_NAME.MOBILE,
    sortable: true,
    filterable: true,
  },
];

export const SORT_KEYS = [
  CONTACT_LIST_COLUMN_KEYS.NAME,
  CONTACT_LIST_COLUMN_KEYS.MOBILE,
  CONTACT_LIST_COLUMN_KEYS.UPDATED_AT,
  CONTACT_LIST_COLUMN_KEYS.CREATED_AT,
];

export const contactUploadPreviewColumns: DataTableColumnType[] = [
  {
    key: CONTACT_LIST_COLUMN_KEYS.NAME,
    dataIndex: CONTACT_LIST_COLUMN_KEYS.NAME,
    title: CONTACT_LIST_COLUMN_NAME.NAME,
    sortable: true,
    filterable: true,
  },
  {
    key: CONTACT_LIST_COLUMN_KEYS.MOBILE,
    dataIndex: CONTACT_LIST_COLUMN_KEYS.MOBILE,
    title: CONTACT_LIST_COLUMN_NAME.MOBILE,
    sortable: true,
    filterable: true,
  },
];
