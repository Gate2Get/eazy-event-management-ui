import React from "react";
import { Button, Col, message, Row, Steps, Tabs, theme } from "antd";
import { useBearStore } from "../../store";
import {
  EVENT_TYPES,
  EVENT_STATUS,
  EDITABLE_EVENT_STATUS,
  EVENT_YET_TO_START_STATUS,
} from "../../constants";
import { MarriageEventCard } from "../marriageEventCard";
import { BirthdayEventCard } from "../birthdayEventCard";
import { ContactUserCard } from "../contactUserCard";
import { API } from "../../api";
import {
  ContactDirectoryType,
  ContactListType,
  TemplateType,
} from "../../types";
import { useWindowSize } from "../../hooks/useWindowSize";
import { OtherEventCard } from "../otherEventCard";
import { PreviewTemplate } from "../previewTemplate";
import { PreviewContact } from "../previewContact";

type PreviewEventType = {
  onSubmit?: () => void;
  isEditable?: boolean;
};

const STEPS_EDITABLE = [
  {
    title: "Event Information",
    content: "First-content",
  },
  {
    title: "Message",
    content: "Second-content",
  },
  {
    title: "Contacts",
    content: "Last-content",
  },
];

export const PreviewEvent = (props: PreviewEventType) => {
  const { onSubmit, isEditable } = props;
  const { selectedEvents } = useBearStore.eventStore();
  const { selectedTemplate, setSelectedTemplate } =
    useBearStore.templateStore();
  const { contactList, setContactList } = useBearStore.contactStore();
  const { screen, setLoading } = useBearStore.appStore();
  const { token } = theme.useToken();
  const [current, setCurrent] = React.useState(1);

  React.useEffect(() => {
    if (selectedEvents.name) {
      console.log(!selectedEvents.status, selectedEvents.status);
      if (
        !selectedEvents.status ||
        EVENT_YET_TO_START_STATUS.includes(selectedEvents.status)
      ) {
        getTemplatesById();
        getContactById();
      } else {
        getEventContacts();
        getEventTemplate();
      }
    }
  }, [selectedEvents]);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const onChange = (value: number) => {
    setCurrent(value);
  };

  const renderComponent = (current: number) => {
    console.log({ current, selectedEvents });
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
        return (
          <PreviewTemplate
            {...selectedTemplate}
            channel={selectedEvents.channel}
          />
        );
      }
      case 3: {
        return <PreviewContact contactList={contactList} />;
      }

      default:
        return <></>;
    }
  };

  const getTemplatesById = (): void => {
    setLoading(true);
    API.templateManagement
      .getTemplateById(selectedEvents.messageTemplate)
      .then((template: TemplateType) => {
        setSelectedTemplate(template);
        setLoading(false);
      })
      .catch((error: Error) => {
        setLoading(false);
        console.log({ location: "getTemplatesById", error });
      });
  };

  const getEventTemplate = (): void => {
    setLoading(true);
    API.eventManagement
      .getEventTemplate(selectedEvents.id)
      .then((template: TemplateType) => {
        setSelectedTemplate(template);
        setLoading(false);
      })
      .catch((error: Error) => {
        setLoading(false);
        console.log({ location: "getEventTemplate", error });
      });
  };

  const getEventContacts = (): void => {
    setLoading(true);
    API.eventManagement
      .getEventContacts(selectedEvents.id)
      .then((contact) => {
        setContactList(contact);
        setLoading(false);
      })
      .catch((error: Error) => {
        setLoading(false);
        console.log({ location: "getEventContacts", error });
      });
  };

  const getContactById = (): any => {
    setLoading(true);
    API.contactManagement
      .getContactList(selectedEvents.contactDirectory)
      .then((contactList: ContactDirectoryType) => {
        setLoading(false);
        const _contactList =
          contactList?.contacts?.map((contact) => ({
            id: contact.id,
            name: contact.name,
            key: contact?.id,
            senderId: contact?.senderId as string,
            status: 4,
          })) || [];
        setContactList(_contactList);
      })
      .catch((error: Error) => {
        setLoading(false);
        console.log({ location: "getContactList", error });
      });
  };

  const steps = [...STEPS_EDITABLE];

  const items = steps.map((item, index) => ({
    key: `${index + 1}`,
    label: item.title,
    title: item.title,
  }));

  const contentStyle: React.CSSProperties = {
    // lineHeight: "260px",
    // height: height - 300,
    textAlign: "center",
    color: token.colorTextTertiary,
    // backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    // border: `1px solid ${token.colorBorder}`,
    marginTop: 16,
  };

  return (
    <>
      {isEditable ? (
        <Steps
          current={current - 1}
          items={items}
          onChange={onChange}
          responsive
        />
      ) : (
        <Tabs
          onChange={(value) => {
            onChange(Number(value));
          }}
          type="card"
          items={items}
        />
      )}
      <div style={contentStyle}>{renderComponent(current)}</div>
      {isEditable && (
        <div style={{ marginTop: 16 }}>
          {current > 1 && (
            <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
              Previous
            </Button>
          )}
          {current < steps.length && (
            <Button type="primary" onClick={() => next()}>
              Next
            </Button>
          )}
          {current === steps.length && onSubmit && (
            <Button type="primary" onClick={onSubmit}>
              Submit
            </Button>
          )}
        </div>
      )}
    </>
  );
};
