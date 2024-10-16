import {
  AppstoreOutlined,
  BarsOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import {
  Alert,
  Badge,
  Button,
  Col,
  Collapse,
  FloatButton,
  Form,
  Input,
  MenuProps,
  Modal,
  Radio,
  Row,
  Segmented,
  Select,
  Space,
  Typography,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { UploadChangeParam, UploadFile } from "antd/es/upload";
import React, { Dispatch } from "react";
import { API } from "../../api";
import { TemplateCard } from "../../components/templateCard";
import {
  TEMPLATE_CHANNEL_OPTIONS,
  EVENT_STATUS,
  LOCAL_STORAGE_VIEW,
  PAGE_ACTION,
  TEMPLATE_BUTTONS,
  TEMPLATE_URL_PATH_ACTION,
  TEMPLATE_ACTION_TAB,
  ROUTES_URL,
  NO_PLAN_ASSIGNED_MESSAGE,
} from "../../constants";
import { useBearStore } from "../../store";
import { EventTypeType, TemplateAdminType, TemplateType } from "../../types";
import { v4 as uuidv4 } from "uuid";
import "./styles.scss";
import { PreviewTemplate } from "../../components/previewTemplate";
import {
  getFileList,
  getFormattedMessage,
  urlHandler,
} from "../../utils/common.utils";
import { AttachmentDragger } from "../../components/AttachmentDragger";
import { useTheme } from "antd-style";
import {
  modalClassNames,
  modalStyles,
  useModalStyle,
} from "../../configs/antd.config";
import { EmptyData } from "../../components/EmptyData";
import NoTemplate from "../../assets/svg/no-template.svg";
import { useNavigate, useSearchParams } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { AudioRecorder } from "../../components/audioRecorder";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import StopIcon from "@mui/icons-material/Stop";
import { templateColumns } from "./config";
import { SORT_KEYS, TEMPLATE_COLUMN_KEYS } from "./constant";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { DataTable } from "../../components/dataTable";
import { searchGrid } from "../../utils/searchGrid.utils";
import { ReviewConversation } from "../../components/ReviewConversation";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import { useWindowSize } from "../../hooks/useWindowSize";
const { Panel } = Collapse;

const imageUrl = new URL(`../../assets/svg/trash-event.svg`, import.meta.url);

const { Title, Text, Paragraph, Link } = Typography;
const { Search } = Input;

export const TemplateManagement = (): React.ReactElement => {
  const [form] = Form.useForm();
  const { styles } = useModalStyle();
  const token = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  const { setLoading, screen, isLoading } = useBearStore.appStore();
  const { user, activePlan } = useBearStore.userStore();
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
  const { eventTypes } = useBearStore.eventStore();

  let filteredGrid: any[] = [];
  const [searchValue, setSearchValue] = React.useState("");
  const [appealComments, setAppealComments] = React.useState("");
  const [messages, setMessages]: [any, Dispatch<any>] = React.useState({});
  const [tab, setTab] = React.useState(TEMPLATE_URL_PATH_ACTION.USER);
  const [isError, setIsError]: [boolean, Dispatch<any>] = React.useState(false);
  const [isSubmitConfirmation, setIsSubmitConfirmation] =
    React.useState<boolean>(false);
  const [isDeleteConfirmation, setIsDeleteConfirmation]: [
    boolean,
    Dispatch<any>
  ] = React.useState(false);
  const [isAppealActionDialogOpen, setIsAppealActionDialogOpen]: [
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
  const { height } = useWindowSize();

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
    // Pause the current utterance
    window?.speechSynthesis?.cancel();
    console.log("Speech stopped");
    setSpeechStatus({ id: "", status: "" });
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
        message: {},
        name: "",
        id: "",
      });
      form.resetFields();
    }
    console.log({ action, TEMPLATE_CHANNEL_OPTIONS });
    if (action === "ADD" && TEMPLATE_CHANNEL_OPTIONS.length === 1) {
      form.setFieldValue("channel", TEMPLATE_CHANNEL_OPTIONS[0].value);
    }
  }, [action, form]);

  React.useEffect(() => {
    urlHandler(searchParams, setAction, getTemplatesById, getTemplates);
  }, [searchParams]);

  React.useEffect(() => {
    getTemplates();
  }, [tab]);

  React.useEffect(() => {
    setIsListView(localStorage.getItem(LOCAL_STORAGE_VIEW.TEMPLATE) === "List");
    return () => {
      setAction("");
      setMessageError("");
      setIsError(false);
      setTemplates([]);
      stopSpeech();
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
      _blob.filename = "Record.mp3";
      setLoading(true);
      API.commonAPI
        .uploadFile(blob, "record")
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

  const onCancel = (isClearAction = false) => {
    setIsAppealActionDialogOpen(false);
    setMessageError("");
    setIsError(false);
    stopSpeech();
    setMessages({});
    if (isClearAction) {
      setSearchParams({ creation: "DONE" });
    } else {
      setSearchParams({});
    }
    onCloseModal();
  };

  const getMenuItems = (data: TemplateType): MenuProps["items"] => [
    {
      label: "View",
      key: "view",
      onClick: () => onViewSelect(data),
      icon: <EyeOutlined />,
    },
    ...(tab === TEMPLATE_URL_PATH_ACTION.STANDARD
      ? []
      : data.approvalStatus !== EVENT_STATUS.APPROVED
      ? [
          {
            label: "Edit",
            key: "edit",
            onClick: () => onEditSelect(data),
            icon: <EditOutlined />,
          },
        ]
      : []),
    ...(tab !== TEMPLATE_URL_PATH_ACTION.STANDARD
      ? [
          {
            label: "Delete",
            key: "delete",
            onClick: () => onDeleteSelect(data),
            icon: <DeleteOutlined />,
          },
        ]
      : []),
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

        if (template.channel === "VOICE_CALL") {
          setMessages(template.message);
          form.setFieldsValue(template);
        } else if (
          template.channel === "SMS" ||
          template.channel === "WHATSAPP"
        ) {
          form.setFieldsValue({ ...template, message: template.message.text });
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
      .getTemplate(tab)
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
        onCancel(true);
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

  const onValidateForm = () => {
    const values: any = form.getFieldsValue();
    console.log(values);
    if (values.channel === "VOICE_CALL" && !Object.values(messages).length) {
      setMessageError("Please add text message. record/upload audio!");
      console.log({ messages });
      return;
    }
    if (Object.values(messages).find((item: any) => !item.value)) {
      setIsError(true);
      setMessageError("Please add text message. record/upload audio!");
      console.log({ messages: true });
      return;
    }
    setMessageError("");
    setIsError(false);
    setIsSubmitConfirmation(true);
  };

  const onSubmit = () => {
    const values: any = form.getFieldsValue();
    let message = values.message;
    if (values.channel === "VOICE_CALL") {
      message = getFormattedMessage(messages, values.channel);
    } else if (values.channel === "SMS" || values.channel === "WHATSAPP") {
      message = {
        text: message,
      };
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

  const reAppealActionCall = (payload: TemplateAdminType): any => {
    setLoading(true);
    API.templateManagement
      .reAppealTemplate(payload)
      .then((response) => {
        setLoading(false);
        setIsAppealActionDialogOpen(false);
        setAppealComments("");
        getTemplatesById(selectedTemplate.id);
      })
      .catch((error: Error) => {
        setLoading(false);
        console.log({ location: "adminTemplateAction", error });
      });
  };

  const onDeleteConfirm = () => {
    const { id } = selectedTemplate;
    deleteTemplate(id as string);
  };

  const onAppealAction = () => {
    reAppealActionCall({ comment: appealComments, id: selectedTemplate.id });
  };

  const handleFormChange = (key: string, value: any) => {
    setSelectedTemplate({ ...selectedTemplate, [key]: value });
  };

  templateColumns.forEach((column) => {
    if (column.key === TEMPLATE_COLUMN_KEYS.ACTION) {
      column.render = (record) => (
        <Space>
          {tab === TEMPLATE_URL_PATH_ACTION.STANDARD ? (
            <></>
          ) : record.approvalStatus !== EVENT_STATUS.APPROVED ? (
            <EditOutlinedIcon
              fontSize="inherit"
              onClick={() => {
                onEditSelect(record);
              }}
              style={{ color: "rgb(102, 112, 133)", cursor: "pointer" }}
            />
          ) : null}
          <VisibilityIcon
            fontSize="inherit"
            onClick={() => {
              onViewSelect(record);
            }}
            style={{ color: "rgb(102, 112, 133)", cursor: "pointer" }}
          />
        </Space>
      );
    } else if (column.key === TEMPLATE_COLUMN_KEYS.NAME) {
      column.render = (record) => (
        <Text
          style={{ cursor: "pointer" }}
          onClick={() => {
            onViewSelect(record);
          }}
        >
          {record.name}
        </Text>
      );
    }
  });

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
    setIsSubmitConfirmation(false);
  };

  const onSearch = (searchValue: string) => {
    console.log({ searchValue });
    setSearchValue(searchValue);
  };

  if (searchValue) {
    console.log({ searchValue });
    filteredGrid = searchGrid(searchValue, templates);
    console.log({ filteredGrid });
  }

  return (
    <div className="template-management__container">
      <Modal
        title={<>Re - Appeal template ?</>}
        open={!!isAppealActionDialogOpen}
        onOk={onAppealAction}
        onCancel={() => setIsAppealActionDialogOpen(false)}
        okText="Yes"
        cancelText="No"
        okType={"primary"}
        classNames={modalClassNames(styles)}
        styles={modalStyles(token) as any}
        width={screen === "MOBILE" ? "100%" : "50%"}
      >
        <Space direction="vertical" size="small" style={{ width: "100%" }}>
          <Collapse>
            <Panel header={<b>Conversation History</b>} key="1">
              <ReviewConversation
                comments={selectedTemplate.comments}
                loggedInUserId={user.userId}
              />
            </Panel>
          </Collapse>
          <TextArea
            showCount
            maxLength={150}
            value={appealComments}
            status={!appealComments ? "error" : ""}
            onChange={(e) => {
              setAppealComments(e.target.value);
            }}
            rows={3}
            placeholder="Comments"
            style={{ marginBottom: "10px" }}
          />
        </Space>
      </Modal>

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
        confirmLoading={isLoading}
      >
        <img loading="lazy" src={imageUrl as any} width={"100%"} alt="" />
        <Text italic style={{ textAlign: "center" }}>
          Once deleted it cannot be undo
        </Text>
      </Modal>

      <Modal
        title={<Title level={5}>Confirmation</Title>}
        open={isSubmitConfirmation}
        onOk={onSubmit}
        onCancel={onCloseModal}
        okText="Yes"
        cancelText="No"
        // okType="danger"
        classNames={modalClassNames(styles)}
        styles={modalStyles(token) as any}
        confirmLoading={isLoading}
      >
        {/* <img loading="lazy" src={imageUrl as any} width={"100%"} alt="" /> */}
        <Text italic style={{ textAlign: "center" }}>
          Upon confirmation, the message will be sent for review. Once approved,
          you can utilize this message for sending.
        </Text>
      </Modal>
      <Row gutter={[16, 16]} className="header__row sticky-header">
        <Col flex={12}>
          <Row className="header__container">
            {action && action !== "DELETE" ? (
              <Col {...colOption(3)} className="back-icon__container">
                <Button
                  type="text"
                  onClick={() => {
                    onCancel();
                  }}
                  icon={<KeyboardBackspaceIcon className="back-icon" />}
                >
                  back
                </Button>
              </Col>
            ) : (
              <Col {...colOption(24)}>
                <Row wrap gutter={[8, 8]}>
                  <Col flex={12}>
                    <Title level={3}> Template</Title>
                  </Col>
                </Row>
                <Row wrap gutter={[8, 8]}>
                  <Col flex={12} className="template__pagination">
                    <Segmented
                      style={{ float: "left" }}
                      options={TEMPLATE_ACTION_TAB}
                      onChange={(tab) => {
                        setTab(tab);
                      }}
                    />
                  </Col>
                  <Col flex={12} className="template__pagination">
                    {screen !== "MOBILE" &&
                      (activePlan?.templateCount as number) > 0 && (
                        <Button
                          type="primary"
                          onClick={() => {
                            setSearchParams({
                              action: PAGE_ACTION.ADD,
                            });
                          }}
                        >
                          Create
                        </Button>
                      )}
                    <Segmented
                      style={{ margin: "10px" }}
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
                          LOCAL_STORAGE_VIEW.TEMPLATE,
                          value.toString()
                        );
                        setIsListView(value === "List");
                      }}
                    />
                  </Col>
                </Row>
                <Row></Row>
              </Col>
            )}

            {action === "VIEW" && (
              <Col {...colOption(21)}>
                <div style={{ float: "right" }}>
                  {selectedTemplate.approvalStatus !==
                    EVENT_STATUS.APPROVED && (
                    <>
                      {selectedTemplate.approvalStatus ===
                        EVENT_STATUS.REJECTED && (
                        <Button
                          type="dashed"
                          onClick={() => {
                            setIsAppealActionDialogOpen(true);
                          }}
                        >
                          Re-Appeal
                        </Button>
                      )}
                      <Button
                        type="primary"
                        style={{ marginLeft: ".5rem" }}
                        onClick={() => {
                          setSearchParams({
                            id: selectedTemplate.id as string,
                            action: PAGE_ACTION.EDIT,
                          });
                        }}
                      >
                        Edit
                      </Button>
                    </>
                  )}
                  {tab === TEMPLATE_URL_PATH_ACTION.USER && (
                    <Button
                      danger
                      onClick={() => {
                        onDeleteSelect(selectedTemplate);
                      }}
                      style={{ marginLeft: ".5rem" }}
                    >
                      Delete
                    </Button>
                  )}
                </div>
              </Col>
            )}
            {(action === "ADD" || action === "EDIT") && screen !== "MOBILE" && (
              <Col {...colOption(21)}>
                <Space style={{ float: "right" }}>
                  <Button
                    type="primary"
                    onClick={() => {
                      form.submit();
                    }}
                  >
                    {action === "ADD" ? "Create" : "Save Changes"}
                  </Button>
                  <Button
                    type="default"
                    style={{ marginLeft: ".5rem" }}
                    onClick={() => onCancel()}
                  >
                    Cancel
                  </Button>
                </Space>
              </Col>
            )}
          </Row>
        </Col>
      </Row>

      {!action && (
        <Row gutter={[8, 8]} className="margin-bottom-16">
          <Col {...colOption(12)}>
            {templates?.length ? (
              <Search
                placeholder="Search here"
                value={searchValue}
                onChange={(e) => onSearch(e.target.value)}
                style={{ width: "100%" }}
                allowClear
              />
            ) : null}
          </Col>
          <Col {...colOption(12)}>
            {searchValue ? (
              <Text italic className="float-right">
                Showing <Text strong>{filteredGrid.length}</Text> of{" "}
                <Text strong>{templates?.length}</Text> template's
              </Text>
            ) : (
              <Text italic className="float-right">
                Showing total <Text strong>{templates?.length} </Text>
                template's
              </Text>
            )}
          </Col>
        </Row>
      )}

      <div className="padding-bottom-8">
        <Alert
          message={
            activePlan?.isActive
              ? (activePlan?.templateCount as number) <= 0
                ? `According to your plan, you have successfully created all ${activePlan?.pricingPlan?.templateCount} templates allowed.`
                : `According to your plan, you have currently created ${
                    (activePlan?.pricingPlan?.templateCount as number) -
                    (activePlan?.templateCount as number)
                  } out of ${activePlan?.pricingPlan?.templateCount} templates.`
              : NO_PLAN_ASSIGNED_MESSAGE("template")
          }
          type={activePlan?.isActive ? "info" : "warning"}
          icon={<PriorityHighIcon />}
          showIcon
          closable={activePlan?.isActive}
        />
      </div>

      {tab === TEMPLATE_URL_PATH_ACTION.STANDARD && (
        <div className="padding-bottom-8">
          <Alert
            description="This is a sample template, Some of the information is auto-filled based on the details entered when creating an event"
            type="info"
            showIcon
          />
        </div>
      )}

      {(!action || action === "DELETE") && (
        <Row gutter={[16, 16]}>
          {(searchValue ? filteredGrid : templates).length ? (
            isListView ? (
              <DataTable
                columns={templateColumns}
                data={searchValue ? filteredGrid : templates}
                sortKeys={SORT_KEYS}
              />
            ) : (
              (searchValue ? filteredGrid : templates).map((template) => (
                <Col span={screen === "MOBILE" ? 24 : 8} key={template.id}>
                  <TemplateCard
                    template={template}
                    menuItems={getMenuItems(template)}
                    onClick={() => onViewSelect(template)}
                  />
                </Col>
              ))
            )
          ) : (
            <EmptyData
              onClickAction={() => {
                setSearchParams({
                  action: PAGE_ACTION.ADD,
                });
              }}
              image={NoTemplate}
              description="No template to show"
              buttonText={
                (activePlan?.templateCount as number) > 0 ? "Create" : undefined
              }
            />
          )}
        </Row>
      )}
      {(action === "ADD" || action === "EDIT") && (
        <Form
          layout="vertical"
          onFinish={onValidateForm}
          form={form}
          name="template"
          scrollToFirstError
          style={{ minHeight: height }}
        >
          <Form.Item
            label="Select the channel"
            name="channel"
            rules={[
              { required: true, message: "Please select event channel!" },
            ]}
          >
            <Radio.Group
              options={TEMPLATE_CHANNEL_OPTIONS}
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
          <Form.Item
            label="Select Event"
            name="type"
            rules={[
              { required: true, message: "Please select template event type" },
            ]}
          >
            <Select
              style={{ width: "100%" }}
              allowClear
              placeholder="Select a event"
              optionFilterProp="children"
              options={eventTypes}
            />
          </Form.Item>
          {/* {form.getFieldValue("channel") === "WHATSAPP" && (
            <Form.Item
              label="Enter message"
              name="message"
              rules={[{ required: true, message: "Please input your message" }]}
            >
              <WhatsappEditor message={selectedTemplate.message} />
            </Form.Item>
          )} */}
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

          {form.getFieldValue("channel") === "SMS" ||
          form.getFieldValue("channel") === "WHATSAPP" ? (
            <Form.Item
              label="Enter message"
              name="message"
              rules={[{ required: true, message: "Please input your message" }]}
            >
              <TextArea style={{ minHeight: "40vh" }} />
            </Form.Item>
          ) : null}
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
      {!action &&
        screen === "MOBILE" &&
        (activePlan?.templateCount as number) > 0 && (
          <FloatButton
            shape="square"
            style={{ right: 24 }}
            icon={
              <Button
                size="large"
                type="primary"
                onClick={() => {
                  setSearchParams({
                    action: PAGE_ACTION.ADD,
                  });
                }}
              >
                Create Template
              </Button>
            }
          />
        )}

      {(action === "ADD" || action === "EDIT") && screen === "MOBILE" && (
        <Space
          direction="vertical"
          style={{ width: "100%" }}
          className="eazy-event__bottom-fixed-btn"
        >
          <Button type="default" onClick={() => onCancel()}>
            Cancel
          </Button>
          <Button
            type="primary"
            onClick={() => {
              form.submit();
            }}
          >
            {action === "ADD" ? "Create" : "Save Changes"}
          </Button>
        </Space>
      )}
    </div>
  );
};
