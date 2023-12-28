import React, { Dispatch } from "react";
import {
  Alert,
  Button,
  Col,
  Divider,
  Form,
  Input,
  Modal,
  Row,
  Segmented,
  Space,
  Typography,
} from "antd";
import { AttachmentButton } from "../../../../components/AttachmentButton";
import { useBearStore } from "../../../../store";
import "../../styles.scss";
import { DataTable } from "../../../../components/dataTable";
import { contactListColumns, SORT_KEYS } from "./config";
import { API } from "../../../../api";
import { ContactDirectoryType, ContactListType } from "../../../../types";
import { CONTACT_LIST_COLUMN_KEYS, DIRECTORY_ACTIONS } from "./constants";
import {
  AppstoreOutlined,
  BarsOutlined,
  CloudDownloadOutlined,
  DeleteOutlined,
  GoogleOutlined,
} from "@ant-design/icons";
import { UploadChangeParam, UploadFile } from "antd/es/upload";
import { parseXlsx } from "../../../../utils/parseXlsx.utils";
import { ContactUserCard } from "../../../../components/contactUserCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import GoogleIcon from "@mui/icons-material/Google";
import { searchGrid } from "../../../../utils/searchGrid.utils";
import { saveAs } from "file-saver";
import { eventManagementEndpoint } from "../../../../configs/axios.config";
import { phoneNumberParser } from "../../../../utils/common.utils";
import { contactValidator } from "../../../../utils/validation.utils";
import {
  LOCAL_STORAGE_VIEW,
  PAGE_ACTION,
  ROUTES_URL,
} from "../../../../constants";
import { v4 as uuidv4 } from "uuid";
import { useSearchParams } from "react-router-dom";
import NoContactList from "../../../../assets/svg/no-contact-list.svg";
import { EmptyData } from "../../../../components/EmptyData";

const { Title, Text, Link } = Typography;
const { Search } = Input;

