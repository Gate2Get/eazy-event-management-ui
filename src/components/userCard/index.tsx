import React from "react";
import {
  CheckCircleOutlined,
  EditOutlined,
  LogoutOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Divider,
  Image,
  Popover,
  Space,
  Tag,
  Typography,
} from "antd";
import { useBearStore } from "../../store";
import { UserInfoType } from "../../types";
import UserIcon from "../../assets/png/user.png";

const { Text, Title } = Typography;

type UserCardType = {
  userInfo: UserInfoType;
  action?: React.ReactNode[];
  title?: React.ReactNode;
};

export const UserCard = (props: UserCardType) => {
  const { userInfo, action, title } = props;
  const { setIsAuthorized, sessions, setSession } = useBearStore.userStore();
  const { screen } = useBearStore.appStore();

  let cardStyle = {};
  if (screen === "DESKTOP") {
    cardStyle = {
      margin: "2% 20%",
    };
  }
  return (
    <div>
      <Card style={cardStyle} actions={action}>
        <Card.Meta
          title={title}
          description={
            <div>
              <Divider />
              <Image
                width={96}
                src={userInfo.picture || UserIcon}
                rootClassName="user-icon"
              />

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
                      {userInfo.isEmailVerified ? "Verified" : "Not verified"}
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
                      color={userInfo.isMobileVerified ? "success" : "error"}
                    >
                      {userInfo.isMobileVerified ? "Verified" : "Not verified"}
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
    </div>
  );
};
