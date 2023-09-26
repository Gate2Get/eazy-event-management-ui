import React from "react";
import { Button, Col, ColProps, Form, Input, Row, Select, Typography } from "antd";
import { Option } from "antd/es/mentions";
import { WhatsAppOutlined } from "@ant-design/icons";
import "./styles.scss";
import { API } from "../../api";
import { useNavigate } from "react-router-dom";
import { useBearStore } from "../../store";
import { ROUTES_URL } from "../../constants";
import LoginSvg from '../../assets/svg/login.svg'

const { Title, Text } = Typography;
const OTP_RESEND_AFTER = 5000;
const counterInSeconds = OTP_RESEND_AFTER / 1000;

const prefixSelector = (
  <Form.Item name="countryCode" noStyle>
    <Select style={{ width: 70 }}>
      <Option value="91">+91</Option>
    </Select>
  </Form.Item>
);

export const SignIn = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { setLoading, screen } = useBearStore.appStore();
  const [isOtpEnabled, setOtpEnabled] = React.useState(false);
  const [isRequestOtpEnabled, setRequestOtpEnabled] = React.useState(true);
  const [countDown, setCountDown] = React.useState(0);
  const [payload, setPayload] = React.useState({
    countryCode: 0,
    mobile: 0,
    otp: 0,
  });

  const loginUser = (mobile: number) => {
    setLoading(true);
    API.userManagement
      .loginUser(mobile)
      .then((response) => {
        setOtpEnabled(true);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log({ location: "loginUser", error });
      });
  };

  const verifyOTP = (mobile: number, otp: number) => {
    setLoading(true);
    API.userManagement
      .verifyOTP(mobile, otp)
      .then((response) => {
        setLoading(false);
        navigate(ROUTES_URL.DASHBOARD);
      })
      .catch((error) => {
        setLoading(false);
        console.log({ location: "verifyOTP", error });
      });
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDown - 1);
    }, 1000);
    if (countDown < 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [countDown]);

  const onNext = (values: any) => {
    console.log("Received values of form: ", values);
    if (!isNaN(values.mobile)) {
      setPayload({
        ...payload,
        countryCode: values.countryCode,
        mobile: values.mobile,
      });
      loginUser(values.mobile);
    }
  };

  const onVerifyOTP = (values: any) => {
    console.log("Received values of form: ", values);
    if (!isNaN(values.otp)) {
      setPayload({
        ...payload,
        mobile: values.mobile,
      });
      verifyOTP(payload.mobile, values.otp);
    }
  };

  const onRequestOtp = () => {
    setRequestOtpEnabled(false);
    setTimeout(() => setRequestOtpEnabled(true), OTP_RESEND_AFTER);
    setCountDown(counterInSeconds);
  };

  const colProps: ColProps = {};
  if (screen === "MOBILE") {
    colProps.flex = 12;
  } else {
    colProps.span = 12;
  }

  return (
    <div className="sign-in__container">
      <Row>
        <Col {...colProps}>
          <img src={LoginSvg} alt="" width={"70%"} />
        </Col>
        <Col {...colProps}>
          <Title level={2} className="login__text">
            Log in to your account
          </Title>
          {isOtpEnabled ? (
            <>
              <Title level={4}>
                Receive One-Time Password via Whatsapp{" "}
                <WhatsAppOutlined size={64} color="#25D366" />
              </Title>

              <Text type="secondary">
                We have sent 6-digit OTP to +{payload.countryCode}{" "}
                {payload.mobile}. Please enter the code below to continue
              </Text>
              <Form
                size="large"
                form={form}
                name="otp"
                onFinish={onVerifyOTP}
                style={{ maxWidth: 600 }}
                scrollToFirstError
                layout="vertical"
              >
                <Form.Item
                  name="otp"
                  label="Enter OTP"
                  rules={[
                    {
                      len: 6,
                      min: 6,
                      max: 6,
                      message: "Enter OTP",
                    },
                    {
                      required: true,
                      message: "Please enter 6 digit OTP",
                    },
                  ]}
                >
                  <Input
                    placeholder="6-digit OTP"
                    type="number"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
                <Text italic>Did not receive the OTP?</Text>
                <Button
                  type="link"
                  disabled={!isRequestOtpEnabled}
                  onClick={onRequestOtp}
                >
                  {isRequestOtpEnabled
                    ? "Resend OTP"
                    : `Resent OTP after ${countDown} seconds`}
                </Button>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                  >
                    Verify
                  </Button>
                </Form.Item>
              </Form>
            </>
          ) : (
            <Form
              size="large"
              form={form}
              name="register"
              onFinish={onNext}
              style={{ maxWidth: 600 }}
              scrollToFirstError
              layout="vertical"
              initialValues={{
                countryCode: "91",
              }}
            >
              <Form.Item
                name="mobile"
                label="Mobile Number"
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
                <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Next
                </Button>
              </Form.Item>
            </Form>
          )}
        </Col>
      </Row>
    </div>
  );
};
