import {
  Col,
  Row,
  Typography,
  Form,
  Button,
  Input,
  DatePicker,
  Select,
  Space,
  Radio,
  FormInstance,
} from "antd";
import illustrationBanner from "../../assets/webp/illustration-self-service.webp";
import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from "dayjs";
import {
  disabledDate,
  disabledDateTime,
  disabledRangeTime,
} from "../../utils/datePicket.utils";
import { CHANNEL_OPTIONS, ROUTES_URL } from "../../constants";
import { ContactDirectoryType, EventType, TemplateType } from "../../types";
import React from "react";
import { removeEmptyProp } from "../../utils/common.utils";
import { NoData } from "../noData";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
dayjs.extend(customParseFormat);

type BirthdayEventCreationType = {
  contactList: ContactDirectoryType[];
  templates: TemplateType[];
  onHandleEvent: (event: EventType) => void;
  isEdit?: boolean;
  onSearchTemplate: (template: string) => void;
  form: FormInstance;
  isTemplateFetching?: boolean;
  isContactFetching?: boolean;
  onSearchContact: (contact: string) => void;
};

export const BirthdayEventCreation = (props: BirthdayEventCreationType) => {
  const {
    contactList,
    templates,
    isEdit,
    onHandleEvent,
    form,
    onSearchTemplate,
    isTemplateFetching,
    isContactFetching,
    onSearchContact,
  } = props;

  const channel = Form.useWatch("channel", { form, preserve: true });

  return (
    <div>
      <Row>
        <Col flex={24}>
          <Title level={3}>Create Birthday Event</Title>
          <Form layout="vertical" form={form} onFinish={onHandleEvent}>
            <Form.Item
              label="Event Name"
              name="name"
              rules={[{ required: true, message: "Please input Event name!" }]}
            >
              <Input size="large" placeholder="Enter your Event Name" />
            </Form.Item>
            <Form.Item
              label="Birthday person name"
              name="personName"
              rules={[{ required: true, message: "Please input person name!" }]}
            >
              <Input
                size="large"
                placeholder="Enter your birthday person name"
              />
            </Form.Item>

            <Form.Item
              label="Select the event date"
              name="dateTime"
              rules={[{ required: true, message: "Please select event date!" }]}
            >
              <RangePicker
                disabledDate={disabledDate}
                disabledTime={disabledRangeTime}
                showTime={{
                  hideDisabledOptions: true,
                  defaultValue: [
                    dayjs("00:00:00", "HH:mm:ss"),
                    dayjs("11:59:59", "HH:mm:ss"),
                  ],
                }}
                size="large"
                format="YYYY-MM-DD HH:mm:ss"
                style={{ width: "100%" }}
              />
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
                { required: true, message: "Please choose contact directory!" },
              ]}
            >
              <Select
                size="large"
                placeholder="Select the contact directory"
                allowClear
                showSearch
                options={contactList?.map((contact) => ({
                  label: contact.name,
                  value: contact.id,
                }))}
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
                size="large"
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
              <Input size="large" placeholder="Enter the event location" />
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
                size="large"
                placeholder="Enter the event google location url"
              />
            </Form.Item>
            <Form.Item
              label="Notification trigger date"
              name="triggerDateTime"
              rules={[
                {
                  required: true,
                  message: "Please input notification trigger date!",
                },
              ]}
            >
              <DatePicker
                format="YYYY-MM-DD HH:mm:ss"
                disabledDate={disabledDate}
                disabledTime={disabledDateTime}
                showTime={{ defaultValue: dayjs("00:00:00", "HH:mm:ss") }}
                style={{ width: "100%" }}
                size="large"
              />
            </Form.Item>
            <Form.Item>
              <Space>
                <Button size="large" type="primary" htmlType="submit">
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
