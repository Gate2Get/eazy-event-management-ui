import { Tag } from "antd";
import dayjs from "dayjs";
import { DataTableColumnType } from "../../../components/dataTable/types";
import { UserProfileCard } from "../../../components/userProfileCard";
import { DATE_FORMAT } from "../../../constants";
import { ADD_CREDIT_COLUMN_KEYS, ADD_CREDIT_COLUMN_NAME } from "../constant";

export const walletTransactionColumns: DataTableColumnType[] = [
  {
    key: ADD_CREDIT_COLUMN_KEYS.NAME,
    dataIndex: ADD_CREDIT_COLUMN_KEYS.NAME,
    title: ADD_CREDIT_COLUMN_NAME.NAME,
    render: (user) => `${user.firstName} ${user.lastName}`,
    sortable: true,
    filterable: true,
  },
  {
    key: ADD_CREDIT_COLUMN_KEYS.MOBILE,
    dataIndex: ADD_CREDIT_COLUMN_KEYS.MOBILE,
    title: ADD_CREDIT_COLUMN_NAME.MOBILE,
    sortable: true,
    filterable: true,
  },
  {
    key: ADD_CREDIT_COLUMN_KEYS.EMAIL,
    dataIndex: ADD_CREDIT_COLUMN_KEYS.EMAIL,
    title: ADD_CREDIT_COLUMN_NAME.EMAIL,
    sortable: true,
    filterable: true,
  },
  {
    key: ADD_CREDIT_COLUMN_KEYS.AMOUNT,
    dataIndex: ADD_CREDIT_COLUMN_KEYS.AMOUNT,
    title: ADD_CREDIT_COLUMN_NAME.AMOUNT,
    sortable: true,
    filterable: true,
  },
  {
    key: ADD_CREDIT_COLUMN_KEYS.TYPE,
    dataIndex: ADD_CREDIT_COLUMN_KEYS.TYPE,
    title: ADD_CREDIT_COLUMN_NAME.TYPE,
    render: (record) => (
      <Tag
        color={
          record?.[ADD_CREDIT_COLUMN_KEYS.TYPE] === "credit" ? "success" : "red"
        }
        bordered={false}
      >
        {record?.[ADD_CREDIT_COLUMN_KEYS.TYPE]}
      </Tag>
    ),
    sortable: true,
    filterable: true,
  },
  {
    key: ADD_CREDIT_COLUMN_KEYS.PAYMENT_BY,
    dataIndex: ADD_CREDIT_COLUMN_KEYS.PAYMENT_BY,
    title: ADD_CREDIT_COLUMN_NAME.PAYMENT_BY,
    sortable: true,
    filterable: true,
  },
  {
    key: ADD_CREDIT_COLUMN_KEYS.CREATED_AT,
    dataIndex: ADD_CREDIT_COLUMN_KEYS.CREATED_AT,
    title: ADD_CREDIT_COLUMN_NAME.CREATED_AT,
    render: (record) =>
      dayjs(record?.[ADD_CREDIT_COLUMN_KEYS.CREATED_AT]).format(DATE_FORMAT),
    sortable: true,
    filterable: true,
  },
  // {
  //   key: ADD_CREDIT_COLUMN_KEYS.ACTION,
  //   dataIndex: ADD_CREDIT_COLUMN_KEYS.ACTION,
  //   title: ADD_CREDIT_COLUMN_NAME.ACTION,
  // },
];
