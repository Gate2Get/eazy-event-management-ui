import React from "react";
import {
  Avatar,
  Button,
  Col,
  Form,
  Input,
  Result,
  Row,
  Space,
  Typography,
} from "antd";
import { useBearStore } from "../../store";
import EmailIcon from "@mui/icons-material/Email";
import { ROUTES_URL } from "../../constants";
import { useNavigate } from "react-router-dom";
import "./styles.scss";
import { API } from "../../api";

const { Paragraph, Text, Title, Link } = Typography;
const { TextArea } = Input;

export const ContactUs = () => {
  const { screen, setLoading } = useBearStore.appStore();
  const [form] = Form.useForm();
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
    // setLoading(true);
    // API.commonAPI
    //   .submitFeedback(bugs)
    //   .then((response) => {
    //     setLoading(false);
    //     console.log({ response });
    //     if (response.status) setIsSubmitted(true);
    //   })
    //   .catch((error: Error) => {
    //     setLoading(false);
    //     console.log({ location: "handleSubmit", error });
    //   });
  };

  if (isSubmitted) {
    return (
      <Result
        status="success"
        title="Request submitted successfully"
        extra={[
          <Button
            // icon={<ArrowForwardIcon fontSize="inherit" />}
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
    <Row
      className="contact-us__container"
      style={{ padding: screen === "MOBILE" ? "2rem" : "2rem 8rem" }}
      gutter={[8, 8]}
    >
      <Col {...colOption(12)}>
        <Space direction="vertical" style={{ width: "100%" }}>
          <div className="sales-text">
            <Avatar
              shape="square"
              size={32}
              style={{ background: "rgb(18, 183, 106)" }}
              icon={<EmailIcon fontSize="inherit" />}
            />{" "}
            <Text>Contact Sales</Text>
          </div>
          <Title level={1}>Talk to one of our experts</Title>
          <Paragraph className="font-size-16">
            Do you have questions about any of our services and products or do
            you want to get a quote on one of your custom projects?
          </Paragraph>
          <Paragraph className="font-size-16">
            Please, fill out the form and an account manager will be in touch
            shortly.
          </Paragraph>
        </Space>
      </Col>
      <Col {...colOption(12)}>
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[
              {
                required: true,
                message: "Please input your full name!",
              },
            ]}
          >
            <Input size="middle" />
          </Form.Item>

          <Form.Item
            label="Email address"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email address!",
              },
            ]}
          >
            <Input
              size="middle"
              type="email"
              placeholder="Your email address"
            />
          </Form.Item>
          <Form.Item
            label="Mobile Number"
            name="mobile"
            rules={[
              {
                len: 10,
                min: 10,
                max: 10,
                message: "Enter valid mobile number",
              },
              {
                required: true,
                message: "Please input your mobile number!",
              },
            ]}
          >
            <Input size="middle" type="number" placeholder="Mobile number" />
          </Form.Item>

          <Form.Item label="Can You Provide Some More Details?" name="comments">
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        <Paragraph style={{ color: "#6b7080" }}>
          By submitting this, you agree to the{" "}
          <Link href={`${ROUTES_URL.PRIVACY_POLICY}`} target="_blank">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link href={`${ROUTES_URL.TERMS_OF_SERVICE}`} target="_blank">
            Terms and Conditions of Use.
          </Link>
        </Paragraph>
      </Col>
    </Row>
  );
};
