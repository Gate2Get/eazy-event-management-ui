import React from "react";
import {
  Button,
  Col,
  ColProps,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Typography,
} from "antd";
import { Option } from "antd/es/mentions";
import { EditOutlined, MessageOutlined } from "@ant-design/icons";
import "./styles.scss";
import { API } from "../../api";
import { useBearStore } from "../../store";
import {
  modalClassNames,
  modalStyles,
  useModalStyle,
} from "../../configs/antd.config";
import { useTheme } from "antd-style";
import { UserInfoType } from "../../types";

const { Title, Text } = Typography;
const OTP_RESEND_AFTER = 30000;
const counterInSeconds = OTP_RESEND_AFTER / 1000;

type ProfileVerificationType = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onCloseVerification: () => void;
  userInfo: UserInfoType;
};

const prefixSelector = (
  <Form.Item name="countryCode" noStyle>
    <Select style={{ width: 70 }}>
      <Option value="91">+91</Option>
    </Select>
  </Form.Item>
);

export const ProfileVerification = (props: ProfileVerificationType) => {
  const { isOpen, setIsOpen, onCloseVerification, userInfo } = props;
  const [form] = Form.useForm();
  const { styles } = useModalStyle();
  const token = useTheme();
  const { screen } = useBearStore.appStore();
  const [loading, setLoading] = React.useState(false);
  const [isOtpEnabled, setOtpEnabled] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);

  const [payload, setPayload] = React.useState({
    countryCode: 0,
    mobile: 0,
    otp: 0,
  });

  React.useEffect(() => {
    if (isOpen) {
      setOtpEnabled(false);
      form.resetFields();
      setPayload({
        ...payload,
        mobile: userInfo.mobile as number,
      });
      form.setFieldValue("mobile", userInfo.mobile);
      if (!userInfo.mobile) {
        setIsEdit(true);
      } else {
        setIsEdit(false);
      }
    }

    () => {
      setIsEdit(false);
      setOtpEnabled(false);
      form.resetFields();
    };
  }, [isOpen]);

  const requestOtp = () => {
    setLoading(true);
    API.userManagement
      .requestOtp()
      .then((response) => {
        setOtpEnabled(true);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log({ location: "loginUser", error });
      });
  };

  const verifyOTP = (otp: number) => {
    setLoading(true);
    API.userManagement
      .verifyOTP(otp)
      .then((status) => {
        setLoading(false);
        if (status) {
          onCloseVerification();
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log({ location: "verifyOTP", error });
      });
  };

  const updateUserInfo = (userInfo: UserInfoType, callBack?: () => void) => {
    setLoading(true);
    API.userManagement
      .updateUserInfo(userInfo)
      .then((response) => {
        setLoading(false);
        setIsEdit(false);
        callBack?.();
      })
      .catch((error) => {
        setLoading(false);
        console.log({ location: "updateUserInfo", error });
      });
  };

  const onNext = (values: any) => {
    console.log("Received values of form: ", values);

    if (isEdit) {
      if (!isNaN(values.mobile)) {
        setPayload({
          ...payload,
          countryCode: values.countryCode,
          mobile: values.mobile,
        });
        updateUserInfo({ mobile: values.mobile }, requestOtp);
      }
    } else {
      requestOtp();
    }
  };

  const onVerifyOTP = (values: any) => {
    console.log("Received values of form: ", values, payload);
    if (!isNaN(values.otp)) {
      verifyOTP(values.otp);
    }
  };

  const colProps: ColProps = {};
  if (screen === "MOBILE") {
    colProps.flex = 24;
  } else {
    colProps.span = 24;
  }

  const onCancel = () => {
    setIsEdit(false);
    setOtpEnabled(false);
    form.resetFields();
    setIsOpen(false);
  };

  return (
    <Modal
      title={<Title level={5}>Account Verification</Title>}
      open={isOpen}
      footer={<></>}
      onCancel={onCancel}
      okText="Yes"
      cancelText="No"
      okType="danger"
      classNames={modalClassNames(styles)}
      styles={modalStyles(token) as any}
    >
      <div className="profile-verification__container">
        <Row className="login-form">
          <Col span={24}>
            {isOtpEnabled ? (
              <>
                <Title level={4}>
                  Receive One-Time Password via SMS{" "}
                  <MessageOutlined size={64} color="#25D366" />
                </Title>

                <Text type="secondary">
                  We have sent 6-digit OTP to +{payload.countryCode}{" "}
                  {payload.mobile}. Please enter the code below to continue
                </Text>
                <Form
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

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="login-form-button"
                      loading={loading}
                    >
                      Verify
                    </Button>
                  </Form.Item>
                </Form>
              </>
            ) : (
              <>
                <Form
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
                  {isEdit ? (
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
                      <Input
                        addonBefore={prefixSelector}
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                  ) : (
                    <Text>
                      <Text italic>Verify this is you</Text>
                      <Title level={4} italic>
                        +91 {payload.mobile}
                      </Title>
                      <Button
                        type="link"
                        icon={<EditOutlined />}
                        onClick={() => {
                          setIsEdit(true);
                        }}
                      >
                        Edit
                      </Button>
                    </Text>
                  )}
                  <Form.Item className="next__container">
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="login-form-button"
                      loading={loading}
                    >
                      Next
                    </Button>
                  </Form.Item>
                </Form>
              </>
            )}
          </Col>
        </Row>
      </div>
    </Modal>
  );
};
