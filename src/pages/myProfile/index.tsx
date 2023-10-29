import React from "react";
import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Form,
  Image,
  Input,
  Popover,
  Radio,
  Row,
  Select,
  Space,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import UserIcon from "../../assets/png/user.png";
import UserProfileIcon from "../../assets/png/user-profile.png";
import {
  CheckCircleOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  LogoutOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import "./styles.scss";
import { API } from "../../api";
import { UserInfoType } from "../../types";
import { useBearStore } from "../../store";
import { useWindowSize } from "../../hooks/useWindowSize";

const { Title, Text } = Typography;

export const MyProfile = () => {
  const { setLoading, screen } = useBearStore.appStore();
  const [form] = Form.useForm();
  const [userInfo, setUserInfo]: [UserInfoType, React.Dispatch<any>] =
    React.useState({});
  const [isEdit, setIsEdit] = React.useState(false);
  const [isLogout, setIsLogout] = React.useState(false);

  React.useEffect(() => {
    getUserInfo();
  }, []);

  const hideLogout = () => {
    setIsLogout(false);
  };

  const handleLogoutOpenChange = (newOpen: boolean) => {
    setIsLogout(newOpen);
  };

  const getUserInfo = () => {
    setLoading(true);
    API.userManagement
      .getUserInfo()
      .then((userInfo) => {
        setLoading(false);
        setUserInfo(userInfo);
        form.setFieldsValue(userInfo);
      })
      .catch((error) => {
        setLoading(false);
        console.log({ location: "getUserInfo", error });
      });
  };

  const logout = () => {
    setLoading(true);
    API.userManagement
      .logout()
      .then((isLoggedOut) => {
        setLoading(false);
        setIsLogout(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log({ location: "getUserInfo", error });
      });
  };

  const updateUserInfo = (userInfo: UserInfoType) => {
    setLoading(true);
    API.userManagement
      .updateUserInfo(userInfo)
      .then((response) => {
        setLoading(false);
        setIsEdit(!isEdit);
      })
      .catch((error) => {
        setLoading(false);
        console.log({ location: "updateUserInfo", error });
      });
  };

  let cardStyle = {};
  if (screen === "DESKTOP") {
    cardStyle = {
      margin: "2% 20%",
    };
  }

  return (
    <>
      <Row style={screen === "DESKTOP" ? { margin: "2% 15%" } : {}}>
        {screen === "DESKTOP" && (
          <Col>
            <Image
              preview={false}
              width={200}
              src={UserProfileIcon}
              style={{ padding: "20px" }}
            />
          </Col>
        )}
        <Col style={{ padding: "20px" }}>
          <Title level={3}>Hi {userInfo.firstName}, </Title>
          <Text>
            View and manage your personal information, security and preferences
            here.
          </Text>
        </Col>
      </Row>
      {isEdit ? (
        <div className="my-profile__container" style={cardStyle}>
          <Image width={96} src={UserIcon} rootClassName="user-icon" />
          <Form
            layout="vertical"
            form={form}
            name="profile"
            scrollToFirstError
            onFinish={updateUserInfo}
          >
            <Form.Item
              label="Mobile Number"
              name="mobile"
              rules={[
                {
                  required: false,
                  message: "Please input your mobile number!",
                },
              ]}
            >
              <Input
                size="large"
                type="number"
                placeholder="Mobile number"
                disabled
              />
            </Form.Item>
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[
                { required: false, message: "Please input your first name!" },
              ]}
            >
              <Input size="large" placeholder="Enter your first name" />
            </Form.Item>
            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[
                { required: false, message: "Please input your last name!" },
              ]}
            >
              <Input size="large" placeholder="Enter your last name" />
            </Form.Item>
            <Form.Item
              label="Gender"
              name="gender"
              rules={[{ required: false, message: "Please choose gender!" }]}
            >
              <Radio.Group size="large">
                <Radio.Button value="M">Male</Radio.Button>
                <Radio.Button value="F">Female</Radio.Button>
                <Radio.Button value="NA">Not preferred</Radio.Button>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              label="State"
              name="state"
              rules={[
                { required: false, message: "Please select your state!" },
              ]}
            >
              <Select size="large" placeholder="Your state" />
            </Form.Item>

            <Form.Item
              label="City"
              name="city"
              rules={[{ required: false, message: "Please select your city!" }]}
            >
              <Select size="large" placeholder="Your city" />
            </Form.Item>

            <Form.Item
              label="Email address"
              name="email"
              rules={[
                {
                  required: false,
                  message: "Please input your email address!",
                },
              ]}
            >
              <Input
                size="large"
                type="email"
                placeholder="Your email address"
                suffix={<ExclamationCircleOutlined />}
              />
            </Form.Item>
            <Form.Item>
              <Button size="large" type="primary" htmlType="submit">
                Save changes
              </Button>
              <Button
                size="large"
                type="default"
                onClick={() => {
                  setIsEdit(!isEdit);
                }}
                style={{ marginLeft: "12px" }}
              >
                Cancel
              </Button>
            </Form.Item>
          </Form>
        </div>
      ) : (
        <div className="my-profile__container">
          <Card
            style={cardStyle}
            // cover={
            //   <Image
            //     src={UserIcon}
            //     preview={false}
            //     rootClassName="user-icon-view"
            //   />
            // }
            actions={[
              <Button
                type="text"
                onClick={() => {
                  setIsEdit(!isEdit);
                }}
                icon={<EditOutlined key="edit" />}
              >
                Edit
              </Button>,
              <Popover
                content={
                  <>
                    <Button type="link" onClick={logout}>
                      Yes
                    </Button>{" "}
                    <Button type="text" onClick={hideLogout}>
                      No
                    </Button>
                  </>
                }
                title="Logout"
                trigger="click"
                open={isLogout}
                onOpenChange={handleLogoutOpenChange}
              >
                <Button type="text" icon={<LogoutOutlined />}>
                  Logout
                </Button>
              </Popover>,
            ]}
          >
            <Card.Meta
              title={<Title level={2}>Personal Information</Title>}
              description={
                <div>
                  <Divider />
                  <p>
                    <Title level={5}>Full name</Title>
                    <Text italic>{`${userInfo.firstName || ""} ${
                      userInfo.lastName || ""
                    }`}</Text>
                  </p>
                  <p>
                    <Title level={5}>State</Title>
                    <Text italic>{userInfo.state || "NA"}</Text>
                  </p>
                  <p>
                    <Title level={5}>Email Address</Title>
                    <Space>
                      <Text italic>{userInfo.email || "NA"}</Text>
                      {userInfo.email && (
                        <Tag
                          icon={
                            userInfo.isEmailVerified ? (
                              <CheckCircleOutlined />
                            ) : (
                              <WarningOutlined />
                            )
                          }
                          color={userInfo.isEmailVerified ? "success" : "error"}
                        >
                          {userInfo.isEmailVerified
                            ? "Verified"
                            : "Not verified"}
                        </Tag>
                      )}
                    </Space>
                  </p>
                  <p>
                    <Title level={5}>Mobile Number</Title>
                    <Text italic>{userInfo.mobile}</Text>
                  </p>
                  <p>
                    <Title level={5}>City</Title>
                    <Text italic>{userInfo.city || "NA"}</Text>
                  </p>
                  <p>
                    <Title level={5}>Gender</Title>
                    <Text italic>{userInfo.gender || "NA"}</Text>
                  </p>
                </div>
              }
            />
          </Card>
        </div>
      )}
    </>
  );
};
