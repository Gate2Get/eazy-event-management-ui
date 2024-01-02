import React from "react";
import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Image,
  Input,
  InputNumber,
  Popover,
  Radio,
  Row,
  Select,
  Space,
  Tag,
  Typography,
} from "antd";
import UserIcon from "../../assets/png/user.png";
import "./styles.scss";
import { API } from "../../api";
import { UserInfoType, UserLocationType } from "../../types";
import { useBearStore } from "../../store";
import { ROUTES_URL } from "../../constants";
import { useNavigate } from "react-router-dom";
import { SessionCard } from "../../components/sessionCard";
import { UserCard } from "../../components/userCard";
import LogoutIcon from "@mui/icons-material/Logout";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningIcon from "@mui/icons-material/Warning";
import { DefaultOptionType } from "antd/es/select";

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
  const [userLocation, setUserLocation]: [
    UserLocationType[],
    React.Dispatch<any>
  ] = React.useState([]);
  const [isLocationFetching, setLocationFetching] = React.useState(false);
  const [locationOptions, setLocationOptions]: [
    DefaultOptionType[],
    React.Dispatch<any>
  ] = React.useState([]);

  React.useEffect(() => {
    getUserInfo();
    getUserSession();
  }, []);

  React.useEffect(() => {
    form.setFieldsValue({
      ...userInfo,
      mobile: userInfo?.mobile ? userInfo?.mobile?.toString() : "",
      pinCode: userInfo.pinCode || "",
    });
  }, [userInfo]);

  React.useEffect(() => {
    if (isEdit) {
      getDataByPinCode(userInfo?.pinCode?.toString());
    }
  }, [isEdit]);

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
        console.log({ location: "logout", error });
      });
  };

  const updateUserInfo = (userInfo: UserInfoType) => {
    setLoading(true);
    API.userManagement
      .updateUserInfo(userInfo)
      .then((response) => {
        setLoading(false);
        setIsEdit(!isEdit);
        getUserInfo();
      })
      .catch((error) => {
        setLoading(false);
        console.log({ location: "updateUserInfo", error });
      });
  };

  const onSearchPinCode = (value: string) => {
    if (value?.length >= 6) {
      getDataByPinCode(value);
    }
  };

  const getDataByPinCode = (pinCode?: string): void => {
    setLocationFetching(true);
    API.commonAPI
      .getDataByPinCode(pinCode as string)
      .then((locationInfo: UserLocationType[]) => {
        setLocationFetching(false);
        setUserLocation(locationInfo);
        setLocationOptions(
          locationInfo.map((info) => ({
            label: info.officename,
            value: info.officename,
          }))
        );
      })
      .catch((error: Error) => {
        setLocationFetching(false);
        console.log({ location: "getDataByPinCode", error });
      });
  };

  const onSelectPinCode = (post: string) => {
    const selectedPostal = userLocation.find(
      (info) => info.officename === post
    );
    if (selectedPostal) {
      form.setFieldsValue({
        state: selectedPostal.statename,
        district: selectedPostal.districtname,
        pinCode: selectedPostal.pincode || "",
        postOffice: selectedPostal.officename,
      });
    } else {
      form.resetFields(["state", "district", "pinCode", "postOffice"]);
    }
  };

  let cardStyle = {};
  if (screen === "DESKTOP") {
    cardStyle = {
      margin: "2% 20%",
    };
  }

  return (
    <>
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
                type="email"
                placeholder="Your email address"
                suffix={
                  userInfo.isEmailVerified ? (
                    <CheckCircleIcon
                      fontSize="inherit"
                      style={{ color: "rgb(18, 183, 106)" }}
                    />
                  ) : (
                    <WarningIcon
                      fontSize="inherit"
                      style={{ color: "rgb(247, 144, 9)" }}
                    />
                  )
                }
                disabled={userInfo.isEmailVerified}
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
                type="number"
                placeholder="Mobile number"
                suffix={
                  userInfo.isMobileVerified ? (
                    <CheckCircleIcon
                      fontSize="inherit"
                      style={{ color: "rgb(18, 183, 106)" }}
                    />
                  ) : (
                    <WarningIcon
                      fontSize="inherit"
                      style={{ color: "rgb(247, 144, 9)" }}
                    />
                  )
                }
                disabled={userInfo.isMobileVerified}
              />
            </Form.Item>
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[
                { required: false, message: "Please input your first name!" },
              ]}
            >
              <Input placeholder="Enter your first name" />
            </Form.Item>
            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[
                { required: false, message: "Please input your last name!" },
              ]}
            >
              <Input placeholder="Enter your last name" />
            </Form.Item>
            <Form.Item
              label="Gender"
              name="gender"
              rules={[{ required: false, message: "Please choose gender!" }]}
            >
              <Radio.Group>
                <Radio.Button value="M">Male</Radio.Button>
                <Radio.Button value="F">Female</Radio.Button>
                <Radio.Button value="NA">Not preferred</Radio.Button>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              label="Postal office (eg: 600001)"
              name="postOffice"
              rules={[
                { required: false, message: "Please input your pincode!" },
              ]}
            >
              <Select
                placeholder="Your pincode (eg: 600001)"
                allowClear
                showSearch
                options={locationOptions}
                loading={isLocationFetching}
                onSearch={onSearchPinCode}
                filterOption={false}
                onSelect={onSelectPinCode}
              />
            </Form.Item>

            <Form.Item
              label="Pincode"
              name="pinCode"
              rules={[
                { required: false, message: "Please input your pincode!" },
              ]}
            >
              <Input placeholder="Your pincode" disabled />
            </Form.Item>

            <Form.Item
              label="District"
              name="district"
              rules={[
                { required: false, message: "Please input your district!" },
              ]}
            >
              <Input placeholder="Your district" disabled />
            </Form.Item>

            <Form.Item
              label="State"
              name="state"
              rules={[
                { required: false, message: "Please select your state!" },
              ]}
            >
              <Input placeholder="Your state" disabled />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Save changes
              </Button>
              <Button
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
          <UserCard
            userInfo={userInfo}
            title={<Title level={3}>Personal Information</Title>}
            action={[
              <Button
                type="text"
                onClick={() => {
                  setIsEdit(!isEdit);
                }}
                icon={<EditIcon fontSize="inherit" key="edit" />}
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
                <Button type="text" icon={<LogoutIcon fontSize="inherit" />}>
                  Logout
                </Button>
              </Popover>,
            ]}
          />
          <Card style={cardStyle}>
            <Card.Meta
              title={<Title level={3}>User Session's</Title>}
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
