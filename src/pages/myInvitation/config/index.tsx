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
    key: INVITATION_COLUMN_KEYS.CHANNEL,
    dataIndex: INVITATION_COLUMN_KEYS.CHANNEL,
    title: INVITATION_COLUMN_NAME.CHANNEL,
    render: (record) => (
      <Tag
        bordered={false}
        icon={CHANNEL_OPTIONS_MAP[record?.[INVITATION_COLUMN_KEYS.CHANNEL]]}
      >
        {" "}
        {CHANNELS[record?.[INVITATION_COLUMN_KEYS.CHANNEL]]}
      </Tag>
    ),
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
    key: INVITATION_COLUMN_KEYS.CREATED_AT,
    dataIndex: INVITATION_COLUMN_KEYS.CREATED_AT,
    title: INVITATION_COLUMN_NAME.CREATED_AT,
    render: (record) =>
      dayjs(record?.[INVITATION_COLUMN_KEYS.CREATED_AT]).format(DATE_FORMAT),
    sortable: true,
    filterable: true,
  },
];
