import React from "react";
import {
  Col,
  Row,
  Form,
  Button,
  Input,
  DatePicker,
  Select,
  Space,
  Radio,
  Collapse,
  Popover,
  Typography,
  Switch,
  Tag,
  theme,
  Modal,
  Alert,
} from "antd";
import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from "dayjs";
import {
  disabledDate,
  disabledDateTime,
  disabledRangeTime,
} from "../../utils/datePicker.utils";
import {
  COMPONENT_TYPE,
  EVENT_STATUS,
  EVENT_STATUS_LABEL,
  EVENT_STATUS_LABEL_COLOR,
  PRICE_CONFIG,
  ROUTES_URL,
} from "../../constants";
import {
  ActionType,
  EventManagementType,
  EventNotificationType,
} from "../../types";
import { NoData } from "../noData";
import { useWindowSize } from "../../hooks/useWindowSize";
import { useBearStore } from "../../store";
import { AttachmentDragger } from "../AttachmentDragger";
import { eventCreationConfig } from "../../configs/event.config";
import { ViewEventNotification } from "../viewEventNotification";
import { v4 as uuidV4 } from "uuid";
import { EditEventNotification } from "../editEventNotification";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import NotificationAddOutlinedIcon from "@mui/icons-material/NotificationAddOutlined";
import "./styles.scss";
import { PreviewEventNotification } from "../previewEventNotification";
import { PreviewEvent } from "../previewEvent";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { CaretRightOutlined } from "@ant-design/icons";

import {
  modalClassNames,
  modalStyles,
  useModalStyle,
} from "../../configs/antd.config";
import { useTheme } from "antd-style";
import { API } from "../../api";
import { useNavigate } from "react-router-dom";

const { RangePicker } = DatePicker;
dayjs.extend(customParseFormat);
const { Panel } = Collapse;
const { Text, Link } = Typography;

const defaultEventNotification: EventNotificationType = {
  contactDirectory: [],
  messageTemplate: "",
  name: "",
  channel: "",
};

