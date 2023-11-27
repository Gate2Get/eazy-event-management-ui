import React from "react";
import {
  Button,
  Col,
  ColProps,
  Form,
  Input,
  Row,
  Select,
  Typography,
} from "antd";
import { Option } from "antd/es/mentions";
import {
  MailOutlined,
  MessageOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import "./styles.scss";
import { API } from "../../api";
import { useNavigate } from "react-router-dom";
import { useBearStore } from "../../store";
import { ROUTES_URL } from "../../constants";
import LoginSvg from "../../assets/svg/login-form.svg";
import { userManagementEndpoint } from "../../configs/axios.config";
import { validateEmail } from "../../utils/validation.utils";

const { Title, Text } = Typography;
const OTP_RESEND_AFTER = 30000;
const counterInSeconds = OTP_RESEND_AFTER / 1000;

export const SignIn = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { setLoading, screen } = useBearStore.appStore();
  const { setIsAuthorized } = useBearStore.userStore();
  const [isOtpEnabled, setOtpEnabled] = React.useState(false);
  const [isRequestOtpEnabled, setRequestOtpEnabled] = React.useState(true);
  const [countDown, setCountDown] = React.useState(0);
  const [payload, setPayload] = React.useState({
    email: "",
    otp: 0,
  });

  const loginEmailUser = (email: string) => {
    setLoading(true);
    API.userManagement
      .loginEmailUser(email)
      .then((response) => {
        setOtpEnabled(true);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log({ location: "loginUser", error });
      });
  };

  const loginGoogleUser = () => {
    window.location.href = userManagementEndpoint.loginGoogleUser;
  };

  const verifyOTP = (otp: number) => {
    setLoading(true);
    API.userManagement
      .verifyEmailOTP(otp.toString())
      .then((response) => {
        setLoading(false);
        setIsAuthorized(true);
        navigate(`${ROUTES_URL.EE}/${ROUTES_URL.DASHBOARD}`);
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
    if (values.email) {
      setPayload({
        ...payload,
        email: values.email,
      });
      loginEmailUser(values.email);
    }
  };

  const onVerifyOTP = (values: any) => {
    console.log("Received values of form: ", values, payload);
    if (!isNaN(values.otp)) {
      // setPayload({
      //   ...payload,
      //   mobile: values.mobile,
      // });
      verifyOTP(values.otp);
    }
  };

  const onRequestOtp = () => {
    loginEmailUser(payload.email);
    setRequestOtpEnabled(false);
    setTimeout(() => setRequestOtpEnabled(true), OTP_RESEND_AFTER);
    setCountDown(counterInSeconds);
  };

  const colProps: ColProps = {};
  if (screen === "MOBILE") {
    colProps.flex = 24;
  } else {
    colProps.span = 24;
  }

  return (
    <div className="sign-in__container">
      <Row
        className="login-form"
        style={screen !== "MOBILE" ? { width: "30rem" } : {}}
      >
        <Col span={24}>
          <Title level={2} className="login__text">
            Log in to your account
          </Title>
          {isOtpEnabled ? (
            <>
              <Title level={4}>
                Receive One-Time Password via Email{" "}
                <MailOutlined size={64} color="#25D366" />
              </Title>

              <Text type="secondary">
                We have sent 6-digit OTP to {payload.email}. Please enter the
                code below to continue
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
                  <Button
                    style={{ marginLeft: "10px" }}
                    type="default"
                    onClick={() => {
                      setOtpEnabled(false);
                    }}
                  >
                    Cancel
                  </Button>
                </Form.Item>
              </Form>
            </>
          ) : (
            <>
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
                  name="email"
                  label="Email Address"
                  rules={[
                    {
                      required: true,
                      message: "Please input your email address!",
                    },
                    { validator: validateEmail },
                  ]}
                >
                  <Input type="email" style={{ width: "100%" }} />
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
              <div className="or-text">
                <Text italic>or</Text>
              </div>
              <div className="google-sign-in-button__container">
                <button
                  type="button"
                  className="google-sign-in-button"
                  onClick={loginGoogleUser}
                >
                  Sign in with Google
                </button>
              </div>
            </>
          )}
        </Col>
      </Row>
      {screen !== "MOBILE" && (
        <Row style={{ position: "relative" }}>
          <img
            src={LoginSvg}
            alt=""
            className="login-form-svg"
            style={{
              width: "100%",
              height: "auto",
              position: "absolute",
              zIndex: -1,
            }}
          />
        </Row>
      )}
    </div>
  );
};
