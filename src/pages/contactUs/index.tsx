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
import { useNavigate, useSearchParams } from "react-router-dom";
import "./styles.scss";
import { API } from "../../api";
import { NoData } from "../../components/noData";
import ContactUsSubmitted from "../../assets/svg/contact-us-submitted.svg";

const { Paragraph, Text, Title, Link } = Typography;
const { TextArea } = Input;

export const ContactUs = () => {
  const { screen, setLoading } = useBearStore.appStore();
  const [form] = Form.useForm();

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const colOption = (count: number) =>
    screen === "MOBILE"
      ? {
          flex: count,
        }
      : { span: count };

  const handleSubmit = (values: any) => {
    setLoading(true);
    API.commonAPI
      .contactUs(values)
      .then((response) => {
        setLoading(false);
        if (response.status) {
          form.resetFields();
          setSearchParams({ action: "submitted" });
        }
      })
      .catch((error: Error) => {
        setLoading(false);
        console.log({ location: "handleSubmit", error });
      });
  };

  if (searchParams.get("action") === "submitted") {
    return (
      <NoData
        image={<img loading="lazy" src={ContactUsSubmitted} alt="" />}
        description={
          <>
            <h2>Thank You for Contacting Us!</h2>
            <p>
              We have received your message and our team will get back to you as
              soon as possible.
            </p>
            <p>
              In the meantime, feel free to explore our website for more
              information about our products and services.
            </p>
            <p>Thank you for choosing us!</p>
          </>
        }
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
          <Paragraph className="font-size-16">Or</Paragraph>
          <Paragraph className="font-size-16">
            Call directly to our team for more queries{" "}
            <Link strong href="tel:6374922068">
              6374922068
            </Link>
            /
            <Link strong href="tel:9363967378">
              9363967378
            </Link>
          </Paragraph>
        </Space>
      </Col>
      <Col {...colOption(12)}>
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <Form.Item
            label="Full Name"
            name="name"
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

          <Form.Item
            label="Can You Provide Some More Details?"
            name="notes"
            rules={[
              {
                required: true,
                message: "Please input some more details!",
              },
            ]}
          >
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
