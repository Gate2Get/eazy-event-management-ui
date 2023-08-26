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
} from "antd";
import illustrationBanner from "../../assets/webp/illustration-self-service.webp";
import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from "dayjs";
import { disabledDate, disabledRangeTime } from "../../utils/datePicket.utils";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
dayjs.extend(customParseFormat);

export const MarriageEventCreation = () => {
  const [form] = Form.useForm();
  return (
    <div>
      <Row>
        <Col flex={8}>
          <img src={illustrationBanner} alt="" height={500} />
        </Col>
        <Col flex={12}>
          <Title level={3}>Create Marriage Event</Title>
          <Form layout="vertical" form={form} style={{ maxWidth: 600 }}>
            <Form.Item
              label="Groom Name"
              name="groomName"
              rules={[{ required: true, message: "Please input Groom name!" }]}
            >
              <Input size="large" placeholder="Enter your Groom Name" />
            </Form.Item>

            <Form.Item
              label="Bride Name"
              name="brideName"
              rules={[{ required: true, message: "Please input Bride name!" }]}
            >
              <Input size="large" placeholder="Enter your Bride Name" />
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
              label="Select contact directory"
              name="contactDirectory"
              rules={[
                { required: true, message: "Please choose contact directory!" },
              ]}
            >
              <Select
                size="large"
                placeholder="Select the contact directory"
                mode="multiple"
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
                size="large"
                placeholder="Select the message template"
                mode="multiple"
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
