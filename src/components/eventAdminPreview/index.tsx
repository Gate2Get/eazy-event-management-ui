import React, { Dispatch } from "react";
import { Button, Col, message, Row, Steps, Tabs, theme } from "antd";
import { useBearStore } from "../../store";
import { EVENT_TYPES, EVENT_STATUS } from "../../constants";
import { MarriageEventCard } from "../marriageEventCard";
import { BirthdayEventCard } from "../birthdayEventCard";
import { ContactUserCard } from "../contactUserCard";
import { API } from "../../api";
import { ContactListType, TemplateType, UserInfoType } from "../../types";
import { useWindowSize } from "../../hooks/useWindowSize";
import { OtherEventCard } from "../otherEventCard";
import { PreviewTemplate } from "../previewTemplate";
import { UserCard } from "../userCard";

const steps = [
  {
    title: "Event Information",
    content: "Event-content",
  },
  {
    title: "User Information",
    content: "User-content",
  },
  {
    title: "Message",
    content: "Message-content",
  },
  {
    title: "Contacts",
    content: "Contacts-content",
  },
];

type PreviewEventType = {
  onSubmit?: () => void;
};

export const EventAdminPreview = (props: PreviewEventType) => {
  const { onSubmit } = props;
  const { selectedEvents } = useBearStore.eventStore();
  const { selectedTemplate, setSelectedTemplate } =
    useBearStore.templateStore();
  const { contactList, setContactList } = useBearStore.contactStore();
  const { screen, setLoading } = useBearStore.appStore();
  const [user, setUser]: [UserInfoType, Dispatch<any>] = React.useState({});
  const { token } = theme.useToken();
  const [current, setCurrent] = React.useState(1);
  const { height } = useWindowSize();

  React.useEffect(() => {
    if (selectedEvents.name) {
      if (selectedEvents.messageTemplate) {
        getTemplatesById();
      }
      if (selectedEvents.userId) {
        getUserInfo();
      }
      if (
        !selectedEvents.status ||
        selectedEvents.status === EVENT_STATUS.NOT_STARTED
      ) {
        getContactList(selectedEvents.contactDirectory);
      } else {
        getEventContacts();
      }
    }
  }, [selectedEvents]);

  const onChange = (value: string) => {
    console.log("onChange:", value);
    setCurrent(Number(value));
  };

  const renderComponent = (current: number) => {
    switch (current) {
      case 1: {
        if (selectedEvents.type === EVENT_TYPES.MARRIAGE)
          return <MarriageEventCard {...selectedEvents} />;
        else if (selectedEvents.type === EVENT_TYPES.BIRTHDAY)
          return <BirthdayEventCard {...selectedEvents} />;
        else if (selectedEvents.type === EVENT_TYPES.OTHERS)
          return <OtherEventCard {...selectedEvents} />;
      }
      case 2: {
        return <UserCard userInfo={user} />;
      }
      case 3: {
        return (
          <PreviewTemplate
            {...selectedTemplate}
            channel={selectedEvents.channel}
          />
        );
      }
      case 4: {
        return (
          <Row gutter={[16, 16]}>
            {contactList.map((contact) => (
              <Col span={screen === "MOBILE" ? 24 : 8} key={contact.id}>
                <ContactUserCard
                  senderId={contact.senderId}
                  name={contact.name}
                  id={contact.id}
                  status={contact.status}
                />
              </Col>
            ))}
          </Row>
        );
      }

      default:
        return <></>;
    }
  };

  const getTemplatesById = (): void => {
    setLoading(true);
    API.adminAPI
      .getEventTemplate(selectedEvents.id)
      .then((template: TemplateType) => {
        setSelectedTemplate(template);
        setLoading(false);
      })
      .catch((error: Error) => {
        setLoading(false);
        console.log({ location: "getTemplatesById", error });
      });
  };

  const getEventContacts = (): void => {
    setLoading(true);
    API.adminAPI
      .getEventContacts(selectedEvents.id)
      .then((contact) => {
        setContactList(contact);
        setLoading(false);
      })
      .catch((error: Error) => {
        setLoading(false);
        console.log({ location: "contact", error });
      });
  };

  const getContactList = (id: string): any => {
    setLoading(true);
    API.adminAPI
      .getEventContacts(id)
      .then((contacts: ContactListType[]) => {
        setLoading(false);
        setContactList(
          contacts.map((contact) => ({
            ...contact,
            key: contact.id,
            status: 4,
          }))
        );
      })
      .catch((error: Error) => {
        setLoading(false);
        console.log({ location: "getContactList", error });
      });
  };

  const getUserInfo = (): any => {
    setLoading(true);
    API.adminAPI
      .getUser(selectedEvents.userId)
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
