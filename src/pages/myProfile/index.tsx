import React from "react";
import { Avatar, Button, Form, Image, Input, Radio, Row } from "antd";
import UserIcon from "../../assets/png/user.png";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import "./styles.scss";

export const MyProfile = () => {
  const [form] = Form.useForm();
  return (
    <div className="my-profile__container">
      <Image width={96} src={UserIcon} rootClassName="user-icon" />
      <Form layout="vertical" form={form}>
        <Form.Item
          label="Mobile Number"
          name="mobile"
          rules={[
            { required: true, message: "Please input your mobile number!" },
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
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input size="large" placeholder="Enter your name" />
        </Form.Item>
        <Form.Item
          label="Gender"
          name="gender"
          rules={[{ required: true, message: "Please choose gender!" }]}
        >
          <Radio.Group size="large">
            <Radio.Button value="M">Male</Radio.Button>
            <Radio.Button value="F">Female</Radio.Button>
            <Radio.Button value="NA">Not preferred</Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="Email address"
          name="email"
          rules={[
            { required: true, message: "Please input your email address!" },
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
          <Button size="large" type="primary">
            Save changes
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
