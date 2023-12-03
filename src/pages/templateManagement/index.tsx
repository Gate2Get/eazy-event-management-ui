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
import { TemplateCard } from "../../components/templateCard";
import { RichTextEditor } from "../../components/richTextEditor";
import {
  CHANNEL_OPTIONS,
  EVENT_TYPE_PROPS,
  PAGE_ACTION,
  PAGE_QUERY_ACTIONS,
} from "../../constants";
import { useBearStore } from "../../store";
import { ActionType, TemplateType } from "../../types";
import { v4 as uuidv4 } from "uuid";
import "./styles.scss";
import { SunEditorReactProps } from "suneditor-react/dist/types/SunEditorReactProps";
import { PreviewTemplate } from "../../components/previewTemplate";
import { getFormattedMessage, urlhandler } from "../../utils/common.utils";
import { AttachmentDragger } from "../../components/AttachmentDragger";
import { useTheme } from "antd-style";
import {
  modalClassNames,
  modalStyles,
  useModalStyle,
} from "../../configs/antd.config";
import { EmptyData } from "../../components/EmptyData";
import NoTemplate from "../../assets/svg/no-template.svg";
import { useSearchParams } from "react-router-dom";

const imageUrl = new URL(`../../assets/svg/trash-event.svg`, import.meta.url);

const eventTypeOptions = Object.keys(EVENT_TYPE_PROPS).map((event: string) => ({
  label: EVENT_TYPE_PROPS[event].label,
  value: event,
}));

const { Title, Text } = Typography;

