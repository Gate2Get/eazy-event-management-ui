import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Alert,
  Button,
  Col,
  Form,
  Input,
  MenuProps,
  Modal,
  Radio,
  Row,
  Select,
  Space,
  Typography,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { UploadChangeParam, UploadFile } from "antd/es/upload";
import React, { Dispatch } from "react";
import { API } from "../../api";
import { AttachmentButton } from "../../components/AttachmentButton";
import { TemplateCard } from "../../components/templateCard";
import { RichTextEditor } from "../../components/richTextEditor";
import { CHANNEL_OPTIONS, EVENT_TYPE_PROPS } from "../../constants";
import { useBearStore } from "../../store";
import { ActionType, TemplateType } from "../../types";
import { v4 as uuidv4 } from "uuid";
import "./styles.scss";
import { SunEditorReactProps } from "suneditor-react/dist/types/SunEditorReactProps";

const eventTypeOptions = Object.keys(EVENT_TYPE_PROPS).map((event: string) => ({
  label: EVENT_TYPE_PROPS[event].label,
  value: event,
}));

const { Title } = Typography;

export const TemplateManagement = () => {
  const [form] = Form.useForm();
  const { setLoading, screen } = useBearStore.appStore();
  const {
    setTemplates,
    action,
    isListView,
    selectedTemplate,
    setAction,
    setIsListView,
    setSelectedTemplate,
    templates,
  } = useBearStore.templateStore();

  const [messages, setMessages]: [any, Dispatch<any>] = React.useState({});
  const [isError, setIsError]: [boolean, Dispatch<any>] = React.useState(false);
  const [messageError, setMessageError] = React.useState("");

  React.useEffect(() => {
    if (!action) {
      getTemplates();
      setSelectedTemplate({
        message: "",
        name: "",
      });
      form.resetFields();
    }
  }, [action, form]);

  React.useEffect(() => {
    return () => {
      setAction("");
      setMessageError("");
      setIsError(false);
    };
  }, []);

  const handleFileUpload = async (
    id: string,
    e: UploadChangeParam<UploadFile<any>>
  ): Promise<void> => {
    const { file } = e;
    if (file.status === "removed") {
      handleOnChangeFieldVoice(id, "");
    } else if (file?.size && file.size < 5000000) {
      const { uid, name } = file;
      setLoading(true);
      API.commonAPI
        .uploadFile(file, "audio")
        .then((blobId: string) => {
          setLoading(false);
          console.log(blobId);
          const urlObject = new URL(blobId);
          const pathname = urlObject.pathname;
          handleOnChangeFieldVoice(id, blobId);
        })
        .catch((error: Error) => {
          setLoading(false);
          console.log({ location: "handleFileUpload", error });
        });
    } else {
      console.error("Upload file error", file);
    }
  };

  const onCancel = () => {
    setAction("");
  };

  const getMenuItems = (data: TemplateType): MenuProps["items"] => [
    {
      label: "View",
      key: "view",
      onClick: () => onViewSelect(data),
      icon: <EyeOutlined />,
    },
    {
      label: "Edit",
      key: "edit",
      onClick: () => onEditSelect(data),
      icon: <EditOutlined />,
    },
    {
      label: "Delete",
      key: "delete",
      onClick: () => onDeleteSelect(data),
      icon: <DeleteOutlined />,
    },
  ];

  const onViewSelect = (record: TemplateType) => {
    setAction("VIEW");
    form.setFieldsValue(record);
    setSelectedTemplate(record);
    setMessages(JSON.parse(record.message));
  };

  const onEditSelect = (record: TemplateType) => {
    setAction("EDIT");
    form.setFieldsValue(record);
    setSelectedTemplate(record);
    setMessages(JSON.parse(record.message));
  };

  const onDeleteSelect = (record: TemplateType) => {
    setAction("DELETE");
    setSelectedTemplate(record);
  };

  const getTemplates = (): void => {
    setLoading(true);
    API.templateManagement
      .getTemplate()
      .then((templates: TemplateType[]) => {
        setTemplates(templates);
        setLoading(false);
      })
      .catch((error: Error) => {
        setLoading(false);
        console.log({ location: "getTemplates", error });
      });
  };

  const createTemplates = (template: TemplateType): void => {
    setLoading(true);
    API.templateManagement
      .createTemplate(template)
      .then(() => {
        onCancel();
        setLoading(false);
      })
      .catch((error: Error) => {
        setLoading(false);
        console.log({ location: "createTemplates", error });
      });
  };

  const updateTemplate = (template: TemplateType): void => {
    setLoading(true);
    API.templateManagement
      .updateTemplate(template)
      .then(() => {
        onCancel();
        setLoading(false);
      })
      .catch((error: Error) => {
        setLoading(false);
        console.log({ location: "updateTemplate", error });
      });
  };

  const deleteTemplate = (id: string): void => {
    setLoading(true);
    API.templateManagement
      .deleteTemplate(id)
      .then(() => {
        onCancel();
        setLoading(false);
      })
      .catch((error: Error) => {
        setLoading(false);
        console.log({ location: "deleteTemplate", error });
      });
  };

  const onSubmit = (values: any) => {
    if (!Object.values(messages).length) {
      setMessageError("Please add message!");
      return;
    }
    if (Object.values(messages).find((item: any) => !item.value)) {
      setIsError(true);
      return;
    }
    setMessageError("");
    setIsError(false);
    if (action === "ADD") {
      createTemplates({ ...values, message: JSON.stringify(messages) });
    } else if (action === "EDIT") {
      updateTemplate({
        ...selectedTemplate,
        ...values,
        message: JSON.stringify(messages),
      });
    }
  };

  const onDeleteConfirm = () => {
    const { id } = selectedTemplate;
    deleteTemplate(id as string);
  };

  const handleFormChange = (key: string, value: any) => {
    setSelectedTemplate({ ...selectedTemplate, [key]: value });
  };

  const richTextProps: SunEditorReactProps = {};
  if (
    (action === "VIEW" || action === "EDIT") &&
    selectedTemplate.channel === "WHATSAPP"
  ) {
    richTextProps.setContents = selectedTemplate.message;
    richTextProps.hideToolbar = action === "VIEW";
  }

  const getFileList = (file?: string) => {
    let fileList: any[] = [];
    if (file) {
      const urlObject = new URL(file);
      console.log({ urlObject });
      const pathname = urlObject.pathname;
      const filePath = pathname.substring(pathname.lastIndexOf("/") + 1);
      const fileName = filePath.split("_");
      fileName.shift();
      fileList = [
        {
          uid: "1",
          name: fileName.join("_"),
          status: "done",
          url: file,
        },
      ];
    }
    console.log({ fileList, file });
    return fileList;
  };

  const renderVoiceMessage = (message: any) => {
    if (message.type === "TEXT") {
      return (
        <TextArea
          size="large"
          style={{ minHeight: "40vh", width: "100%" }}
          disabled={action === "VIEW"}
          autoSize={{ minRows: 1, maxRows: 20 }}
          value={message.value}
          status={isError && !message.value ? "error" : ""}
          onChange={(e) => {
            handleOnChangeFieldVoice(message.id, e.target.value);
          }}
        />
      );
    } else if (message.type === "AUDIO") {
      return (
        <AttachmentButton
          otherProps={{ maxCount: 1, fileList: getFileList(message.value) }}
          disabled={action === "VIEW"}
          buttonText="Upload"
          onAttach={(e) => handleFileUpload(message.id, e)}
        />
      );
    }
  };

  const handleAddFieldVoice = (type: string) => {
    const id = uuidv4();
    setMessages({
      ...messages,
      [id]: {
        type,
        value: "",
        id,
      },
    });
  };

  const handleOnChangeFieldVoice = (id: string, value: string) => {
    setMessages({
      ...messages,
      [id]: {
        type: messages[id].type,
        value,
        id,
      },
    });
  };

  const handleRemoveFieldVoice = (id: string) => {
    const _messages = { ...messages };
    delete _messages[id];
    setMessages(_messages);
  };

  return (
    <div className="template-management__container">
      <Modal
        title={<>Delete Confirmation</>}
        open={action === "DELETE"}
        onOk={onDeleteConfirm}
        onCancel={onCancel}
        okText="Yes"
        cancelText="No"
        okType="danger"
      >
        Once deleted it cannot be undo
      </Modal>
      <Row gutter={[16, 16]} className="header__row">
        <Col flex={12}>
          <Row className="header__container">
            {action && action !== "DELETE" ? (
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
            ) : (
              <Col span={screen === "MOBILE" ? 20 : 23}>
                <Button
                  size="large"
                  type="primary"
                  onClick={() => {
                    setAction("ADD");
                  }}
                >
                  Create Template
                </Button>
              </Col>
            )}
          </Row>
        </Col>
      </Row>

      {(!action || action === "DELETE") && (
        <Row gutter={[16, 16]}>
          {templates.map((template) => (
            <Col span={screen === "MOBILE" ? 24 : 8} key={template.id}>
              <TemplateCard
                template={template}
                menuItems={getMenuItems(template)}
              />
            </Col>
          ))}
        </Row>
      )}
      {action && action !== "DELETE" && (
        <Form
          layout="vertical"
          onFinish={onSubmit}
          form={form}
          name="template"
          scrollToFirstError
        >
          <Form.Item
            label="Select the channel"
            name="channel"
            rules={[
              { required: true, message: "Please select event channel!" },
            ]}
          >
            <Radio.Group
              disabled={action === "VIEW"}
              options={CHANNEL_OPTIONS}
              optionType="button"
              buttonStyle="solid"
              onChange={(e) => {
                handleFormChange("channel", e.target.value);
              }}
            />
          </Form.Item>

          {form.getFieldValue("channel") && (
            <Form.Item label="Select Event" name="type">
              <Select
                style={{ width: "100%" }}
                size="large"
                allowClear
                placeholder="Select a event"
                optionFilterProp="children"
                options={eventTypeOptions}
                disabled={action === "VIEW"}
              />
            </Form.Item>
          )}

          {form.getFieldValue("channel") && (
            <Form.Item
              label="Enter template name"
              name="name"
              rules={[
                { required: true, message: "Please input your template name" },
              ]}
            >
              <Input size="large" disabled={action === "VIEW"} />
            </Form.Item>
          )}

          {form.getFieldValue("channel") === "WHATSAPP" && (
            <Form.Item
              label="Enter message"
              name="message"
              rules={[{ required: true, message: "Please input your message" }]}
            >
              <RichTextEditor disable={action === "VIEW"} {...richTextProps} />
            </Form.Item>
          )}
          {form.getFieldValue("channel") === "VOICE_CALL" && (
            <>
              <Title level={5}>Message</Title>
              {messageError && (
                <Alert message={messageError} type="error" showIcon />
              )}
              {Object.values(messages).map((message: any) => (
                <div style={{ padding: "8px 0px" }} key={message?.id}>
                  <Row gutter={[8, 8]}>
                    <Col span={22}>{renderVoiceMessage(message)}</Col>
                    <Col>
                      <Button
                        onClick={() => {
                          handleRemoveFieldVoice(message.id);
                        }}
                        danger
                        size="large"
                        icon={<DeleteOutlined />}
                      ></Button>
                    </Col>
                  </Row>
                </div>
              ))}
              <Space
                className="site-button-ghost-wrapper"
                style={{ padding: "10px 0px" }}
                wrap
              >
                <Button
                  type="default"
                  onClick={() => {
                    handleAddFieldVoice("TEXT");
                  }}
                >
                  Add Text
                </Button>
                <Button
                  type="default"
                  onClick={() => {
                    handleAddFieldVoice("AUDIO");
                  }}
                  icon={<UploadOutlined />}
                >
                  Add Audio
                </Button>
              </Space>
            </>
          )}

          {form.getFieldValue("channel") === "SMS" ? (
            <Form.Item
              label="Enter message"
              name="message"
              rules={[{ required: true, message: "Please input your message" }]}
            >
              <TextArea
                style={{ minHeight: "40vh" }}
                disabled={action === "VIEW"}
              />
            </Form.Item>
          ) : null}
          {/* {form.getFieldValue("channel") === "VOICE_CALL" && (
            <Form.Item
              label="Upload voice file"
              name="blob"
              rules={[
                {
                  required: false,
                  message: "Please upload your voice file!",
                },
              ]}
              valuePropName="fileList"
            >
              <AttachmentButton
                otherProps={{ maxCount: 1, fileList }}
                disabled={action === "VIEW"}
                buttonText="Upload"
                onAttach={handleFileUpload}
              />
            </Form.Item>
          )} */}
          {(action === "ADD" || action === "EDIT") && (
            <Form.Item>
              <Button type="primary" htmlType="submit" size="large">
                {action === "ADD" ? "Create" : "Update"}
              </Button>
            </Form.Item>
          )}
        </Form>
      )}
    </div>
  );
};
