import { Select, Tag } from "antd";
import {
  EVENT_SEND_STATUS_LABEL_MAP,
  EVENT_SEND_STATUS_MAP,
} from "../../../constants";
import {
  CONTACT_LIST_COLUMN_KEYS,
  CONTACT_LIST_COLUMN_NAME,
} from "../../../pages/contactManagement/components/addEditContactDirectory/constants";
import { DataTableColumnType } from "../../dataTable/types";

const statusOptions = Object.keys(EVENT_SEND_STATUS_MAP).map((status) => ({
  label: (
    <Tag color={EVENT_SEND_STATUS_LABEL_MAP?.[status]}>
      {EVENT_SEND_STATUS_MAP[status]}
    </Tag>
  ),
  value: status,
}));

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
  {
    key: CONTACT_LIST_COLUMN_KEYS.STATUS,
    dataIndex: CONTACT_LIST_COLUMN_KEYS.STATUS,
    title: CONTACT_LIST_COLUMN_NAME.STATUS,
    sortable: true,
    filterable: true,
    render: (record) => (
      <Tag
        color={
          EVENT_SEND_STATUS_LABEL_MAP?.[
            record?.[CONTACT_LIST_COLUMN_KEYS.STATUS]
          ]
        }
      >
        {EVENT_SEND_STATUS_MAP[record?.[CONTACT_LIST_COLUMN_KEYS.STATUS]]}
      </Tag>
    ),
    filterElement: (options) => (
      <Select
        value={options.value}
        options={statusOptions}
        onChange={(value) => options.filterApplyCallback(value)}
        placeholder="Any"
        className="p-column-filter"
        style={{ width: "100%" }}
        allowClear
      />
    ),
  },
];
