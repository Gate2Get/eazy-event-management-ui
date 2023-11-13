import React from "react";
import { Col, Divider, Row, Typography, Form, Rate, Button } from "antd";
import { FrownOutlined, MehOutlined, SmileOutlined } from "@ant-design/icons";
import feedbackBanner from "../../assets/svg/feedback-banner.svg";
import { FEEDBACK_DETAILS } from "./constant";
import TextArea from "antd/es/input/TextArea";
import { useBearStore } from "../../store";

const { Title, Text } = Typography;

const customIcons: Record<number, React.ReactNode> = {
  1: <FrownOutlined />,
  2: <FrownOutlined />,
  3: <MehOutlined />,
  4: <SmileOutlined />,
  5: <SmileOutlined />,
};

export const Feedback = () => {
  const [form] = Form.useForm();
  const { screen } = useBearStore.appStore();

  const colOption = (count: number) =>
    screen === "MOBILE"
      ? {
          flex: count,
        }
      : { span: count };

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col {...colOption(10)}>
          <img src={feedbackBanner} alt="" />
        </Col>
        <Col {...colOption(14)}>
          <Title level={3}>We value your feedback!</Title>
          <Text>Help us make your Eazy Event experience better.</Text>
          <Divider />
          <Title level={4}>Give app feedback</Title>
          <Form layout="vertical" form={form} style={{ maxWidth: 600 }}>
            {FEEDBACK_DETAILS.map((feedback) => (
              <Form.Item label={feedback.label} name="layout">
                <Rate
                  defaultValue={3}
                  character={(props) =>
                    customIcons[(props.index as number) + 1]
                  }
                />
              </Form.Item>
            ))}
            <Form.Item
              label="Please provide additional feedback.(Optional)"
              name="layout"
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
