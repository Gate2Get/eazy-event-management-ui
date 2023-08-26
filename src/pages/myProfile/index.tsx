import React from "react";
import { Avatar, Button, Form, Image, Input, Radio, Row, Select } from "antd";
import UserIcon from "../../assets/png/user.png";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import "./styles.scss";
import { API } from "../../api";
import { UserInfoType } from "../../types";

export const MyProfile = () => {
  const [form] = Form.useForm();
  const [userInfo, setUserInfo]: [UserInfoType, React.Dispatch<any>] =
    React.useState({});

  React.useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = () => {
    API.userManagement.getUserInfo().then((userInfo) => {
      setUserInfo(userInfo);
      form.setFieldsValue(userInfo);
    });
  };

  const updateUserInfo = (userInfo: UserInfoType) => {
    API.userManagement.updateUserInfo(userInfo).then((response) => {});
  };

  return (
    <div className="my-profile__container">
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
        </Form.Item>
      </Form>
    </div>
  );
};
