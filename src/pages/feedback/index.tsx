import React from "react";
import {
  Col,
  Divider,
  Row,
  Typography,
  Form,
  Rate,
  Button,
  Result,
} from "antd";
import { FrownOutlined, MehOutlined, SmileOutlined } from "@ant-design/icons";
import feedbackBanner from "../../assets/svg/feedback-banner.svg";
import { FEEDBACK_DETAILS } from "./constant";
import TextArea from "antd/es/input/TextArea";
import { useBearStore } from "../../store";
import { API } from "../../api";
import { FeedbackType } from "../../types";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import { ROUTES_URL } from "../../constants";

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
  const { screen, setLoading } = useBearStore.appStore();
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const navigate = useNavigate();

  const colOption = (count: number) =>
    screen === "MOBILE"
      ? {
          flex: count,
        }
      : { span: count };

  React.useEffect(() => {
    if (isSubmitted) {
      form.resetFields();
    }
    return () => {
      form.resetFields();
      setIsSubmitted(false);
    };
  }, [isSubmitted]);

  const handleSubmit = (values: any) => {
    const bugs = {
      comments: values.comments,
      questions: FEEDBACK_DETAILS.map((_questions) => ({
        question: _questions.label,
        answer: values[_questions.id],
      })),
    };

    setLoading(true);
    API.commonAPI
      .submitFeedback(bugs)
      .then((response) => {
        setLoading(false);
        console.log({ response });
        if (response.status) setIsSubmitted(true);
      })
      .catch((error: Error) => {
        setLoading(false);
        console.log({ location: "handleSubmit", error });
      });
  };

  if (isSubmitted) {
    return (
      <Result
        status="success"
        title="Feedback submitted successfully"
        extra={[
          <Button
            icon={<ArrowForwardIcon fontSize="inherit" />}
            type="primary"
            onClick={() => navigate(`${ROUTES_URL.EE}/${ROUTES_URL.DASHBOARD}`)}
          >
            Go to Home
          </Button>,
        ]}
      />
    );
  }

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col {...colOption(8)} style={{ textAlign: "center" }}>
          <img loading="lazy" src={feedbackBanner} alt="" width={"60%"} />
        </Col>
        <Col {...colOption(16)}>
          <Title level={3}>We value your feedback!</Title>
          <Text>Help us make your Eazy Event experience better.</Text>
          <Divider />
          <Title level={4}>Give app feedback</Title>
          <Form
            layout="vertical"
            form={form}
            style={{ maxWidth: 600 }}
            onFinish={handleSubmit}
          >
            {FEEDBACK_DETAILS.map((feedback) => (
              <Form.Item
                label={feedback.label}
                name={feedback.id}
                rules={[
                  {
                    required: true,
                    message: "Please select the option!",
                  },
                ]}
              >
                <Rate
                  character={(props) =>
                    customIcons[(props.index as number) + 1]
                  }
                />
              </Form.Item>
            ))}
            <Form.Item
              label="Please provide additional feedback.(Optional)"
              name="comments"
            >
              <TextArea rows={4} />
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
