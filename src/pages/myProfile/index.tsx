import React from "react";
import {
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
  Typography,
} from "antd";
import UserIcon from "../../assets/png/user.png";
import UserProfileIcon from "../../assets/png/user-profile.png";
import {
  CheckCircleOutlined,
  EditOutlined,
  LogoutOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import "./styles.scss";
import { API } from "../../api";
import { UserInfoType } from "../../types";
import { useBearStore } from "../../store";
import { ROUTES_URL } from "../../constants";
import { useNavigate } from "react-router-dom";
import { SessionCard } from "../../components/sessionCard";

const { Title, Text } = Typography;

export const MyProfile = () => {
  const { setLoading, screen } = useBearStore.appStore();
  const { setIsAuthorized, sessions, setSession } = useBearStore.userStore();
  const [form] = Form.useForm();
  const [userInfo, setUserInfo]: [UserInfoType, React.Dispatch<any>] =
    React.useState({});
  const [isEdit, setIsEdit] = React.useState(false);
  const [isLogout, setIsLogout] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    getUserInfo();
    getUserSession();
  }, []);

  React.useEffect(() => {
    form.setFieldsValue({ ...userInfo, mobile: userInfo.mobile?.toString() });
  }, [userInfo]);

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
      })
      .catch((error) => {
        setLoading(false);
        console.log({ location: "getUserInfo", error });
      });
  };

  const getUserSession = () => {
    setLoading(true);
    API.userManagement
      .getUserSession()
      .then((session) => {
        setLoading(false);
        setSession(session);
      })
      .catch((error) => {
        setLoading(false);
        console.log({ location: "getUserSession", error });
      });
  };

  const deleteUserSession = (sessionId: string) => {
    setLoading(true);
    API.userManagement
      .deleteUserSession(sessionId)
      .then((session) => {
        setLoading(false);
        getUserSession();
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
        setIsAuthorized(false);
        navigate(ROUTES_URL.HOME);
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
              width={180}
              src={userInfo.picture || UserIcon}
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
          <Image
            width={96}
            src={userInfo.picture || UserIcon}
            rootClassName="user-icon"
          />
          <Form
            layout="vertical"
            form={form}
            name="profile"
            scrollToFirstError
            onFinish={updateUserInfo}
          >
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
                suffix={
                  userInfo.isEmailVerified ? (
                    <CheckCircleOutlined />
                  ) : (
                    <WarningOutlined />
                  )
                }
                disabled
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
              <Input
                size="large"
                type="number"
                placeholder="Mobile number"
                suffix={
                  userInfo.isMobileVerified ? (
                    <CheckCircleOutlined />
                  ) : (
                    <WarningOutlined />
                  )
                }
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
                  {screen === "MOBILE" && (
                    <Image
                      width={96}
                      src={userInfo.picture || UserIcon}
                      rootClassName="user-icon"
                    />
                  )}
                  <p>
                    <Title level={5}>Full name</Title>
                    <Text italic>{`${userInfo.firstName || ""} ${
                      userInfo.lastName || "NA"
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
                    <Space>
                      <Text italic>{userInfo.mobile || "NA"}</Text>
                      {userInfo.mobile ? (
                        <Tag
                          icon={
                            userInfo.isMobileVerified ? (
                              <CheckCircleOutlined />
                            ) : (
                              <WarningOutlined />
                            )
                          }
                          color={
                            userInfo.isMobileVerified ? "success" : "error"
                          }
                        >
                          {userInfo.isMobileVerified
                            ? "Verified"
                            : "Not verified"}
                        </Tag>
                      ) : null}
                    </Space>
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
          <Card style={cardStyle}>
            <Card.Meta
              title={<Title level={2}>User Session's</Title>}
              description={
                <div>
                  <Divider />
                  {sessions.map((session) => (
                    <SessionCard
                      {...session}
                      onLogout={() => {
                        deleteUserSession(session.sessionId);
                      }}
                    />
                  ))}
                </div>
              }
            />
          </Card>
        </div>
      )}
    </>
  );
};
