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
import {
  contactListColumns,
  contactUploadPreviewColumns,
  SORT_KEYS,
} from "./config";
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
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import GoogleIcon from "@mui/icons-material/Google";
import { searchGrid } from "../../../../utils/searchGrid.utils";
import { saveAs } from "file-saver";
import { eventManagementEndpoint } from "../../../../configs/axios.config";
import {
  phoneNumberParser,
  readFileAsText,
} from "../../../../utils/common.utils";
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
import {
  modalClassNames,
  modalStyles,
  useModalStyle,
} from "../../../../configs/antd.config";
import { useTheme } from "antd-style";
import { VCard } from "../../../../utils/vcardParser.utils";
import { concat } from "lodash";
import { useWindowSize } from "../../../../hooks/useWindowSize";

const { Title, Text, Link } = Typography;
const { Search } = Input;

export const AddEditContactDirectory = () => {
  const [form] = Form.useForm();
  const { styles } = useModalStyle();
  const token = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  const { height } = useWindowSize();
  let columns = contactListColumns;
  const { setLoading, screen, isError, setError, snackbar } =
    useBearStore.appStore();
  const {
    action,
    contactList,
    selectedDirectory,
    setSelectedDirectory,
    setIsListView,
    isListView,
  } = useBearStore.contactStore();
  const { activePlan } = useBearStore.userStore();

  const [directoryContactList, setDirectoryContactList]: [
    ContactListType[],
    Dispatch<any>
  ] = React.useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = React.useState<
    ContactListType[]
  >([]);
  const [selectedUploadedContactRowKeys, setSelectedUploadedContactRowKeys] =
    React.useState<ContactListType[]>([]);
  const [selectedKeys, setSelectedKeys] = React.useState<string[]>([]);
  const [isDeleteConfirmation, setIsDeleteConfirmation] = React.useState("");
  const [searchValue, setSearchValue] = React.useState("");
  const [uploadedContact, setUploadedContact] = React.useState<
    ContactListType[]
  >([]);
  const [isUploadContactPreview, setIsUploadContactPreview] =
    React.useState(false);
  let filteredContactGrid: any[] = [];

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

  const createContactDirectory = (directory: ContactDirectoryType): any => {
    setLoading(true);
    API.contactManagement
      .createContactDirectory(directory)
      .then((response) => {
        setLoading(false);
        // onCancel();
        setSearchParams({ creation: "DONE" });
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
        // onCancel();
        setSearchParams({ creation: "DONE" });
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
    if (directoryContactList.length) {
      setDirectoryContactList([]);
    }
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

  const onSelectCard = (record: ContactListType, isChecked: boolean) => {
    let _selectedKeys = [...selectedRowKeys];
    if (isChecked) {
      _selectedKeys.push(record);
      setSelectedKeys((selectedKeys) => [...selectedKeys, record.id]);
    } else {
      _selectedKeys = _selectedKeys.filter((item) => item.id !== record.id);
      setSelectedKeys((selectedKeys) =>
        selectedKeys.filter((item) => item !== record.id)
      );
    }
    setSelectedRowKeys(_selectedKeys);
  };

  const handleFileUpload = async (
    e: UploadChangeParam<UploadFile<any>>
  ): Promise<void> => {
    const { file } = e;
    console.log(file, e);
    if (file.status === "removed") {
      setDirectoryContactList([]);
      form.setFieldValue("contacts", undefined);
    } else if (file?.size && file.size / 1024 / 1024 <= 1) {
      const { uid, name, type } = file;

      const contactList: ContactListType[] = [];
      console.log("type", type);
      if (type === "text/vcard") {
        console.log({ fileyyyy: file });
        const content = await readFileAsText(file);
        console.log({ content });
        const vCard = new VCard();
        const vcf = new Promise((resolve, reject) => {
          vCard.readData(content, (err, data) => {
            if (err) {
              reject(err);
            } else {
              resolve(data);
            }
          });
        });
        const data: any = await vcf;
        data.forEach((contact: any, index: number) => {
          const _contact = {
            id: (index + 1).toString(),
            name: contact?.FN?.replace(",", "").trim(),
            senderId: contact?.TEL?.value,
            image: contact.Photo?.trim(),
          };
          if (_contact.name && _contact.senderId) {
            _contact.senderId = phoneNumberParser(_contact.senderId);
            contactList.push(_contact);
          }
        });
        console.log({ vcf, data, contactList });
      } else {
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
      }
      console.log({ contactList });
      setIsUploadContactPreview(true);
      setUploadedContact(contactList);
      const directoryContactMap: Record<string, ContactListType> = {};
      directoryContactList.forEach((item) => {
        directoryContactMap[item.senderId] = item;
      });
      const selectedUploadedContactRowKeys = contactList.filter(
        (item) => directoryContactMap[item.senderId]
      );
      setSelectedUploadedContactRowKeys(selectedUploadedContactRowKeys);
    } else if (file?.size && file.size / 1024 / 1024 > 1) {
      console.log("Upload file size must be smaller than 1MB!");
      form.setFieldValue("contacts", undefined);
      snackbar?.open({
        key: `contact-file-upload-error`,
        type: "error",
        content: "Upload file must be smaller than 1MB!",
        duration: 10,
      });
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
    const _selectedKeys = selectedRowKeys.map((item) => item.id);
    const contactList = directoryContactList.filter(
      (contact) => !_selectedKeys.includes(contact.id)
    );
    if (selectedUploadedContactRowKeys.length) {
      const _selectedUploadedContactRowKeys =
        selectedUploadedContactRowKeys.filter(
          (contact) => !_selectedKeys.includes(contact.id)
        );
      setSelectedUploadedContactRowKeys(_selectedUploadedContactRowKeys);
    }
    const _contactList = contactList.map((contact, index) => ({
      ...contact,
      key: index + 1,
      id: index + 1,
    }));
    setDirectoryContactList(_contactList);
    setSelectedRowKeys([]);
    form.setFieldValue("contacts", _contactList);
  };

  const onSearch = (searchValue: string) => {
    setSearchValue(searchValue);
  };

  const addContactFromPreview = () => {
    const directoryContactMap: Record<string, ContactListType> = {};
    const uploadedContactMap: Record<string, ContactListType> = {};
    uploadedContact.forEach(
      (item) => (uploadedContactMap[item.senderId] = item)
    );
    const manualAddedContact: ContactListType[] = [];
    directoryContactList.forEach((item) => {
      directoryContactMap[item.senderId] = item;
      if (!uploadedContactMap[item.senderId]) {
        manualAddedContact.push(item);
      }
    });
    console.log({ selectedUploadedContactRowKeys });
    const _selectedUploadedContactRowKeys = selectedUploadedContactRowKeys.map(
      (item) => {
        if (directoryContactMap[item.senderId]) {
          item.name = directoryContactMap[item.senderId]?.name;
        }
        return item;
      }
    );

    // Merge the unique part of array1 with array2
    const contactList = concat(
      _selectedUploadedContactRowKeys,
      manualAddedContact
    );
    const _contactList = contactList.map((contact, index) => ({
      ...contact,
      key: index + 1,
      id: index + 1,
    }));
    setDirectoryContactList(_contactList);
    form.setFieldValue("contacts", _contactList);
    console.log({ _contactList });
    setIsUploadContactPreview(false);
  };

  if (searchValue) {
    filteredContactGrid = searchGrid(searchValue, directoryContactList);
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
        classNames={modalClassNames(styles)}
        styles={modalStyles(token) as any}
      >
        Once deleted it cannot be undo
      </Modal>
      <Modal
        title={<>Preview upload contact</>}
        open={isUploadContactPreview}
        onOk={addContactFromPreview}
        onCancel={() => {
          setIsUploadContactPreview(false);
        }}
        okText="Add contact"
        cancelText="Cancel"
        okType="primary"
        width={"100%"}
        styles={modalStyles(token) as any}
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <Text italic style={{ float: "left" }}>
            {selectedUploadedContactRowKeys.length} contact's selected
          </Text>
          <div>
            <DataTable
              columns={contactUploadPreviewColumns}
              data={uploadedContact}
              otherProps={{
                selectionMode: "checkbox",
                selection: selectedUploadedContactRowKeys,
                onSelectionChange: (e: { value: ContactListType[] }) => {
                  setSelectedUploadedContactRowKeys(e.value);
                },
                dataKey: "id",
              }}
              styles={{ height: height - 200 }}
            />
          </div>
        </Space>
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
        {screen !== "MOBILE" && (
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
        )}
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
              help={
                <>
                  <p>Upload file must be smaller than 1MB!</p>
                  <p>Supported file formats are .xlsx, .csv, .vcf</p>
                </>
              }
            >
              <AttachmentButton
                accept=".xlsx, .csv, .vcf"
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
          message="At least one contact is required in the directory"
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
              {(action === "EDIT" || action === "ADD") &&
                (activePlan?.pricingPlan?.contactCount as number) >
                  directoryContactList.length && (
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
              Showing <Text strong>{filteredContactGrid.length}</Text> of
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
      {uploadedContact?.length ? (
        <>
          <Row gutter={[8, 8]} style={{ float: "right" }}>
            <Text italic>
              {/* Template file?{" "} */}
              <Link
                href="#"
                onClick={() => {
                  setIsUploadContactPreview(true);
                }}
              >
                Click here to select contact from uploaded list
              </Link>
            </Text>
          </Row>
          <br />
        </>
      ) : null}
      {(activePlan?.pricingPlan?.contactCount as number) <=
        directoryContactList.length && (
        <>
          <br />
          <Alert
            style={{ width: "100%" }}
            message={`Your contact directory has reached the limit of ${activePlan?.pricingPlan?.contactCount} contacts for the current ${activePlan?.pricingPlan?.name} plan. To add more contacts, please upgrade your plan.`}
            type="warning"
          />
        </>
      )}
      <br />
      {!(filteredContactGrid.length || directoryContactList.length) ? (
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
      {isListView &&
      (filteredContactGrid.length || directoryContactList.length) ? (
        <DataTable
          columns={columns}
          data={searchValue ? filteredContactGrid : directoryContactList}
          sortKeys={SORT_KEYS}
          otherProps={
            action === "EDIT" || action === "ADD"
              ? {
                  selectionMode: "checkbox",
                  selection: selectedRowKeys,
                  onSelectionChange: (e: { value: ContactListType[] }) => {
                    console.log({ e });
                    setSelectedRowKeys(e.value);
                    setSelectedKeys(e.value.map((record) => record.id));
                  },
                  dataKey: "id",
                }
              : {}
          }
        />
      ) : (
        <Row gutter={[16, 16]}>
          {(searchValue ? filteredContactGrid : directoryContactList).map(
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
                  isSelected={selectedKeys.includes(contact.id)}
                  onSelectCard={(id, isChecked) =>
                    onSelectCard(contact, isChecked)
                  }
                />
              </Col>
            )
          )}
        </Row>
      )}
      {screen === "MOBILE" && (
        <Space
          direction="vertical"
          style={{ width: "100%" }}
          className="eazy-event__bottom-fixed-btn"
        >
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
        </Space>
      )}
    </div>
  );
};
