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
import bugBanner from "../../assets/svg/bug-banner.svg";
import { TOPIC_OPTIONS } from "./constant";
import TextArea from "antd/es/input/TextArea";
import { AttachmentButton } from "../../components/AttachmentButton";
import { ReportBugsType } from "../../types";
import { API } from "../../api";
import { useBearStore } from "../../store";
import { AttachmentDragger } from "../../components/AttachmentDragger";

const { Title, Text } = Typography;
const topicOptions = TOPIC_OPTIONS.map((topic) => ({
  label: topic,
  value: topic,
}));

export const ReportBug = () => {
  const [form] = Form.useForm();
  const { setLoading, screen } = useBearStore.appStore();

  const colOption = (count: number) =>
    screen === "MOBILE"
      ? {
          flex: count,
        }
      : { span: count };

  const handleSubmit = (bugs: ReportBugsType) => {
    setLoading(true);
    API.commonAPI
      .createBug(bugs)
      .then(() => {
        setLoading(false);
      })
      .catch((error: Error) => {
        setLoading(false);
        console.log({ location: "handleSubmit", error });
      });
  };

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col {...colOption(8)} style={{ textAlign: "center" }}>
          <img
            loading="lazy"
            src={bugBanner}
            alt=""
            width={screen === "MOBILE" ? "70%" : "100%"}
          />
        </Col>
        <Col {...colOption(16)}>
          <Title level={3}>Report a bug</Title>

          <Divider />
          <Form
            layout="vertical"
            form={form}
            style={{ maxWidth: 600 }}
            onFinish={handleSubmit}
          >
            <Form.Item
              label="Select a topic."
              name="topic"
              rules={[
                {
                  required: true,
                  message: "Please select topic",
                },
              ]}
            >
              <Select
                options={topicOptions}
                placeholder="Select any topic to continue"
              />
            </Form.Item>
            <Form.Item
              label="Please provide additional information."
              name="information"
              rules={[
                {
                  required: true,
                  message: "Please provide the information!",
                },
              ]}
            >
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item label="Attachment" name="attachment">
              <AttachmentDragger buttonText="Upload Attachment" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};
