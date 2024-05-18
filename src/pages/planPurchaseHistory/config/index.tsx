import { Tag, Typography } from "antd";
import { DataTableColumnType } from "../../../components/dataTable/types";
import {
  PLAN_PURCHASE_HISTORY_COLUMN_KEYS,
  PLAN_PURCHASE_HISTORY_COLUMN_NAME,
} from "../constants";
import { PlanPaymentTransactionLogType } from "../../../types";
import { getPaymentTypeRender } from "../../../utils/invoice.utils";
import {
  DATE_TIME_FORMAT,
  PAYMENT_STATUS,
  PAYMENT_STATUS_COLOR,
} from "../../../constants";
import dayjs from "dayjs";

const { Link, Text } = Typography;

export const planPurchaseHistoryColumns: DataTableColumnType[] = [
  {
    key: PLAN_PURCHASE_HISTORY_COLUMN_KEYS.TRANSACTION_ID,
    dataIndex: PLAN_PURCHASE_HISTORY_COLUMN_KEYS.TRANSACTION_ID,
    title: PLAN_PURCHASE_HISTORY_COLUMN_NAME.TRANSACTION_ID,
    sortable: true,
    filterable: true,
  },
  {
    key: PLAN_PURCHASE_HISTORY_COLUMN_KEYS.TYPE,
    dataIndex: PLAN_PURCHASE_HISTORY_COLUMN_KEYS.TYPE,
    title: PLAN_PURCHASE_HISTORY_COLUMN_NAME.TYPE,
    sortable: true,
    filterable: true,
    render: (record: PlanPaymentTransactionLogType) =>
      getPaymentTypeRender(record),
  },
  {
    key: PLAN_PURCHASE_HISTORY_COLUMN_KEYS.AMOUNT,
    dataIndex: PLAN_PURCHASE_HISTORY_COLUMN_KEYS.AMOUNT,
    title: PLAN_PURCHASE_HISTORY_COLUMN_NAME.AMOUNT,
    sortable: true,
    filterable: true,
    render: (record: PlanPaymentTransactionLogType) => (
      <Text>{record.logs?.data?.amount || "-"}</Text>
    ),
  },
  {
    key: PLAN_PURCHASE_HISTORY_COLUMN_KEYS.UPDATED_AT,
    dataIndex: PLAN_PURCHASE_HISTORY_COLUMN_KEYS.UPDATED_AT,
    title: PLAN_PURCHASE_HISTORY_COLUMN_NAME.UPDATED_AT,
    sortable: true,
    filterable: true,
    render: (record) => dayjs(record.updatedAt).format(DATE_TIME_FORMAT),
  },
  {
    key: PLAN_PURCHASE_HISTORY_COLUMN_KEYS.STATUS,
    dataIndex: PLAN_PURCHASE_HISTORY_COLUMN_KEYS.STATUS,
    title: PLAN_PURCHASE_HISTORY_COLUMN_NAME.STATUS,
    sortable: true,
    filterable: true,
    render: (record: PlanPaymentTransactionLogType) => (
      <Tag
        color={
          PAYMENT_STATUS_COLOR?.[record.logs?.code as string] || "processing"
        }
      >
        {PAYMENT_STATUS?.[record.logs?.code as string] || "Pending Payment"}
      </Tag>
    ),
  },
];
