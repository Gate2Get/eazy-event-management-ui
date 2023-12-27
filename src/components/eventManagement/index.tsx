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
} from "antd";
import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from "dayjs";
import {
  disabledDate,
  disabledDateTime,
  disabledRangeTime,
} from "../../utils/datePicker.utils";
import { COMPONENT_TYPE, ROUTES_URL } from "../../constants";
import { EventManagementType, EventNotificationType } from "../../types";
import { NoData } from "../noData";
import { useWindowSize } from "../../hooks/useWindowSize";
import { useBearStore } from "../../store";
import { AttachmentDragger } from "../AttachmentDragger";
import { eventCreationConfig } from "../../configs/event.config";
import { ViewEventNotification } from "../viewEventNotification";
import { v4 as uuidV4 } from "uuid";
import { EditEventNotification } from "../editEventNotification";
import EditNotificationsOutlinedIcon from "@mui/icons-material/EditNotificationsOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import NotificationAddOutlinedIcon from "@mui/icons-material/NotificationAddOutlined";
import "./styles.scss";

const { RangePicker } = DatePicker;
dayjs.extend(customParseFormat);
const { Panel } = Collapse;
const { Text } = Typography;

const defaultEventNotification: EventNotificationType = {
  contactDirectory: [],
  messageTemplate: "",
  name: "",
  channel: "",
};

export const EventManagement = (props: EventManagementType) => {
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

  const { width } = useWindowSize();
  const { screen } = useBearStore.appStore();
  const [selectedNotification, setSelectedNotification] =
    React.useState<EventNotificationType>(defaultEventNotification);
  const [deleteNotificationId, setDeleteNotificationId] = React.useState("");

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
          <Text className="text-view">
            {form.getFieldValue(props.name) || "NA"}
          </Text>
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
            disabledTime={disabledRangeTime}
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

      default:
        return <></>;
    }
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
  };

  const onCancelEdit = () => {
    setSelectedNotification(defaultEventNotification);
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
        (item: EventNotificationType) => item.id !== deleteNotificationId
      );
      form.setFieldValue("notification", _notifications);
    } else {
      const deleteNotification = notifications.find(
        (item: EventNotificationType) => item.id === deleteNotificationId
      );
      if (deleteNotification)
        handleUpdateEventNotification?.({
          notification: [{ ...deleteNotification, action: "DELETE" }],
        });
    }
    setDeleteNotificationId("");
  };

  return (
    <div className="event-creation__container">
      <EditEventNotification
        {...selectedNotification}
        contactList={contactList}
        templates={templates}
        isTemplateFetching={isTemplateFetching}
        onSearchTemplate={onSearchTemplate}
        isContactFetching={isContactFetching}
        onSearchContact={onSearchContact}
        isEdit={!!selectedNotification.id}
        getContactDirectory={getContactDirectory}
        getTemplates={getTemplates}
        onCancelEdit={onCancelEdit}
        handleSubmit={handleSubmitNotification}
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
            </Form.Item>
            <Form.Item label="Notification" name="notification">
              {notifications?.map((notification: EventNotificationType) => (
                <Space
                  direction="vertical"
                  style={{ width: "100%", marginBottom: "8px" }}
                >
                  <Collapse>
                    <Panel
                      header={`${notification.name || "New"}`}
                      key="1"
                      extra={
                        <>
                          <Popover
                            content={
                              <>
                                <Button type="link" onClick={handleDeleteEvent}>
                                  Yes
                                </Button>{" "}
                                <Button
                                  type="text"
                                  onClick={() => {
                                    setDeleteNotificationId("");
                                  }}
                                >
                                  No
                                </Button>
                              </>
                            }
                            title="Delete Notification"
                            trigger="click"
                            open={notification.id === deleteNotificationId}
                            onOpenChange={() => {
                              setDeleteNotificationId(
                                notification.id as string
                              );
                            }}
                          >
                            <DeleteOutlineOutlinedIcon
                              fontSize="small"
                              onClick={(event) => event.stopPropagation()}
                            />
                          </Popover>
                          <EditNotificationsOutlinedIcon
                            fontSize="small"
                            onClick={(event) => {
                              // If you don't want click extra trigger collapse, you can prevent this:
                              setSelectedNotification({
                                ...notification,
                                action: "EDIT",
                              });
                              event.stopPropagation();
                            }}
                          />
                        </>
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
                      />
                    </Panel>
                  </Collapse>
                </Space>
              ))}
              <Button
                icon={<NotificationAddOutlinedIcon fontSize="inherit" />}
                onClick={handleAddNotification}
              >
                Add Notification
              </Button>
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
