import React, { Dispatch } from "react";
import {
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
  DeleteOutlined,
} from "@ant-design/icons";
import { UploadChangeParam, UploadFile } from "antd/es/upload";
import { parseXlsx } from "../../../../utils/parseXlsx.utils";
import { ContactUserCard } from "../../../../components/contactUserCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import IllustrationWebp from "../../../../assets/webp/illustration-self-service.webp";

const { Title, Text, Link } = Typography;

export const AddEditContactDirectory = () => {
  const [form] = Form.useForm();
  let columns = contactListColumns;
  const { setLoading, screen } = useBearStore.appStore();
  const {
    action,
    setAction,
    setContactList,
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

  React.useEffect(() => {
    if (action === "EDIT" || action === "VIEW") {
      const { _id, name } = selectedDirectory;
      console.log(selectedDirectory);
      form.setFieldValue("name", name);
      setIsListView(true);
      getContactList(_id as string);
    }
  }, [action]);

  if (action === "EDIT") {
    columns.forEach((column) => {
      if (column.key === CONTACT_LIST_COLUMN_KEYS.NAME) {
        column.render = (text, record) => (
          <Input
            value={text}
            onChange={(e) => {
              onContactListChange(record._id, "name", e.target.value);
            }}
          />
        );
      } else if (column.key === CONTACT_LIST_COLUMN_KEYS.MOBILE) {
        column.render = (text, record) => (
          <Input
            type="number"
            value={text}
            onChange={(e) => {
              onContactListChange(record._id, "mobile", e.target.value);
            }}
          />
        );
      }
    });
  } else {
    columns.forEach((column) => {
      if (column.key === CONTACT_LIST_COLUMN_KEYS.NAME) {
        column.render = (text, record) => <Text>{text}</Text>;
      } else if (column.key === CONTACT_LIST_COLUMN_KEYS.MOBILE) {
        column.render = (text, record) => <Text>{text}</Text>;
      }
    });
  }

  const onAddContact = () => {
    setDirectoryContactList([
      { name: "", mobile: "" },
      ...directoryContactList,
    ]);
  };

  const closeDeleteModal = () => {
    setIsDeleteConfirmation("");
  };

  const getContactList = (id: string): any => {
    setLoading(true);
    API.contactManagement
      .getContactList(id)
      .then((contacts: ContactListType[]) => {
        setLoading(false);
        setContactList(contacts);
        form.setFieldValue("contacts", contacts);
        setDirectoryContactList(
          contacts.map((contact) => ({ ...contact, key: contact._id }))
        );
      })
      .catch((error: Error) => {
        setLoading(false);
        console.log({ location: "getContactList", error });
      });
  };

  const createContactDirectory = (directory: ContactDirectoryType): any => {
    setLoading(true);
    API.contactManagement
      .createContactDirectory(directory)
      .then((response) => {
        setLoading(false);
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
    setAction("");
  };

  const onActionClick = async () => {
    const validation = await form.validateFields();
    console.log({ validation });
    const directory = form.getFieldsValue();

    if (action === "ADD") {
      createContactDirectory(directory);
      onCancel();
    } else if (action === "EDIT") {
      updateContactDirectory({ id: selectedDirectory._id, ...directory });
      onCancel();
    } else if (action === "VIEW") {
      setAction("EDIT");
    }
  };

  const onContactListChange = (id: string, key: string, value: string) => {
    setDirectoryContactList(
      directoryContactList.map((contact: any) => {
        if (contact.id === id) {
          contact[key] = value;
        }
        return contact;
      })
    );
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
      const contactList = data.map((contact: any) => ({
        name: contact.Name,
        mobile: contact.Mobile,
      }));
      setDirectoryContactList(contactList);
      form.setFieldValue("contacts", contactList);
      console.log({ data });
    } else {
    }
    form.validateFields();
  };

  const onDeleteConfirm = () => {
    const { _id } = selectedDirectory;
    deleteContactDirectory(_id as string);
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
      (contact) => !selectedRowKeys.includes(contact._id)
    );
    setDirectoryContactList(contactList);
    form.setFieldValue("contacts", contactList);
  };

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
      <Row gutter={[16, 16]} className="header__row">
        <Col flex={12}>
          <Row className="header__container">
            <Col
              span={screen === "MOBILE" ? 4 : 1}
              className="back-icon__container"
            >
              <FontAwesomeIcon
                icon={faArrowLeft}
                size="2x"
                className="back-icon"
                onClick={onCancel}
              />
            </Col>
            <Col
              span={screen === "MOBILE" ? 20 : 23}
              className="event-name__container"
            >
              <Text className="tab__header">
                {action === "VIEW"
                  ? selectedDirectory.name
                  : DIRECTORY_ACTIONS[action].header}
              </Text>
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
      <Row>
        <Col flex={6}>
          <img src={IllustrationWebp} alt="" height={500} />
        </Col>
        <Col flex={18}>
          <Space direction="vertical" style={{ width: "100%" }} size="middle">
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
                      size="large"
                      value={selectedDirectory.name}
                      placeholder="Name of the directory"
                      style={{ width: screen === "MOBILE" ? "100%" : "50%" }}
                      onChange={(event) =>
                        onChangeForm("name", event.target.value)
                      }
                    />
                  </Form.Item>
                  <Form.Item
                    label="Upload Directory file"
                    name="contacts"
                    rules={[
                      {
                        required: true,
                        message: "Please upload your directory file!",
                      },
                    ]}
                    getValueFromEvent={normFile}
                    valuePropName="fileList"
                  >
                    <AttachmentButton
                      buttonText="Upload"
                      onAttach={handleFileUpload}
                    />
                  </Form.Item>
                  <Text>
                    Template file?{" "}
                    <Link href="https://ant.design" target="_blank">
                      download here
                    </Link>
                  </Text>
                </Form>
              </>
            )}
          </Space>
        </Col>
      </Row>

      {directoryContactList?.length ? (
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
                  onClick={() => {
                    removeContact();
                  }}
                >
                  Delete
                </Button>
              ) : action === "EDIT" ? (
                <Button onClick={onAddContact}>Add New</Button>
              ) : (
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
                    setIsListView(value === "List");
                  }}
                />
              )}
            </Col>
          </Row>
        </>
      ) : null}
      <br />
      {isListView ? (
        <DataTable
          columns={columns}
          data={directoryContactList}
          sortKeys={SORT_KEYS}
          otherProps={
            action === "EDIT"
              ? {
                  rowSelection: {
                    type: "checkbox",
                    ...rowSelection,
                  },
                }
              : {}
          }
        />
      ) : (
        <Row gutter={[16, 16]}>
          {directoryContactList.map((contact) => (
            <Col span={screen === "MOBILE" ? 24 : 8} key={contact._id}>
              <ContactUserCard
                mobile={contact.mobile}
                name={contact.name}
                id={contact._id}
              />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};
