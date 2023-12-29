import { Tag } from "antd";
import dayjs from "dayjs";
import { DataTableColumnType } from "../../../components/dataTable/types";
import {
  CHANNELS,
  CHANNEL_OPTIONS_MAP,
  DATE_FORMAT,
  EVENT_STATUS_LABEL,
  EVENT_STATUS_LABEL_COLOR,
} from "../../../constants";
import { MyInvitationType } from "../../../types";
import { INVITATION_COLUMN_KEYS, INVITATION_COLUMN_NAME } from "../constant";

export const invitationColumns: DataTableColumnType[] = [
  {
    key: INVITATION_COLUMN_KEYS.NAME,
    dataIndex: INVITATION_COLUMN_KEYS.NAME,
    title: INVITATION_COLUMN_NAME.NAME,
    sortable: true,
    filterable: true,
  },
  {
    key: INVITATION_COLUMN_KEYS.TYPE,
    dataIndex: INVITATION_COLUMN_KEYS.TYPE,
    title: INVITATION_COLUMN_NAME.TYPE,
    sortable: true,
    filterable: true,
  },
  {
    key: INVITATION_COLUMN_KEYS.INVITED_BY,
    dataIndex: INVITATION_COLUMN_KEYS.INVITED_BY,
    title: INVITATION_COLUMN_NAME.INVITED_BY,
    render: (record: MyInvitationType) =>
      `${record?.invitedByInfo?.firstName} ${record?.invitedByInfo?.lastName}`,
    sortable: true,
    filterable: true,
  },
  {
    key: INVITATION_COLUMN_KEYS.LOCATION,
    dataIndex: INVITATION_COLUMN_KEYS.LOCATION,
    title: INVITATION_COLUMN_NAME.LOCATION,
    sortable: true,
    filterable: true,
  },
  {
    key: INVITATION_COLUMN_KEYS.START_DATE_TIME,
    dataIndex: INVITATION_COLUMN_KEYS.START_DATE_TIME,
    title: INVITATION_COLUMN_NAME.START_DATE_TIME,
    render: (record) =>
      dayjs(record?.[INVITATION_COLUMN_KEYS.START_DATE_TIME]).format(
        DATE_FORMAT
      ),
    sortable: true,
    filterable: true,
  },
  {
    key: INVITATION_COLUMN_KEYS.END_DATE_TIME,
    dataIndex: INVITATION_COLUMN_KEYS.END_DATE_TIME,
    title: INVITATION_COLUMN_NAME.END_DATE_TIME,
    render: (record) =>
      dayjs(record?.[INVITATION_COLUMN_KEYS.END_DATE_TIME]).format(DATE_FORMAT),
    sortable: true,
    filterable: true,
  },
];
