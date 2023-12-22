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
} from "antd";
import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from "dayjs";
import {
  disabledDate,
  disabledDateTime,
  disabledRangeTime,
} from "../../utils/datePicker.utils";
import { CHANNEL_OPTIONS, ROUTES_URL } from "../../constants";
import { EventCreationType } from "../../types";
import { NoData } from "../noData";
import { useWindowSize } from "../../hooks/useWindowSize";
import { useBearStore } from "../../store";
import { AttachmentDragger } from "../AttachmentDragger";

const { RangePicker } = DatePicker;
dayjs.extend(customParseFormat);

export const OtherEventCreation = (props: EventCreationType) => {
  const {
    contactList,
    templates,
    isEdit,
    form,
    isTemplateFetching,
    isContactFetching,
    onHandleEvent,
    onSearchTemplate,
    onSearchContact,
    getContactDirectory,
    getTemplates,
    handleFileUpload,
  } = props;
  const { width } = useWindowSize();
  const { screen } = useBearStore.appStore();

  const channel = Form.useWatch("channel", { form, preserve: true });
  const invitationAttachment = Form.useWatch("invitationAttachment", {
    form,
    preserve: true,
  });

  return (
    <div>
      <Row>
        <Col flex={24}>
          <Form
            layout="vertical"
            form={form}
            // style={{ maxWidth: 600 }}
            onFinish={onHandleEvent}
          >
            <Form.Item
              label="Event Name"
              name="name"
              rules={[{ required: true, message: "Please input Event name!" }]}
            >
              <Input placeholder="Enter your Event Name" />
            </Form.Item>
            {screen === "MOBILE" ? (
              <>
                <Form.Item
                  label="Select the event start date"
                  name="startDateTime"
                  rules={[
                    {
                      required: true,
                      message: "Please select event start date!",
                    },
                  ]}
                >
                  <Input type="datetime-local" allowClear />
                </Form.Item>
                <Form.Item
                  label="Select the event end date"
                  name="endDateTime"
                  rules={[
                    {
                      required: true,
                      message: "Please select event end date!",
                    },
                  ]}
                >
                  <Input type="datetime-local" allowClear />
                </Form.Item>
              </>
            ) : (
              <Form.Item
                label="Select the event date"
                name="dateTime"
                rules={[
                  { required: true, message: "Please select event date!" },
                ]}
              >
                <RangePicker
                  disabledDate={disabledDate}
                  disabledTime={disabledRangeTime}
                  showTime={{
                    hideDisabledOptions: true,
                    defaultValue: [
                      dayjs("00:00", "HH:mm"),
                      dayjs("11:59", "HH:mm"),
                    ],
                  }}
                  format="YYYY-MM-DD HH:mm"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            )}
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
                { required: true, message: "Please choose contact directory!" },
              ]}
            >
              <Select
                placeholder="Select the contact directory"
                allowClear
                showSearch
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
                { required: true, message: "Please select message template!" },
              ]}
            >
              <Select
                disabled={!channel}
                showSearch
                onSearch={onSearchTemplate}
                placeholder="Select the message template"
                allowClear
                filterOption={false}
                onFocus={() => {
                  getTemplates();
                }}
                loading={isTemplateFetching}
                options={templates?.map((template) => ({
                  label: template.name,
                  value: template.id,
                }))}
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
              label="Location"
              name="location"
              rules={[
                { required: true, message: "Please input the event location!" },
              ]}
            >
              <Input placeholder="Enter the event location" />
            </Form.Item>
            <Form.Item
              label="Google Location url"
              name="locationUrl"
              rules={[
                {
                  required: false,
                  message: "Please input google map location url!",
                },
              ]}
            >
              <Input
                type="url"
                placeholder="Enter the event google location url"
              />
            </Form.Item>
            <Form.Item
              label="Notification send date"
              name="triggerDateTime"
              rules={[
                {
                  required: true,
                  message: "Please input notification trigger date!",
                },
              ]}
            >
              {screen !== "MOBILE" ? (
                <DatePicker
                  format="YYYY-MM-DD HH:mm"
                  disabledDate={disabledDate}
                  disabledTime={disabledDateTime}
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
            <Form.Item
              label="Invitation Attachment"
              name="invitationAttachment"
            >
              <AttachmentDragger
                buttonText="Upload Attachment"
                isPreview
                otherProps={{
                  fileList: invitationAttachment,
                }}
                accept="image/*,application/pdf"
                onAttach={(e) => handleFileUpload?.(e)}
              />
            </Form.Item>
            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  Preview & {isEdit ? "Update" : "Create"} Event
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};
