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
} from "antd";
import illustrationBanner from "../../assets/webp/illustration-self-service.webp";
import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from "dayjs";
import {
  disabledDate,
  disabledDateTime,
  disabledRangeTime,
} from "../../utils/datePicket.utils";
import { CHANNEL_OPTIONS } from "../../constants";
import { ContactDirectoryType, EventType, TemplateType } from "../../types";
import React from "react";
import { removeEmptyProp } from "../../utils/common.utils";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
dayjs.extend(customParseFormat);

type BirthdayEventCreationType = {
  contactList: ContactDirectoryType[];
  templates: TemplateType[];
  event?: EventType;
  onHandleEvent: (event: EventType) => void;
  isEdit?: boolean;
};

export const BirthdayEventCreation = (props: BirthdayEventCreationType) => {
  const { contactList, templates, isEdit, event, onHandleEvent } = props;
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (isEdit) {
      const formValues = removeEmptyProp(event);
      if (event?.startDateTime && event?.endDateTime) {
        formValues.dateTime = [
          dayjs(event?.startDateTime),
          dayjs(event?.endDateTime),
        ];
      }
      if (event?.triggerDateTime) {
        formValues.triggerDateTime = dayjs(event?.triggerDateTime);
      }

      form.setFieldsValue(formValues);
    }
  }, []);

  const handleEvent = (event: any): void => {
    const { dateTime, triggerDateTime } = event;
    if (dateTime) {
      event.startDateTime = dayjs(dateTime[0]).format();
      event.endDateTime = dayjs(dateTime[1]).format();
    }
    if (triggerDateTime) {
      event.triggerDateTime = dayjs(triggerDateTime).format();
    }
    console.log(event);
    onHandleEvent(event);
  };

  return (
    <div>
      <Row>
        {/* <Col flex={8}>
          <img src={illustrationBanner} alt="" height={500} />
        </Col> */}
        <Col flex={24}>
          <Title level={3}>Create Birthday Event</Title>
          <Form
            layout="vertical"
            form={form}
            // style={{ maxWidth: 600 }}
            onFinish={handleEvent}
          >
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
                options={contactList?.map((contact) => ({
                  label: contact.name,
                  value: contact.id,
                }))}
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
                size="large"
                placeholder="Select the message template"
                allowClear
                options={templates?.map((template) => ({
                  label: template.name,
                  value: template.id,
                }))}
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
                {/* <Button size="large" type="text">
                  Save
                </Button> */}
                <Button size="large" type="primary" htmlType="submit">
                  Preview & {isEdit ? "Update" : "Send"} Event
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};
