import React, { Dispatch, useEffect } from "react";
import { Tabs, theme } from "antd";
import { useBearStore } from "../../store";
import { API } from "../../api";
import { UserInfoType } from "../../types";
import { PreviewTemplate } from "../previewTemplate";
import { UserCard } from "../userCard";
import { ReviewConversation } from "../ReviewConversation";

const steps = [
  {
    title: "User Information",
    content: "User-content",
  },
  {
    title: "Template contents",
    content: "Message-content",
  },
  {
    title: "Review conversation",
    content: "Review-Conversation",
  },
];

type PreviewTemplateType = {
  onSubmit?: () => void;
};

export const TemplateAdminPreview = (props: PreviewTemplateType) => {
  const { selectedTemplate } = useBearStore.templateStore();
  console.log({ selectedTemplate });
  const { setLoading } = useBearStore.appStore();
  const { user: loggedInUser } = useBearStore.userStore();

  const [user, setUser]: [UserInfoType, Dispatch<any>] = React.useState({});
  const { token } = theme.useToken();
  const [current, setCurrent] = React.useState(1);
  console.log({ loggedInUser });
  useEffect(() => {
    getUserInfo();
  }, [selectedTemplate]);

  const onChange = (value: string) => {
    console.log("onChange:", value);
    setCurrent(Number(value));
  };

  const renderComponent = (current: number) => {
    switch (current) {
      case 1: {
        return <UserCard userInfo={user} />;
      }
      case 2: {
        return (
          <PreviewTemplate
            {...selectedTemplate}
            channel={selectedTemplate.channel}
          />
        );
      }
      case 3: {
        return (
          <div>
            <ReviewConversation
              comments={selectedTemplate.comments}
              loggedInUserId={loggedInUser.userId}
              isAdminScreen
            />
          </div>
        );
      }
      default:
        return <></>;
    }
  };

  const getUserInfo = (): any => {
    setLoading(true);
    API.adminAPI
      .getUser(selectedTemplate?.userId as string)
      .then((userInfo: UserInfoType) => {
        setUser(userInfo);
        setLoading(false);
      })
      .catch((error: Error) => {
        setLoading(false);
        console.log({ location: "getUserInfo", error });
      });
  };

  const items = steps.map((item, index) => ({
    key: `${index + 1}`,
    label: item.title,
  }));

  const contentStyle: React.CSSProperties = {
    // lineHeight: "260px",
    // height: height - 300,
    // textAlign: "center",
    color: token.colorTextTertiary,
    // backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    // border: `1px solid ${token.colorBorder}`,
    marginTop: 16,
  };

  return (
    <>
      <Tabs onChange={onChange} type="card" items={items} />

      <div style={contentStyle}>{renderComponent(current)}</div>
    </>
  );
};
