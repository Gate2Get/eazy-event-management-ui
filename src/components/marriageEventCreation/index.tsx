import React from "react";
import {
  Col,
  Divider,
  Row,
  Typography,
  Form,
  Rate,
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
import { removeEmptyProp } from "../../utils/common.utils";
import { NoData } from "../noData";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
dayjs.extend(customParseFormat);

type MarriageEventCreationType = {
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

export const MarriageEventCreation = (props: MarriageEventCreationType) => {
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
  } = props;

  const channel = Form.useWatch("channel", { form, preserve: true });

  return (
    <div>
      <Row>
        <Col flex={24}>
          <Form layout="vertical" form={form} onFinish={onHandleEvent}>
            <Form.Item
              label="Event Name"
              name="name"
              rules={[{ required: true, message: "Please input Event name!" }]}
            >
              <Input placeholder="Enter your Event Name" />
            </Form.Item>
            <Form.Item
              label="Groom Name"
              name="groomName"
              rules={[{ required: true, message: "Please input Groom name!" }]}
            >
              <Input placeholder="Enter your Groom Name" />
            </Form.Item>

            <Form.Item
              label="Bride Name"
              name="brideName"
              rules={[{ required: true, message: "Please input Bride name!" }]}
            >
              <Input placeholder="Enter your Bride Name" />
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
                { required: true, message: "Please choose message template!" },
              ]}
            >
              <Select
                disabled={!channel}
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
