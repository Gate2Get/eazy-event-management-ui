import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";
import { Button, Col, Input, Row, Segmented, Space, Typography } from "antd";
import React from "react";
import { LOCAL_STORAGE_VIEW } from "../../constants";
import { useBearStore } from "../../store";
import { ContactListType, VoiceCallLogsType } from "../../types";
import { ContactUserCard } from "../contactUserCard";
import { DataTable } from "../dataTable";
import { contactListColumns } from "./config";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { CONTACT_LIST_COLUMN_KEYS } from "../../pages/contactManagement/components/addEditContactDirectory/constants";
import { contactValidator } from "../../utils/validation.utils";
import { v4 as uuidV4 } from "uuid";
import { cloneDeep } from "lodash";
import { VoiceCallLogs } from "../voiceCallLogs";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DownloadIcon from "@mui/icons-material/Download";

const { Text } = Typography;

type PreviewContactType = {
  contactList: ContactListType[] | (VoiceCallLogsType & ContactListType)[];
  showStatus?: boolean;
  setContactList?: (contactList: ContactListType[]) => void;
  isEditable?: boolean;
  onUpdateContact?: () => void;
  isEdit?: boolean;
  setIsEdit?: (isEdit: boolean) => void;
  showLogs?: boolean;
  exportNotificationContacts?: () => void;
};

