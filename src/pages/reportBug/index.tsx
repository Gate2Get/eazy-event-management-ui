import React from "react";
import {
  Col,
  Divider,
  Row,
  Typography,
  Form,
  Rate,
  Button,
  Select,
} from "antd";
import { FrownOutlined, MehOutlined, SmileOutlined } from "@ant-design/icons";
import bugBanner from "../../assets/svg/bug-banner.svg";
import { TOPIC_OPTIONS } from "./constant";
import TextArea from "antd/es/input/TextArea";

const { Title, Text } = Typography;
const topicOptions = TOPIC_OPTIONS.map((topic) => ({
  label: topic,
  value: topic,
}));

const customIcons: Record<number, React.ReactNode> = {
  1: <FrownOutlined />,
  2: <FrownOutlined />,
  3: <MehOutlined />,
  4: <SmileOutlined />,
  5: <SmileOutlined />,
};

export const ReportBug = () => {
  const [form] = Form.useForm();
  return (
    <div>
      <Row>
        <Col flex={8}>
          <img src={bugBanner} alt="" />
        </Col>
        <Col flex={12}>
          <Title level={3}>Report a bug</Title>

          <Divider />
          <Form layout="vertical" form={form} style={{ maxWidth: 600 }}>
            <Form.Item label="Select a topic." name="topic">
              <Select
                size="large"
                options={topicOptions}
                placeholder="Select any topic to continue"
              />
            </Form.Item>
            <Form.Item
              label="Please provide additional information."
              name="additionalInfo"
            >
              <TextArea size="large" />
            </Form.Item>
            <Form.Item>
              <Button size="large" type="primary">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};
