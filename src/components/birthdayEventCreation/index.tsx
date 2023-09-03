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
import { disabledDate, disabledRangeTime } from "../../utils/datePicket.utils";
import { CHANNEL_OPTIONS } from "../../constants";
import { ContactDirectoryType, TemplateType } from "../../types";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
dayjs.extend(customParseFormat);

type BirthdayEventCreationType = {
  contactList: ContactDirectoryType[];
  templates: TemplateType[];
};

export const BirthdayEventCreation = (props: BirthdayEventCreationType) => {
  const { contactList, templates } = props;
  const [form] = Form.useForm();
  return (
    <div>
      <Row>
        <Col flex={8}>
          <img src={illustrationBanner} alt="" height={500} />
        </Col>
        <Col flex={12}>
          <Title level={3}>Create Birthday Event</Title>
          <Form layout="vertical" form={form} style={{ maxWidth: 600 }}>
            <Form.Item
              label="Event Name"
              name="eventName"
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
              name="eventDateRange"
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
                  value: contact._id,
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
                  value: template._id,
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
            <Form.Item>
              <Space>
                <Button size="large" type="text">
                  Save
                </Button>
                <Button size="large" type="primary" htmlType="submit">
                  Preview & Send Event
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};
