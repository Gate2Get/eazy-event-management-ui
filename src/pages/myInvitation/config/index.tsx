import dayjs from "dayjs";
import { DataTableColumnType } from "../../../components/dataTable/types";
import { DATE_FORMAT } from "../../../constants";
import { EventTypeType, MyInvitationType } from "../../../types";
import { INVITATION_COLUMN_KEYS, INVITATION_COLUMN_NAME } from "../constant";
import { convertToTitleCase } from "../../../utils/common.utils";
import { Select, Tag } from "antd";

export const invitationColumns = (
  eventTypeOptions: EventTypeType[]
): DataTableColumnType[] => [
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
    render: (record) => (
      <div className="event-status">
        <Tag bordered={false} color="processing">
          {convertToTitleCase(record?.[INVITATION_COLUMN_KEYS.TYPE])}
        </Tag>
      </div>
    ),
    filterElement: (options) => (
      <Select
        value={options.value}
        options={eventTypeOptions}
        onChange={(value) => options.filterApplyCallback(value)}
        placeholder="Any"
        className="p-column-filter"
        style={{ width: "100%" }}
        allowClear
        dropdownStyle={{ overflow: "auto", minWidth: 200 }}
      />
    ),
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
