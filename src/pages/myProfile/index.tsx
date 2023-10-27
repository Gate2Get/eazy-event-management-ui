import React from "react";
import {
  Avatar,
  Button,
  Card,
  Form,
  Image,
  Input,
  Popover,
  Radio,
  Row,
  Select,
  Tooltip,
} from "antd";
import UserIcon from "../../assets/png/user.png";
import {
  CheckCircleOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import "./styles.scss";
import { API } from "../../api";
import { UserInfoType } from "../../types";
import { useBearStore } from "../../store";
import { useWindowSize } from "../../hooks/useWindowSize";

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
      margin: "2% 30%",
    };
  }

  return isEdit ? (
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
            { required: false, message: "Please input your mobile number!" },
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
          rules={[{ required: false, message: "Please input your last name!" }]}
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
          rules={[{ required: false, message: "Please select your state!" }]}
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
            { required: false, message: "Please input your email address!" },
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
        cover={
          <Image
            src={UserIcon}
            preview={false}
            rootClassName="user-icon-view"
          />
        }
        actions={[
          <EditOutlined
            key="edit"
            onClick={() => {
              setIsEdit(!isEdit);
            }}
          />,
          <Popover
            content={
              <>
                <Button type="link">Yes</Button>{" "}
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
            <LogoutOutlined />
          </Popover>,
        ]}
      >
        <Card.Meta
          title={`${userInfo.firstName || ""} ${userInfo.lastName || ""}`}
          description={
            <div>
              <p>
                <strong>State:</strong> {userInfo.state}
              </p>
              <p>
                <strong>Email:</strong> {userInfo.email}{" "}
                {userInfo.email ? (
                  <Tooltip
                    placement="rightTop"
                    title={
                      userInfo.isEmailVerified ? "Verified" : "Not verified"
                    }
                  >
                    {userInfo.isEmailVerified ? (
                      <CheckCircleOutlined color="#22C55E" />
                    ) : (
                      <ExclamationCircleOutlined color="#EF4444" />
                    )}
                  </Tooltip>
                ) : (
                  ""
                )}
              </p>
              <p>
                <strong>Mobile:</strong> {userInfo.mobile}
              </p>
              <p>
                <strong>City:</strong> {userInfo.city}
              </p>
              <p>
                <strong>Gender:</strong> {userInfo.gender}
              </p>
            </div>
          }
        />
      </Card>
    </div>
  );
};