export const EventManagement = (props: EventManagementType) => {
  const { styles } = useModalStyle();
  const tokenModal = useTheme();
  const {
    contactList,
    templates,
    isEdit,
    form,
    onHandleEvent,
    onSearchTemplate,
    isTemplateFetching,
    isContactFetching,
    onSearchContact,
    getContactDirectory,
    getTemplates,
    handleFileUpload,
    handleUpdateEventNotification,
    action,
  } = props;

  const navigate = useNavigate();
  const { screen, setLoading, isLoading } = useBearStore.appStore();
  const { setIsEdit } = useBearStore.eventStore();
  const { user, activePlan } = useBearStore.userStore();
  const [selectedNotification, setSelectedNotification] =
    React.useState<EventNotificationType>(defaultEventNotification);
  const [isPreviewEvent, setPreviewEvent] = React.useState(false);
  const [notificationAction, setNotificationAction] =
    React.useState<ActionType>("");
  const { token } = theme.useToken();
  const invitationAttachment = Form.useWatch("invitationAttachment", {
    form,
    preserve: true,
  });
  const notifications =
    Form.useWatch("notification", {
      form,
      preserve: true,
    }) || [];

  const eventType = Form.useWatch("eventType", {
    form,
    preserve: true,
  });

  let fields: any[] = [];
  if (eventType) {
    fields = eventCreationConfig(screen, form)[eventType];
  }

  const renderFields = (props: any) => {
    switch (props.type) {
      case COMPONENT_TYPE.INPUT_TEXT: {
        return action === "VIEW" ? (
          <Text className="text-view">
            {form.getFieldValue(props.name) || "NA"}
          </Text>
        ) : (
          <Input {...props.fieldProps} />
        );
      }
      case COMPONENT_TYPE.INPUT_URL: {
        return action === "VIEW" ? (
          form.getFieldValue(props.name) ? (
            <a
              target="_blank"
              className="app-link"
              href={form.getFieldValue(props.name)}
            >
              {form.getFieldValue(props.name)}
            </a>
          ) : (
            "NA"
          )
        ) : (
          <Input type="url" {...props.fieldProps} />
        );
      }
      case COMPONENT_TYPE.INPUT_DATETIME_LOCAL:
        return action === "VIEW" ? (
          <Text className="text-view">
            {form.getFieldValue(props.name) || "NA"}
          </Text>
        ) : (
          <Input type="datetime-local" allowClear />
        );
      case COMPONENT_TYPE.RANGE_PICKER:
        return (
          <RangePicker
            disabledDate={disabledDate}
            // disabledTime={disabledRangeTime}
            showTime={{
              hideDisabledOptions: true,
              defaultValue: [dayjs("00:00", "HH:mm"), dayjs("11:59", "HH:mm")],
            }}
            format="DD MMM, YYYY HH:mm"
            style={action !== "VIEW" ? { width: "100%" } : {}}
            disabled={action === "VIEW"}
          />
        );
      case COMPONENT_TYPE.RADIO_GROUP:
        return (
          <Radio.Group
            options={props.options}
            optionType="button"
            buttonStyle="solid"
            onChange={props.onChange}
            disabled={action === "VIEW"}
          />
        );
      case COMPONENT_TYPE.SWITCH:
        return action === "VIEW" ? (
          <Tag color={form.getFieldValue(props.name) ? "success" : "default"}>
            {form.getFieldValue(props.name) ? "Yes" : "No"}
          </Tag>
        ) : (
          <Switch checkedChildren="No" unCheckedChildren="Yes" />
        );

      default:
        return <></>;
    }
  };

  const sendNotificationToOrganiser = (filters = {}): any => {
    setLoading(true);
    API.eventManagement
      .sendNotificationToOrganiser(selectedNotification.id as string)
      .then((status) => {
        setSelectedNotification(defaultEventNotification);
        setNotificationAction("");
        setLoading(false);
      })
      .catch((error: Error) => {
        setLoading(false);
        console.log({ location: "getContactDirectory", error });
      });
  };

  const handleAddNotification = () => {
    const id = uuidV4();

    setSelectedNotification({
      id,
      contactDirectory: [],
      messageTemplate: "",
      name: "",
      channel: "",
      triggerDateTime: "",
      action: "ADD",
    });
    setNotificationAction("ADD");
  };

  const onCancelEdit = () => {
    setSelectedNotification(defaultEventNotification);
    setNotificationAction("");
    setIsEdit(false);
  };

  const onCancelPreview = () => {
    setPreviewEvent(false);
  };

  const handleSubmitNotification = (values: any) => {
    if (action === "ADD") {
      const _notifications: EventNotificationType[] = [
        ...notifications,
        { ...selectedNotification, ...values },
      ];
      form.setFieldValue("notification", _notifications);
    } else if (["EDIT", "VIEW"].includes(action as string)) {
      handleUpdateEventNotification?.({
        notification: [{ ...selectedNotification, ...values }],
      });
    }
    onCancelEdit();
  };

  const handleDeleteEvent = () => {
    if (action === "ADD") {
      const _notifications: EventNotificationType[] = notifications.filter(
        (item: EventNotificationType) => item.id !== selectedNotification.id
      );
      form.setFieldValue("notification", _notifications);
    } else {
      const deleteNotification = notifications.find(
        (item: EventNotificationType) => item.id === selectedNotification.id
      );
      if (deleteNotification)
        handleUpdateEventNotification?.({
          notification: [{ ...deleteNotification, action: "DELETE" }],
        });
    }
    setNotificationAction("");
  };

  const renderNotificationStatus = (notification: EventNotificationType) => {
    return (
      <Tag
        color={
          EVENT_STATUS_LABEL_COLOR[
            EVENT_STATUS_LABEL[notification?.status as string]
          ]
        }
      >
        {EVENT_STATUS_LABEL[notification?.status as string]}
      </Tag>
    );
  };

  const panelStyle: React.CSSProperties = {
    marginBottom: 8,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: "none",
  };

  const channelPriceMap: any = activePlan?.pricingPlan;
  return (
    <div className="event-creation__container">
      <Modal
        open={notificationAction === "SEND"}
        title={"Send Notification to me"}
        okText={
          (activePlan?.notificationCredit as number) >=
          channelPriceMap[
            PRICE_CONFIG[selectedNotification.channel as string]
          ] ? (
            "Send"
          ) : (
            <></>
          )
        }
        cancelText="Cancel"
        onOk={sendNotificationToOrganiser}
        classNames={modalClassNames(styles)}
        styles={modalStyles(tokenModal) as any}
        onCancel={() => {
          setNotificationAction("");
        }}
        confirmLoading={isLoading}
      >
        <Alert
          message={
            (activePlan?.notificationCredit as number) >=
            channelPriceMap[
              PRICE_CONFIG[selectedNotification.channel as string]
            ]
              ? `You will be charged ${
                  channelPriceMap[
                    PRICE_CONFIG[selectedNotification.channel as string]
                  ]
                } credit for this notification`
              : `You don't have enough credit to send this notification. Credit required: ${
                  channelPriceMap[
                    PRICE_CONFIG[selectedNotification.channel as string]
                  ]
                }`
          }
          type={
            (activePlan?.notificationCredit as number) >=
            channelPriceMap[
              PRICE_CONFIG[selectedNotification.channel as string]
            ]
              ? "info"
              : "error"
          }
        />
      </Modal>
      <EditEventNotification
        {...selectedNotification}
        contactList={contactList}
        templates={templates}
        isTemplateFetching={isTemplateFetching}
        onSearchTemplate={onSearchTemplate}
        isContactFetching={isContactFetching}
        onSearchContact={onSearchContact}
        isEdit={notificationAction === "EDIT" || notificationAction === "ADD"}
        getContactDirectory={getContactDirectory}
        getTemplates={getTemplates}
        onCancelEdit={onCancelEdit}
        handleSubmit={handleSubmitNotification}
        action={notificationAction}
      />
      <PreviewEventNotification
        previewOpen={notificationAction === "VIEW"}
        notification={selectedNotification}
        setPreviewClose={onCancelEdit}
      />

      <PreviewEvent
        previewOpen={isPreviewEvent}
        setPreviewClose={onCancelPreview}
      />
      <Row>
        <Col flex={24}>
          <Form
            layout="vertical"
            form={form}
            onFinish={onHandleEvent}
            className={action === "VIEW" ? "view-mode" : "edit-mode"}
          >
            {fields.map((field) => (
              <Form.Item
                label={field.label}
                name={field.name}
                rules={field.rules}
              >
                {renderFields(field)}
              </Form.Item>
            ))}

            <Form.Item
              label="Select contact directory"
              name="contactDirectory"
              rules={[
                {
                  required: true,
                  message: "Please choose contact directory!",
                },
              ]}
              extra={
                action === "VIEW" && (
                  <Button
                    type="link"
                    onClick={() => {
                      setPreviewEvent(true);
                    }}
                    className="app-link"
                    icon={<OpenInNewIcon fontSize="inherit" />}
                  >
                    View contacts
                  </Button>
                )
              }
            >
              <Select
                placeholder="Select the contact directory"
                allowClear
                showSearch
                mode="multiple"
                disabled={action === "VIEW"}
                options={contactList?.map((contact) => ({
                  label: contact.name,
                  value: contact.id,
                }))}
                onFocus={() => {
                  getContactDirectory();
                }}
                loading={isContactFetching}
                onSearch={onSearchContact}
                filterOption={false}
                notFoundContent={
                  <NoData
                    description={
                      <>
                        No Contact, Click{" "}
                        <a
                          href={`${ROUTES_URL.EE}/${ROUTES_URL.CONTACT_MANAGEMENT}`}
                          target="_blank"
                        >
                          here
                        </a>{" "}
                        to create
                      </>
                    }
                  />
                }
              />
            </Form.Item>
            <Form.Item
              label="Invitation Attachment"
              name="invitationAttachment"
            >
              {action === "VIEW" && !invitationAttachment?.length ? (
                "NA"
              ) : (
                <AttachmentDragger
                  buttonText="Upload Attachment"
                  isPreview
                  disabled={action === "VIEW"}
                  otherProps={{
                    fileList: invitationAttachment,
                  }}
                  accept="image/*,application/pdf"
                  onAttach={(e) => handleFileUpload?.(e)}
                />
              )}
            </Form.Item>

            <Form.Item label="Notification" name="notification">
              {user.walletIsTrial && notifications?.length && (
                <Alert
                  style={{ padding: "8px", margin: "0px 0px 8px 0px" }}
                  type="warning"
                  message={
                    <Text>
                      <Text strong>Upgrade Alert: </Text> Your account is in
                      trial mode. Please{" "}
                      <Link
                        className="app-link"
                        onClick={() => {
                          navigate(`${ROUTES_URL.EE}/${ROUTES_URL.WALLET}`);
                        }}
                      >
                        click here
                      </Link>{" "}
                      add credits to your wallet to continue sending below
                      notifications and unlock premium features.
                    </Text>
                  }
                />
              )}
              {notifications?.map((notification: EventNotificationType) => (
                <Space
                  key={notification.id}
                  direction="vertical"
                  style={{ width: "100%", marginBottom: "8px" }}
                >
                  <Collapse
                    style={panelStyle}
                    expandIcon={({ isActive }) => (
                      <CaretRightOutlined rotate={isActive ? 90 : 0} />
                    )}
                    className="notification-collapse"
                  >
                    <Panel
                      header={`${notification.name || "New"}`}
                      key="1"
                      collapsible="icon"
                      className={`notification-collapse-${notification.status?.toLowerCase()}`}
                      extra={
                        <Row>
                          <Col flex={12}>
                            {renderNotificationStatus(notification)}
                          </Col>
                          <Col flex={12}>
                            <Popover
                              content={
                                <>
                                  <Button
                                    type="link"
                                    onClick={handleDeleteEvent}
                                  >
                                    Yes
                                  </Button>{" "}
                                  <Button
                                    type="text"
                                    onClick={() => {
                                      setNotificationAction("");
                                    }}
                                  >
                                    No
                                  </Button>
                                </>
                              }
                              title="Delete Notification"
                              trigger="click"
                              open={
                                notificationAction === "DELETE" &&
                                notification.id === selectedNotification.id
                              }
                              onOpenChange={() => {
                                setSelectedNotification({
                                  ...notification,
                                  action: "DELETE",
                                });
                                setNotificationAction("DELETE");
                              }}
                            >
                              {notification.isDeleteAllowed && (
                                <DeleteOutlineOutlinedIcon
                                  fontSize="small"
                                  className="cursor-pointer margin-right-8"
                                  onClick={(event) => event.stopPropagation()}
                                />
                              )}
                            </Popover>
                            {notification.isEditAllowed && (
                              <EditNoteIcon
                                fontSize="small"
                                className="cursor-pointer margin-right-8"
                                onClick={(event) => {
                                  // If you don't want click extra trigger collapse, you can prevent this:
                                  setSelectedNotification({
                                    ...notification,
                                    action: "EDIT",
                                  });
                                  setNotificationAction("EDIT");
                                  event.stopPropagation();
                                }}
                              />
                            )}
                            <OpenInNewIcon
                              fontSize="small"
                              className="cursor-pointer margin-right-8"
                              onClick={() => {
                                setNotificationAction("VIEW");
                                setSelectedNotification(notification);
                              }}
                            />
                          </Col>
                        </Row>
                      }
                    >
                      <ViewEventNotification
                        {...notification}
                        contactList={contactList}
                        templates={templates}
                        isTemplateFetching={isTemplateFetching}
                        onSearchTemplate={onSearchTemplate}
                        isContactFetching={isContactFetching}
                        onSearchContact={onSearchContact}
                        getContactDirectory={getContactDirectory}
                        getTemplates={getTemplates}
                        viewNotification={() => {
                          setNotificationAction("VIEW");
                          setSelectedNotification(notification);
                        }}
                        sendNotification={() => {
                          setSelectedNotification(notification);
                          setNotificationAction("SEND");
                        }}
                      />
                    </Panel>
                  </Collapse>
                </Space>
              ))}
              {(activePlan?.notificationCredit as number) > 0 ? (
                <Button
                  icon={<NotificationAddOutlinedIcon fontSize="inherit" />}
                  onClick={handleAddNotification}
                >
                  Add Notification
                </Button>
              ) : (
                <Alert
                  message={`You do not have sufficient notification credits available with your current plan to create notifications.`}
                  type="error"
                  showIcon
                />
              )}
            </Form.Item>
            {["EDIT", "ADD"].includes(action as string) && (
              <Form.Item>
                <Space>
                  <Button type="primary" htmlType="submit">
                    {isEdit ? "Update" : "Create"} Event
                  </Button>
                </Space>
              </Form.Item>
            )}
          </Form>
        </Col>
      </Row>
    </div>
  );
};
