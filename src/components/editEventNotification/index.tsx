import React from "react";
import {
  Collapse,
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  Typography,
  Radio,
  Tag,
  Space,
  Modal,
  Alert,
} from "antd";
import { EventNotificationCardType, EventNotificationType } from "../../types";
import { CHANNEL_OPTIONS, EVENT_STATUS, ROUTES_URL } from "../../constants";
import { NoData } from "../noData";
import "./styles.scss";
import { useBearStore } from "../../store";
import {
  dateUtctoIstyyyyMMddThhmm,
  disabledDate,
  disabledDateTime,
} from "../../utils/datePicker.utils";
import { useWindowSize } from "../../hooks/useWindowSize";
import dayjs from "dayjs";

const { Text } = Typography;

export const EditEventNotification = (props: EventNotificationCardType) => {
  const [form] = Form.useForm();
  const {
    contactDirectory,
    name,
    messageTemplate,
    triggerDateTime,
    isEdit,
    channel,
    isEditAllowed,
    contactList,
    getContactDirectory,
    getTemplates,
    onSearchContact,
    onSearchTemplate,
    onCancelEdit,
    handleSubmit,
    templates,
    isContactFetching,
    isTemplateFetching,
    action,
  } = props;

  const { screen } = useBearStore.appStore();
  const { user } = useBearStore.userStore();
  const { width } = useWindowSize();
  const selectedChannel = Form.useWatch("channel", { form, preserve: true });

  const onFinish = async (values: any) => {
    console.log({ values });
    handleSubmit?.(values);
  };

  React.useEffect(() => {
    console.log({
      contactDirectory,
      name,
      messageTemplate,
      triggerDateTime: dayjs(triggerDateTime),
      channel,
    });

    form.setFieldsValue({
      contactDirectory,
      name,
      messageTemplate,
      triggerDateTime: triggerDateTime
        ? screen === "MOBILE"
          ? dateUtctoIstyyyyMMddThhmm(triggerDateTime)
          : dayjs(triggerDateTime)
        : undefined,
      channel,
    });
  }, [contactDirectory, name, messageTemplate, triggerDateTime, channel]);

  const handleCancel = () => {
    form.resetFields();
    onCancelEdit?.();
  };

  return (
    <>
      <Modal
        open={isEdit}
        title="Notification"
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          name="notificationForm"
          className="event-notification-edit__container"
          layout="vertical"
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input notification name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
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
              onChange={() => {
                form.setFieldValue("messageTemplate", undefined);
              }}
            />
          </Form.Item>
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
            label="Select message template"
            name="messageTemplate"
            rules={[
              {
                required: true,
                message: "Please choose message template!",
              },
            ]}
          >
            <Select
              disabled={!selectedChannel}
              showSearch
              onSearch={onSearchTemplate}
              placeholder="Select the message template"
              allowClear
              filterOption={false}
              loading={isTemplateFetching}
              options={templates?.map((template) => ({
                label: template.name,
                value: template.id,
              }))}
              onFocus={() => {
                getTemplates({
                  approvalStatus: EVENT_STATUS.APPROVED,
                  channel: selectedChannel,
                });
              }}
              notFoundContent={
                <NoData
                  description={
                    <>
                      No Template, Click{" "}
                      <a
                        href={`${ROUTES_URL.EE}/${ROUTES_URL.TEMPLATE_MANAGEMENT}`}
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
            label="Send Date and Time"
            name="triggerDateTime"
            rules={[
              {
                required: true,
                message: "Please select send date and time!",
              },
            ]}
          >
            {screen !== "MOBILE" ? (
              <DatePicker
                format="YYYY-MM-DD HH:mm"
                disabledDate={disabledDate}
                // disabledTime={disabledDateTime}
                showTime
                style={{ width: "100%" }}
                popupStyle={{
                  maxWidth: width,
                }}
              />
            ) : (
              <Input type="datetime-local" allowClear />
            )}
          </Form.Item>

          {user.walletIsTrial && (
            <Alert
              style={{ padding: "0px 8px" }}
              type="warning"
              message={
                <Text>
                  <Text strong>Upgrade Alert: </Text> Your account is in trial
                  mode. Please add credits to your wallet to continue sending
                  notifications and unlock premium features.
                </Text>
              }
            />
          )}
          <Form.Item>
            <div className="submit-button">
              <Button type="default" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                {action === "EDIT" ? "Update" : "Create"}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
