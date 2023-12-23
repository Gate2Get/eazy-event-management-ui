import dayjs from "dayjs";
import { DataTableColumnType } from "../../../../../components/dataTable/types";
import { DATE_FORMAT } from "../../../../../constants";
import { ContactDirectoryType } from "../../../../../types";
import {
  CONTACT_DIRECTORY_COLUMN_KEYS,
  CONTACT_DIRECTORY_COLUMN_NAME,
} from "../constant";

export const contactDirectoryColumns: DataTableColumnType[] = [
  {
    key: CONTACT_DIRECTORY_COLUMN_KEYS.NAME,
    dataIndex: CONTACT_DIRECTORY_COLUMN_KEYS.NAME,
    title: CONTACT_DIRECTORY_COLUMN_NAME.NAME,
    sortable: true,
    filterable: true,
  },
  {
    key: CONTACT_DIRECTORY_COLUMN_KEYS.NO_OF_CONTACTS,
    dataIndex: CONTACT_DIRECTORY_COLUMN_KEYS.NO_OF_CONTACTS,
    title: CONTACT_DIRECTORY_COLUMN_NAME.NO_OF_CONTACTS,
    sortable: true,
    filterable: true,
  },
  {
    key: CONTACT_DIRECTORY_COLUMN_KEYS.CREATED_AT,
    dataIndex: CONTACT_DIRECTORY_COLUMN_KEYS.CREATED_AT,
    title: CONTACT_DIRECTORY_COLUMN_NAME.CREATED_AT,
    render: (record) => {
      return dayjs(record[CONTACT_DIRECTORY_COLUMN_KEYS.CREATED_AT]).format(
        DATE_FORMAT
      );
    },
    sortable: true,
    filterable: true,
  },
  {
    key: CONTACT_DIRECTORY_COLUMN_KEYS.UPDATED_AT,
    dataIndex: CONTACT_DIRECTORY_COLUMN_KEYS.UPDATED_AT,
    title: CONTACT_DIRECTORY_COLUMN_NAME.UPDATED_AT,
    render: (record) =>
      dayjs(record[CONTACT_DIRECTORY_COLUMN_KEYS.UPDATED_AT]).format(
        DATE_FORMAT
      ),
    sortable: true,
    filterable: true,
  },
  {
    key: CONTACT_DIRECTORY_COLUMN_KEYS.ACTION,
    dataIndex: CONTACT_DIRECTORY_COLUMN_KEYS.ACTION,
    title: CONTACT_DIRECTORY_COLUMN_NAME.ACTION,
  },
];