export const PreviewContact = (props: PreviewContactType) => {
  const {
    contactList,
    showStatus = true,
    setContactList,
    isEditable,
    onUpdateContact,
    isEdit,
    setIsEdit,
    showLogs,
    exportNotificationContacts,
  } = props;
  const { screen, isError, setError } = useBearStore.appStore();
  const { setIsListView, isListView } = useBearStore.contactStore();
  const [selectedContactList, setSelectedContactList] = React.useState<
    ContactListType[]
  >([]);
  const [selectedKeys, setSelectedKeys] = React.useState<string[]>([]);
  const [expandedRows, setExpandedRows] = React.useState<Record<
    string,
    boolean
  > | null>(null);

  React.useEffect(() => {
    setIsListView(
      localStorage.getItem(LOCAL_STORAGE_VIEW.CONTACT_LIST) === "List"
    );
    return () => {};
  }, []);

  const colOption = (count: number) =>
    screen === "MOBILE"
      ? {
          flex: count,
        }
      : { span: count };

  const _contactListColumns = cloneDeep(contactListColumns);
  let columns = showStatus
    ? _contactListColumns
    : _contactListColumns.slice(0, 2);

  if (isEdit && isListView) {
    columns = columns.map((column) => {
      if (column.key === CONTACT_LIST_COLUMN_KEYS.NAME) {
        column.render = (record) => (
          <Input
            placeholder="Input user name"
            status={
              isError && !record?.[CONTACT_LIST_COLUMN_KEYS.NAME] ? "error" : ""
            }
            value={record?.[CONTACT_LIST_COLUMN_KEYS.NAME]}
            onChange={(e) => {
              onContactChange(
                record.id,
                CONTACT_LIST_COLUMN_KEYS.NAME,
                e.target.value
              );
            }}
          />
        );
      } else if (column.key === CONTACT_LIST_COLUMN_KEYS.MOBILE) {
        column.render = (record) => (
          <Input
            placeholder="Input user mobile"
            status={
              isError && !record?.[CONTACT_LIST_COLUMN_KEYS.MOBILE]
                ? "error"
                : ""
            }
            max={10}
            type="number"
            value={record?.[CONTACT_LIST_COLUMN_KEYS.MOBILE]}
            onChange={(e) => {
              onContactChange(
                record.id,
                CONTACT_LIST_COLUMN_KEYS.MOBILE,
                e.target.value
              );
            }}
          />
        );
      }
      return column;
    });
  }

  const onContactChange = (id: string, key: string, value: string) => {
    if (
      key === CONTACT_LIST_COLUMN_KEYS.MOBILE &&
      (isNaN(Number(value)) || value.length > 10)
    ) {
      return;
    }
    const contacts = contactList.map((contact: any) => {
      if (contact.id === id) {
        contact[key] = value;
        if (contact.action !== "ADD") {
          contact.action = "EDIT";
        }
      }
      return contact;
    });

    setContactList?.(contacts);
  };

  const onSelectCard = (record: ContactListType, isChecked: boolean) => {
    let _selectedKeys = [...selectedContactList];
    if (isChecked) {
      _selectedKeys.push(record);
      setSelectedKeys((selectedKeys) => [...selectedKeys, record.id]);
    } else {
      _selectedKeys = _selectedKeys.filter((item) => item.id !== record.id);
      setSelectedKeys((selectedKeys) =>
        selectedKeys.filter((item) => item !== record.id)
      );
    }
    setSelectedContactList(_selectedKeys);
  };

  const onAddNewContct = () => {
    const newContact: ContactListType = {
      id: uuidV4(),
      name: "",
      senderId: "",
      action: "ADD",
    };
    const contacts = [newContact, ...contactList];
    setContactList?.(contacts);
  };

  const onRemoveContact = () => {
    const _selectedKeys = selectedContactList.map((item) => item.id);
    const contacts = contactList.map((contact) => {
      if (_selectedKeys.includes(contact.id)) {
        contact.action = "DELETE";
      }
      return contact;
    });
    setContactList?.(contacts);
    setSelectedContactList([]);
  };

  const onSaveClick = async () => {
    const directoryList = {
      name: "test",
      contacts: contactList,
    };

    const isError = contactValidator(directoryList);
    setError(isError);
    if (isError) {
      return;
    }
    onUpdateContact?.();
  };

  const expandAllRows = React.useMemo(() => {
    const expandedRows: Record<string, boolean> = {};
    contactList.forEach((item: any) => {
      expandedRows[item.requestId] = true;
    });
    return expandedRows;
  }, [contactList]);

  const onExpandAll = () => {
    setExpandedRows(expandAllRows);
  };

  const onCollapseAll = () => {
    setExpandedRows(null);
  };

  let otherProps: any = {};
  if (isEditable && isEdit) {
    otherProps = {
      selectionMode: "checkbox",
      selection: selectedContactList,
      onSelectionChange: (e: { value: ContactListType[] }) => {
        setSelectedContactList(e.value);
        setSelectedKeys(e.value.map((record) => record.id));
      },
      dataKey: "id",
    };
  }

  const _contactList = React.useMemo(
    () => contactList?.filter((item) => item.action !== "DELETE"),
    [contactList]
  );

  const contactListLength = React.useMemo(
    () => contactList.length,
    [contactList]
  );

  const expandedRowsLength = React.useMemo(
    () => (expandedRows ? Object.keys(expandedRows)?.length : 0),
    [expandedRows]
  );

  if (showLogs) {
    otherProps = {
      ...otherProps,
      onRowToggle: (e: any) => {
        setExpandedRows(e.data);
      },
      rowExpansionTemplate: (data: any) => {
        return <VoiceCallLogs callData={data} />;
      },
      expandedRows,
      dataKey: "requestId",
    };
  }

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Row>
        <Col {...colOption(16)} style={{ textAlign: "start" }}>
          <Text italic>Showing total {contactList?.length || 0} contacts</Text>
        </Col>
        <Col {...colOption(8)}>
          <div style={{ width: "100%", float: "right" }}>
            <Segmented
              value={isListView ? "List" : "Card"}
              options={[
                {
                  value: "List",
                  icon: <BarsOutlined />,
                },
                {
                  value: "Card",
                  icon: <AppstoreOutlined />,
                },
              ]}
              onChange={(value) => {
                localStorage.setItem(
                  LOCAL_STORAGE_VIEW.CONTACT_LIST,
                  value.toString()
                );
                setIsListView(value === "List");
              }}
              style={{ float: "right", marginBottom: ".5rem" }}
            />
            {!isEditable && exportNotificationContacts && (
              <Button
                icon={<DownloadIcon fontSize="inherit" />}
                type="text"
                style={{ float: "right" }}
                onClick={exportNotificationContacts}
              >
                Export
              </Button>
            )}

            {isEditable && (
              <>
                {isEdit ? (
                  <Button
                    style={{ float: "right", marginRight: "0.5rem" }}
                    type="default"
                    onClick={onAddNewContct}
                  >
                    Add new
                  </Button>
                ) : null}
                {selectedContactList?.length ? (
                  <Button
                    style={{ float: "right", marginRight: "0.5rem" }}
                    danger
                    onClick={onRemoveContact}
                  >
                    Delete
                  </Button>
                ) : null}
                <Button
                  type={isEdit ? "primary" : "text"}
                  icon={
                    isEdit ? (
                      <SaveOutlinedIcon fontSize="inherit" />
                    ) : (
                      <EditNoteOutlinedIcon fontSize="inherit" />
                    )
                  }
                  style={{ float: "right", marginRight: "0.5rem" }}
                  onClick={() => {
                    isEdit ? onSaveClick() : setIsEdit?.(true);
                  }}
                >
                  {isEdit ? "Save changes" : "Edit"}
                </Button>
              </>
            )}
            {showLogs && (
              <Space size="large" style={{ float: "right" }}>
                <Button
                  type="text"
                  onClick={
                    expandedRowsLength === contactListLength
                      ? onCollapseAll
                      : onExpandAll
                  }
                  icon={
                    expandedRowsLength === contactListLength ? (
                      <RemoveIcon fontSize="inherit" />
                    ) : (
                      <AddIcon fontSize="inherit" />
                    )
                  }
                >
                  {expandedRowsLength === contactListLength
                    ? "Collapse all"
                    : "Expand all"}
                </Button>
              </Space>
            )}
          </div>
        </Col>
      </Row>

      {isListView ? (
        <div style={{ width: "100%" }}>
          <DataTable
            columns={columns}
            data={_contactList}
            otherProps={otherProps}
          />
        </div>
      ) : (
        <Row gutter={[16, 16]}>
          {_contactList?.map((contact) => (
            <Col span={screen === "MOBILE" ? 24 : 8} key={contact.id}>
              <ContactUserCard
                senderId={contact.senderId}
                name={contact.name}
                id={contact.id}
                status={contact.status}
                editable={isEdit}
                isSelected={selectedKeys.includes(contact.id)}
                onSelectCard={(id, isChecked) =>
                  onSelectCard(contact, isChecked)
                }
                onContactChange={onContactChange}
                otherProps={otherProps}
                showLogs={showLogs}
                data={contact}
              />
            </Col>
          ))}
        </Row>
      )}
    </Space>
  );
};