export const AddEditContactDirectory = () => {
  const [form] = Form.useForm();
  const [searchParams, setSearchParams] = useSearchParams();
  let columns = contactListColumns;
  const { setLoading, screen, isError, setError } = useBearStore.appStore();
  const {
    action,
    contactList,
    selectedDirectory,
    setSelectedDirectory,
    setIsListView,
    isListView,
  } = useBearStore.contactStore();

  const [directoryContactList, setDirectoryContactList]: [
    ContactListType[],
    Dispatch<any>
  ] = React.useState([]);
  const [selectedRowKeys, setSelectedRowKeys]: [string[], Dispatch<any>] =
    React.useState([]);
  const [isDeleteConfirmation, setIsDeleteConfirmation] = React.useState("");
  const [searchValue, setSearchValue] = React.useState("");
  let filteredGrid: any[] = [];

  const colOption = (count: number) =>
    screen === "MOBILE"
      ? {
          flex: count,
        }
      : { span: count };

  React.useEffect(() => {
    if (action === "EDIT" || action === "VIEW") {
      const { id, name } = selectedDirectory;
      console.log({ selectedDirectory });
      form.setFieldValue("name", name);
      // if (action === "EDIT") setIsListView(true);
      // getContactList(id as string);
      form.setFieldValue("contacts", contactList);
      setDirectoryContactList(
        contactList.map((contact) => ({ ...contact, key: contact.id }))
      );
    }
  }, [selectedDirectory]);

  React.useEffect(() => {
    setIsListView(
      localStorage.getItem(LOCAL_STORAGE_VIEW.CONTACT_LIST) === "List"
    );
  }, []);

  if (action === "EDIT" || action === "ADD") {
    columns.forEach((column) => {
      if (column.key === CONTACT_LIST_COLUMN_KEYS.NAME) {
        column.render = (record) => (
          <Input
            placeholder="Input user name"
            status={
              isError && !record?.[CONTACT_LIST_COLUMN_KEYS.NAME] ? "error" : ""
            }
            value={record?.[CONTACT_LIST_COLUMN_KEYS.NAME]}
            onChange={(e) => {
              onContactListChange(
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
              onContactListChange(
                record.id,
                CONTACT_LIST_COLUMN_KEYS.MOBILE,
                e.target.value
              );
            }}
          />
        );
      }
    });
  } else {
    columns.forEach((column) => {
      if (column.key === CONTACT_LIST_COLUMN_KEYS.NAME) {
        column.render = (record) => (
          <Text>{record?.[CONTACT_LIST_COLUMN_KEYS.NAME]}</Text>
        );
      } else if (column.key === CONTACT_LIST_COLUMN_KEYS.MOBILE) {
        column.render = (record) => (
          <Text>{record?.[CONTACT_LIST_COLUMN_KEYS.MOBILE]}</Text>
        );
      }
    });
  }

  const onAddContact = () => {
    const id = uuidv4();
    setDirectoryContactList([
      { name: "", senderId: "", image: "", id },
      ...directoryContactList,
    ]);
  };

  const closeDeleteModal = () => {
    setIsDeleteConfirmation("");
  };

  // const getContactList = (id: string): any => {
  //   setLoading(true);
  //   API.contactManagement
  //     .getContactList(id)
  //     .then((contacts: ContactListType[]) => {
  //       setLoading(false);
  //       setContactList(contacts);
  //       form.setFieldValue("contacts", contacts);
  //       setDirectoryContactList(
  //         contacts.map((contact) => ({ ...contact, key: contact.id }))
  //       );
  //     })
  //     .catch((error: Error) => {
  //       setLoading(false);
  //       console.log({ location: "getContactList", error });
  //     });
  // };

  const createContactDirectory = (directory: ContactDirectoryType): any => {
    setLoading(true);
    API.contactManagement
      .createContactDirectory(directory)
      .then((response) => {
        setLoading(false);
        onCancel();
      })
      .catch((error: Error) => {
        setLoading(false);
        console.log({ location: "createContactDirectory", error });
      });
  };

  const updateContactDirectory = (directory: ContactDirectoryType): any => {
    setLoading(true);
    API.contactManagement
      .updateContactDirectory(directory)
      .then((response) => {
        setLoading(false);
        onCancel();
      })
      .catch((error: Error) => {
        setLoading(false);
        console.log({ location: "updateContactDirectory", error });
      });
  };

  const deleteContactDirectory = (id: string) => {
    setLoading(true);
    API.contactManagement
      .deleteContactDirectory(id)
      .then((response) => {
        setLoading(false);
        setSearchParams({});
      })
      .catch((error: Error) => {
        setLoading(false);
        console.log({ location: "deleteContactDirectory", error });
      });
  };

  const onChangeForm = (key: string, value: any) => {
    setSelectedDirectory({ ...selectedDirectory, [key]: value });
  };

  const onCancel = () => {
    setSearchParams({});
  };

  const onActionClick = async () => {
    const validation = await form.validateFields();

    const directory = form.getFieldsValue();
    const directoryList = {
      ...directory,
      contacts: directoryContactList,
    };
    console.log({ validation, directoryList });
    if (action === "ADD" || action === "EDIT") {
      const isError = contactValidator(directoryList);
      setError(isError);
      if (isError) {
        return;
      }
    }

    if (action === "ADD") {
      createContactDirectory(directoryList);
    } else if (action === "EDIT") {
      updateContactDirectory({ id: selectedDirectory.id, ...directoryList });
    } else if (action === "VIEW") {
      setSearchParams({
        id: selectedDirectory.id as string,
        action: PAGE_ACTION.EDIT,
      });
    }
  };

  const onContactListChange = (id: string, key: string, value: string) => {
    if (
      key === CONTACT_LIST_COLUMN_KEYS.MOBILE &&
      (isNaN(Number(value)) || value.length > 10)
    ) {
      return;
    }
    setDirectoryContactList(
      directoryContactList.map((contact: any) => {
        if (contact.id === id) {
          contact[key] = value;
        }
        return contact;
      })
    );
  };

  const onSelectCard = (id: string, isChecked: boolean) => {
    let _selectedRowKeys = [...selectedRowKeys];
    if (isChecked) {
      _selectedRowKeys.push(id);
    } else {
      _selectedRowKeys = selectedRowKeys.filter((item) => item !== id);
    }
    console.log({ _selectedRowKeys });
    setSelectedRowKeys(_selectedRowKeys);
  };

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (
      selectedRowKeys: React.Key[],
      selectedRows: ContactListType[]
    ) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
      setSelectedRowKeys(selectedRowKeys);
    },
    getCheckboxProps: (record: ContactListType) => {
      return {
        name: record?.name,
      };
    },
  };

  const handleFileUpload = async (
    e: UploadChangeParam<UploadFile<any>>
  ): Promise<void> => {
    const { file } = e;
    console.log(file);
    if (file.status === "removed") {
      setDirectoryContactList([]);
      form.setFieldValue("contacts", undefined);
    } else if (file?.size && file.size < 50000) {
      const { uid, name } = file;

      const data = await parseXlsx(file);
      const contactList: ContactListType[] = [];
      data.forEach((contact: any, index: number) => {
        const _contact = {
          id: (index + 1).toString(),
          name: contact.Name?.trim(),
          senderId: (
            contact.Mobile ||
            contact["Phone 1 - Value"] ||
            contact["Phone 2 - Value"]
          )
            ?.toString()
            ?.trim(),
          image: contact.Photo?.trim(),
        };
        if (_contact.name && _contact.senderId) {
          _contact.senderId = phoneNumberParser(_contact.senderId);
          contactList.push(_contact);
        }
      });
      console.log({ contactList });
      setDirectoryContactList(contactList);
      form.setFieldValue("contacts", contactList);
      console.log({ data });
    } else {
    }
    form.validateFields();
  };

  const onDeleteConfirm = () => {
    const { id } = selectedDirectory;
    deleteContactDirectory(id as string);
    closeDeleteModal();
  };

  const onFinishDirectory = (values: any) => {
    console.log(values);
    createContactDirectory(values);
  };

  const normFile = (e: any) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const removeContact = () => {
    const contactList = directoryContactList.filter(
      (contact) => !selectedRowKeys.includes(contact.id)
    );
    setDirectoryContactList(contactList);
    setSelectedRowKeys([]);
    form.setFieldValue("contacts", contactList);
  };

  const onSearch = (searchValue: string) => {
    setSearchValue(searchValue);
  };

  if (searchValue) {
    filteredGrid = searchGrid(searchValue, directoryContactList);
  }

  return (
    <div className="add-edit-contact-Directory__container">
      <Modal
        title={<>Delete Confirmation</>}
        open={!!isDeleteConfirmation}
        onOk={onDeleteConfirm}
        onCancel={closeDeleteModal}
        okText="Yes"
        cancelText="No"
        okType="danger"
      >
        Once deleted it cannot be undo
      </Modal>
      <Row gutter={[16, 16]} className="header__row sticky-header">
        <Col flex={12}>
          <Row className="header__container">
            <Col
              span={screen === "MOBILE" ? 4 : 1}
              className="back-icon__container"
            >
              <Button
                type="text"
                onClick={onCancel}
                icon={<KeyboardBackspaceIcon className="back-icon" />}
              >
                {action === "VIEW"
                  ? selectedDirectory.name
                  : DIRECTORY_ACTIONS[action].header}
              </Button>
            </Col>
          </Row>
        </Col>
        <Col className="action__button-groups">
          {DIRECTORY_ACTIONS[action].secondaryButtonText && (
            <Button onClick={onCancel}>
              {DIRECTORY_ACTIONS[action].secondaryButtonText}
            </Button>
          )}
          {DIRECTORY_ACTIONS[action].primaryButtonText && (
            <Button type="primary" onClick={onActionClick}>
              {DIRECTORY_ACTIONS[action].primaryButtonText}
            </Button>
          )}
          {DIRECTORY_ACTIONS[action].deleteButtonText && (
            <Button
              type="default"
              danger
              onClick={() => {
                setIsDeleteConfirmation("DIRECTORY");
              }}
            >
              {DIRECTORY_ACTIONS[action].deleteButtonText}
            </Button>
          )}
        </Col>
      </Row>

      {action !== "VIEW" && (
        <>
          <Form
            layout="vertical"
            form={form}
            name="directory"
            scrollToFirstError
            onFinish={onFinishDirectory}
          >
            <Form.Item
              label="Enter Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input your directory name!",
                },
              ]}
            >
              <Input
                required
                value={selectedDirectory.name}
                placeholder="Name of the directory"
                style={{ width: screen === "MOBILE" ? "100%" : "50%" }}
                onChange={(event) => onChangeForm("name", event.target.value)}
              />
            </Form.Item>
            <Form.Item
              label="Bulk upload Directory file"
              name="contacts"
              rules={[
                {
                  required: false,
                  message: "Please upload your directory file!",
                },
              ]}
              getValueFromEvent={normFile}
              valuePropName="fileList"
            >
              <AttachmentButton
                accept=".xlsx, .csv"
                buttonText="Upload"
                otherProps={{ maxCount: 1 }}
                onAttach={handleFileUpload}
              />
            </Form.Item>
            <Space direction="vertical">
              <Text italic>
                Want to export <GoogleIcon fontSize="inherit" /> google contact?{" "}
                <Link
                  href={ROUTES_URL.CONTACT_MANAGEMENT_GOOGLE_DOC}
                  target="_blank"
                >
                  Click here
                </Link>
              </Text>
              <Text italic>
                Template file?{" "}
                <Link
                  href="#"
                  onClick={() =>
                    saveAs(`${eventManagementEndpoint.exportContact}/template`)
                  }
                >
                  download here
                </Link>
              </Text>
            </Space>
          </Form>
        </>
      )}
      {isError && (
        <Alert
          message="Atleast one contact is required in the directory"
          type="error"
          showIcon
          style={{ margin: "1rem 0rem 0rem 0rem" }}
        />
      )}
      <>
        <Divider />
        <Row gutter={[16, 8]}>
          <Col flex={12}>
            <Text className="tab__header">Contact List</Text>
          </Col>
          <Col className="list__grid-view add-action__button" flex={12}>
            {selectedRowKeys.length ? (
              <Button
                danger
                icon={<DeleteOutlined />}
                style={{ marginTop: "9px", marginLeft: ".4rem" }}
                onClick={() => {
                  removeContact();
                }}
              >
                Delete
              </Button>
            ) : null}

            <>
              {(action === "EDIT" || action === "ADD") && (
                <Button onClick={onAddContact} style={{ marginTop: "9px" }}>
                  Add New
                </Button>
              )}
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
              />
              <CloudDownloadOutlined
                size={50}
                onClick={() => {
                  saveAs(
                    `${eventManagementEndpoint.exportContact}/${selectedDirectory.id}`
                  );
                }}
              />
            </>
          </Col>
        </Row>
      </>

      <br />
      <Row gutter={[8, 8]}>
        <Col {...colOption(12)}>
          {directoryContactList.length ? (
            <Search
              placeholder="Search here"
              onSearch={onSearch}
              style={{ width: "100%" }}
              allowClear
            />
          ) : null}
        </Col>
        <Col {...colOption(12)}>
          {searchValue ? (
            <Text italic className="float-right">
              Showing <Text strong>{filteredGrid.length}</Text> of
              <Text strong>{directoryContactList.length}</Text> contact's
            </Text>
          ) : (
            <Text italic className="float-right">
              Showing total <Text strong>{directoryContactList.length} </Text>
              contact's
            </Text>
          )}
        </Col>
      </Row>

      <br />
      <br />
      {!(filteredGrid.length || directoryContactList.length) ? (
        <EmptyData
          onClickAction={onAddContact}
          image={NoContactList}
          description={
            searchValue ? (
              <>
                No contact list to show for the selected filter,{" "}
                <Link
                  href="#"
                  onClick={() => {
                    onSearch("");
                  }}
                >
                  Clear filter
                </Link>
              </>
            ) : (
              "No contact list to show"
            )
          }
          buttonText="Add Contact"
        />
      ) : null}
      {isListView ? (
        <DataTable
          columns={columns}
          data={searchValue ? filteredGrid : directoryContactList}
          sortKeys={SORT_KEYS}
          otherProps={
            action === "EDIT" || action === "ADD"
              ? {
                  rowSelection: {
                    type: "checkbox",
                    ...rowSelection,
                    selectedRowKeys,
                  },
                }
              : {}
          }
        />
      ) : (
        <Row gutter={[16, 16]}>
          {(searchValue ? filteredGrid : directoryContactList).map(
            (contact) => (
              <Col span={screen === "MOBILE" ? 24 : 8} key={contact.id}>
                <ContactUserCard
                  isError={isError}
                  editable={action === "ADD" || action === "EDIT"}
                  onContactChange={onContactListChange}
                  image={contact.image}
                  senderId={contact.senderId}
                  name={contact.name}
                  id={contact.id}
                  isSelected={selectedRowKeys.includes(contact.id)}
                  onSelectCard={onSelectCard}
                />
              </Col>
            )
          )}
        </Row>
      )}
    </div>
  );
};
