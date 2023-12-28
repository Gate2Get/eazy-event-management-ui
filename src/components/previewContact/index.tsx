import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";
import { Button, Col, Input, Row, Segmented, Space, Typography } from "antd";
import React from "react";
import { LOCAL_STORAGE_VIEW } from "../../constants";
import { useBearStore } from "../../store";
import { ContactListType } from "../../types";
import { ContactUserCard } from "../contactUserCard";
import { DataTable } from "../dataTable";
import { contactListColumns } from "./config";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { CONTACT_LIST_COLUMN_KEYS } from "../../pages/contactManagement/components/addEditContactDirectory/constants";
import { contactValidator } from "../../utils/validation.utils";
import { v4 as uuidV4 } from "uuid";
import { cloneDeep } from "lodash";

const { Text } = Typography;

type PreviewContactType = {
  contactList: ContactListType[];
  showStatus?: boolean;
  setContactList?: (contactList: ContactListType[]) => void;
  isEditable?: boolean;
  onUpdateContact?: () => void;
  isEdit?: boolean;
  setIsEdit?: (isEdit: boolean) => void;
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
  } = props;
  const { screen, isError, setError } = useBearStore.appStore();
  const { setIsListView, isListView } = useBearStore.contactStore();
  const [selectedKey, setSelectedKey] = React.useState<ContactListType[]>([]);

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
      }
      return contact;
    });

    setContactList?.(contacts);
  };

  const onSelectCard = (record: ContactListType, isChecked: boolean) => {
    let _selectedKeys = [...selectedKey];
    if (isChecked) {
      _selectedKeys.push(record);
    } else {
      _selectedKeys = _selectedKeys.filter((item) => item.id !== record.id);
    }
    setSelectedKey(selectedKey);
  };

  const onAddNewContct = () => {
    const contacts = [
      { id: uuidV4(), name: "", senderId: "", image: "" },
      ...contactList,
    ];
    setContactList?.(contacts);
  };

  const onRemoveContact = () => {
    const _selectedKeys = selectedKey.map((item) => item.id);
    const contacts = contactList.filter(
      (contact) => !_selectedKeys.includes(contact.id)
    );
    console.log({ contacts, _selectedKeys });
    setContactList?.(contacts);
    setSelectedKey([]);
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

  let otherProps: any = {};
  if (isEditable && isEdit) {
    otherProps = {
      selectionMode: "checkbox",
      selection: selectedKey,
      onSelectionChange: (e: any) => setSelectedKey(e.value),
      dataKey: "id",
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
                {selectedKey?.length ? (
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
          </div>
        </Col>
      </Row>

      {isListView ? (
        <div style={{ width: "100%" }}>
          <DataTable
            columns={columns}
            data={contactList}
            otherProps={otherProps}
          />
        </div>
      ) : (
        <Row gutter={[16, 16]}>
          {contactList?.map((contact) => (
            <Col span={screen === "MOBILE" ? 24 : 8} key={contact.id}>
              <ContactUserCard
                senderId={contact.senderId}
                name={contact.name}
                id={contact.id}
                status={contact.status}
                editable={isEdit}
                onSelectCard={(id, isChecked) =>
                  onSelectCard(contact, isChecked)
                }
              />
            </Col>
          ))}
        </Row>
      )}
    </Space>
  );
};