export const TemplateManagement = () => {
  const [form] = Form.useForm();
  const { styles } = useModalStyle();
  const token = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();
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
  const [isDeleteConfirmation, setIsDeleteConfirmation]: [
    boolean,
    Dispatch<any>
  ] = React.useState(false);
  const [messageError, setMessageError] = React.useState("");

  const colOption = (count: number) =>
    screen === "MOBILE"
      ? {
          flex: count,
        }
      : { span: count };

  React.useEffect(() => {
    if (!action) {
      setSelectedTemplate({
        message: "",
        name: "",
      });
      form.resetFields();
    }
  }, [action, form]);

  React.useEffect(() => {
    urlhandler(searchParams, setAction, getTemplatesById, getTemplates);
  }, [searchParams]);

  React.useEffect(() => {
    return () => {
      setAction("");
      setMessageError("");
      setIsError(false);
      setTemplates([]);
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
    setSearchParams({});
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
    setSearchParams({ id: record.id as string, action: PAGE_ACTION.VIEW });
  };

  const onEditSelect = (record: TemplateType) => {
    setSearchParams({ id: record.id as string, action: PAGE_ACTION.EDIT });
  };

  const onDeleteSelect = (record: TemplateType) => {
    setIsDeleteConfirmation(true);
    setSelectedTemplate(record);
  };

  const getTemplatesById = (id: string): void => {
    setLoading(true);
    API.templateManagement
      .getTemplateById(id)
      .then((template: TemplateType) => {
        setSelectedTemplate(template);
        form.setFieldsValue(template);
        if (template.channel === "VOICE_CALL") {
          setMessages(JSON.parse(template.message));
        }
        setLoading(false);
      })
      .catch((error: Error) => {
        setLoading(false);
        console.log({ location: "getTemplatesById", error });
      });
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
        onCloseModal();
        setLoading(false);
      })
      .catch((error: Error) => {
        setLoading(false);
        console.log({ location: "deleteTemplate", error });
      });
  };

  const onSubmit = (values: any) => {
    console.log(values);
    if (values.channel === "VOICE_CALL" && !Object.values(messages).length) {
      setMessageError("Please add message!");
      console.log({ messages });
      return;
    }
    if (Object.values(messages).find((item: any) => !item.value)) {
      setIsError(true);
      console.log({ messages: true });
      return;
    }
    setMessageError("");
    setIsError(false);
    let message = values.message;
    if (values.channel === "VOICE_CALL") {
      message = getFormattedMessage(JSON.stringify(messages), values.channel);
    }

    if (action === "ADD") {
      createTemplates({
        ...values,
        message,
      });
    } else if (action === "EDIT") {
      updateTemplate({
        ...selectedTemplate,
        ...values,
        message,
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
        <AttachmentDragger
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

  const onCloseModal = () => {
    setIsDeleteConfirmation(false);
  };

  return (
    <div className="template-management__container">
      <Modal
        title={<Title level={5}>Delete Confirmation</Title>}
        open={isDeleteConfirmation}
        onOk={onDeleteConfirm}
        onCancel={onCloseModal}
        okText="Yes"
        cancelText="No"
        okType="danger"
        classNames={modalClassNames(styles)}
        styles={modalStyles(token) as any}
      >
        <img src={imageUrl as any} width={"100%"} alt="" />
        <Text italic style={{ textAlign: "center" }}>
          Once deleted it cannot be undo
        </Text>
      </Modal>
      <Row gutter={[16, 16]} className="header__row">
        <Col flex={12}>
          <Row className="header__container">
            {action && action !== "DELETE" ? (
              <Col {...colOption(3)} className="back-icon__container">
                <Button
                  size="large"
                  type="text"
                  onClick={onCancel}
                  icon={
                    <FontAwesomeIcon icon={faArrowLeft} className="back-icon" />
                  }
                >
                  back
                </Button>
              </Col>
            ) : (
              <Col {...colOption(21)}>
                <Button
                  type="primary"
                  onClick={() => {
                    setSearchParams({
                      action: PAGE_ACTION.ADD,
                    });
                  }}
                >
                  Create Template
                </Button>
              </Col>
            )}
            {action === "VIEW" && (
              <Col {...colOption(21)}>
                <div style={{ float: "right" }}>
                  <Button
                    type="primary"
                    onClick={() => {
                      setSearchParams({
                        id: selectedTemplate.id as string,
                        action: PAGE_ACTION.EDIT,
                      });
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    danger
                    onClick={() => {
                      onDeleteSelect(selectedTemplate);
                    }}
                    style={{ marginLeft: ".5rem" }}
                  >
                    Delete
                  </Button>
                </div>
              </Col>
            )}
          </Row>
        </Col>
      </Row>

      {(!action || action === "DELETE") && (
        <Row gutter={[16, 16]}>
          {templates.length ? (
            templates.map((template) => (
              <Col span={screen === "MOBILE" ? 24 : 8} key={template.id}>
                <TemplateCard
                  template={template}
                  menuItems={getMenuItems(template)}
                  onClick={() => onViewSelect(template)}
                />
              </Col>
            ))
          ) : (
            <EmptyData
              onClickAction={() => {
                setSearchParams({
                  action: PAGE_ACTION.ADD,
                });
              }}
              image={NoTemplate}
              description="No template to show"
              buttonText="Create Template"
            />
          )}
        </Row>
      )}
      {(action === "ADD" || action === "EDIT") && (
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
              options={CHANNEL_OPTIONS}
              optionType="button"
              buttonStyle="solid"
              onChange={(e) => {
                handleFormChange("channel", e.target.value);
              }}
            />
          </Form.Item>

          {form.getFieldValue("channel") && (
            <Form.Item
              label="Enter template name"
              name="name"
              rules={[
                { required: true, message: "Please input your template name" },
              ]}
            >
              <Input size="large" />
            </Form.Item>
          )}

          {form.getFieldValue("channel") === "WHATSAPP" && (
            <Form.Item
              label="Enter message"
              name="message"
              rules={[{ required: true, message: "Please input your message" }]}
            >
              <RichTextEditor {...richTextProps} />
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
                style={{ padding: "30px 0px" }}
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
                // disabled={action === "VIEW"}
              />
            </Form.Item>
          ) : null}
          {(action === "ADD" || action === "EDIT") && (
            <Form.Item>
              <Button type="primary" htmlType="submit">
                {action === "ADD" ? "Create" : "Update"}
              </Button>
              <Button
                type="default"
                style={{ marginLeft: ".5rem" }}
                onClick={onCancel}
              >
                Cancel
              </Button>
            </Form.Item>
          )}
        </Form>
      )}
      {action === "VIEW" && <PreviewTemplate {...selectedTemplate} />}
    </div>
  );
};
