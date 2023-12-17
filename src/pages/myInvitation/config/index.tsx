import { Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import {
  CHANNELS,
  CHANNEL_OPTIONS_MAP,
  DATE_FORMAT,
  EVENT_STATUS_LABEL,
  EVENT_STATUS_LABEL_COLOR,
} from "../../../constants";
import { MyInvitationType } from "../../../types";
import { INVITATION_COLUMN_KEYS, INVITATION_COLUMN_NAME } from "../constant";

export const invitationColumns: ColumnsType<MyInvitationType> = [
  {
    key: INVITATION_COLUMN_KEYS.NAME,
    dataIndex: INVITATION_COLUMN_KEYS.NAME,
    title: INVITATION_COLUMN_NAME.NAME,
  },
  {
    key: INVITATION_COLUMN_KEYS.CHANNEL,
    dataIndex: INVITATION_COLUMN_KEYS.CHANNEL,
    title: INVITATION_COLUMN_NAME.CHANNEL,
    render: (value) => (
      <Tag bordered={false} icon={CHANNEL_OPTIONS_MAP[value]}>
        {" "}
        {CHANNELS[value]}
      </Tag>
    ),
  },
  {
    key: INVITATION_COLUMN_KEYS.TYPE,
    dataIndex: INVITATION_COLUMN_KEYS.TYPE,
    title: INVITATION_COLUMN_NAME.TYPE,
  },
  {
    key: INVITATION_COLUMN_KEYS.INVITED_BY,
    dataIndex: INVITATION_COLUMN_KEYS.INVITED_BY,
    title: INVITATION_COLUMN_NAME.INVITED_BY,
    render: (value, record: MyInvitationType) => {
      console.log({ record });
      return `${record?.invitedByInfo?.firstName} ${record?.invitedByInfo?.lastName}`;
    },
  },
  {
    key: INVITATION_COLUMN_KEYS.LOCATION,
    dataIndex: INVITATION_COLUMN_KEYS.LOCATION,
    title: INVITATION_COLUMN_NAME.LOCATION,
  },
  {
    key: INVITATION_COLUMN_KEYS.CREATED_AT,
    dataIndex: INVITATION_COLUMN_KEYS.CREATED_AT,
    title: INVITATION_COLUMN_NAME.CREATED_AT,
    render: (value) => dayjs(value).format(DATE_FORMAT),
  },
];
