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
  TEMPLATE_BUTTONS,
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
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { AudioRecorder } from "../../components/audioRecorder";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import StopIcon from "@mui/icons-material/Stop";

const imageUrl = new URL(`../../assets/svg/trash-event.svg`, import.meta.url);

const eventTypeOptions = Object.keys(EVENT_TYPE_PROPS).map((event: string) => ({
  label: EVENT_TYPE_PROPS[event].label,
  value: event,
}));

const { Title, Text, Paragraph } = Typography;

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
  const [speechMsg, setSpeechMsg]: [
    SpeechSynthesisUtterance | undefined,
    Dispatch<any>
  ] = React.useState();
  const [speechStatus, setSpeechStatus] = React.useState({
    id: "",
    status: "",
  });

  const playSpeech = (text: string, id: string) => {
    stopSpeech();
    const msg = new SpeechSynthesisUtterance();
    msg.text = text;
    const voices = window.speechSynthesis.getVoices();
    msg.voice = voices[0]; // Use the first available voice
    msg.onend = function () {
      console.log("Speech finished");
      setSpeechMsg(undefined);
      setSpeechStatus({ id: "", status: "ENDED" });
    };
    console.log({ text });
    window.speechSynthesis.speak(msg);
    setSpeechMsg(msg);
    if (speechStatus.status === "PLAYING") {
      setSpeechStatus({ id: "", status: "" });
    } else {
      setSpeechStatus({ id, status: "PLAYING" });
    }
  };

  const stopSpeech = () => {
    if (speechMsg) {
      // Pause the current utterance
      window.speechSynthesis.cancel();
      console.log("Speech stopped");
      setSpeechStatus({ id: "", status: "" });
    }
  };

  const resumeSpeech = () => {
    if (speechMsg) {
      // Pause the current utterance
      window.speechSynthesis.resume();
      setSpeechStatus({ ...speechStatus, status: "PLAYING" });
    }
  };

  const pauseSpeech = () => {
    if (speechMsg) {
      // Pause the current utterance
      window.speechSynthesis.pause();
      setSpeechStatus({ ...speechStatus, status: "PAUSED" });
    }
  };

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
    console.log({ file });
    if (file.status === "removed") {
      handleOnChangeFieldVoice(id, "");
    } else if (file?.size && file.size < 5000000) {
      setLoading(true);
      API.commonAPI
        .uploadFile(file, "audio")
        .then((blobId: string) => {
          setLoading(false);
          handleOnChangeFieldVoice(id, blobId, "AUDIO");
        })
        .catch((error: Error) => {
          setLoading(false);
          console.log({ location: "handleFileUpload", error });
        });
    } else {
      console.error("Upload file error", file);
    }
  };

  const handleRecordUpload = async (id: string, blob: Blob): Promise<void> => {
    if (blob?.size && blob.size < 5000000) {
      console.log({ blob });
      const _blob: any = blob;
      _blob.name = "Record.mp3";
      setLoading(true);
      API.commonAPI
        .uploadFile(blob, "audio")
        .then((blobId: string) => {
          setLoading(false);
          handleOnChangeFieldVoice(id, blobId, "AUDIO");
        })
        .catch((error: Error) => {
          setLoading(false);
          console.log({ location: "handleRecordUpload", error });
        });
    } else {
      console.error("Upload file error", blob);
    }
  };

  const onCancel = () => {
    setMessageError("");
    setIsError(false);
    setMessages({});
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
        <Space className="text-message__container">
          <TextArea
            style={{ minHeight: "40vh", width: "100%" }}
            disabled={action === "VIEW"}
            autoSize={{ minRows: 2, maxRows: 20 }}
            value={message.value}
            status={isError && !message.value ? "error" : ""}
            onChange={(e) => {
              handleOnChangeFieldVoice(message.id, e.target.value);
            }}
          />
          {speechStatus.id !== message.id && (
            <PlayArrowIcon
              onClick={() => {
                playSpeech(message.value, message.id);
              }}
            />
          )}

          {speechStatus.id === message.id &&
            speechStatus.status === "PLAYING" && (
              <PauseIcon
                onClick={() => {
                  pauseSpeech();
                }}
              />
            )}

          {speechStatus.id === message.id &&
            speechStatus.status === "PAUSED" && (
              <PlayArrowIcon
                onClick={() => {
                  resumeSpeech();
                }}
              />
            )}

          {speechStatus.id === message.id &&
            (speechStatus.status === "PLAYING" ||
              speechStatus.status === "PAUSED") && (
              <StopIcon
                onClick={() => {
                  stopSpeech();
                }}
              />
            )}
        </Space>
      );
    } else if (message.type === "UPLOAD_AUDIO") {
      return (
        <AttachmentDragger
          otherProps={{ maxCount: 1, fileList: getFileList(message.value) }}
          disabled={action === "VIEW"}
          buttonText="Upload"
          accept="audio/*"
          onAttach={(e) => handleFileUpload(message.id, e)}
        />
      );
    } else if (message.type === "RECORD_AUDIO") {
      return (
        <AudioRecorder
          onUpload={(blob) => handleRecordUpload(message.id, blob)}
        />
      );
    } else if (message.type === "AUDIO") {
      return <audio src={message.value} controls style={{ width: "100%" }} />;
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

  const handleOnChangeFieldVoice = (
    id: string,
    value: string,
    type = "TEXT"
  ) => {
    setMessages({
      ...messages,
      [id]: {
        type,
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
      <Row gutter={[16, 16]} className="header__row sticky-header">
        <Col flex={12}>
          <Row className="header__container">
            {action && action !== "DELETE" ? (
              <Col {...colOption(3)} className="back-icon__container">
                <Button
                  type="text"
                  onClick={onCancel}
                  icon={<KeyboardBackspaceIcon className="back-icon" />}
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
              <Input />
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
              <Paragraph strong style={{}}>
                Message
              </Paragraph>
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
                {TEMPLATE_BUTTONS.map((button) => (
                  <Button
                    type="default"
                    onClick={() => {
                      handleAddFieldVoice(button.key);
                    }}
                    icon={button.icon}
                  >
                    {button.label}
                  </Button>
                ))}
              </Space>
            </>
          )}

          {form.getFieldValue("channel") === "SMS" ? (
            <Form.Item
              label="Enter message"
              name="message"
              rules={[{ required: true, message: "Please input your message" }]}
            >
              <TextArea style={{ minHeight: "40vh" }} />
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
      {action === "VIEW" && (
        <PreviewTemplate
          {...selectedTemplate}
          speechStatus={speechStatus}
          playSpeech={playSpeech}
          pauseSpeech={pauseSpeech}
          resumeSpeech={resumeSpeech}
          stopSpeech={stopSpeech}
        />
      )}
    </div>
  );
};
