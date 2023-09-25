import React from "react";
import { Button, Col, message, Row, Steps, theme } from "antd";
import { useBearStore } from "../../store";
import { EVENT_TYPES, EVENT_STATUS } from "../../constants";
import { MarriageEventCard } from "../marriageEventCard";
import { BirthdayEventCard } from "../birthdayEventCard";
import { ContactUserCard } from "../contactUserCard";
import { API } from "../../api";
import { ContactListType, TemplateType } from "../../types";
import { useWindowSize } from "../../hooks/useWindowSize";

const steps = [
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

type PreviewEventType = {
  onSubmit?: () => void;
};

export const PreviewEvent = (props: PreviewEventType) => {
  const { onSubmit } = props;
  const { selectedEvents } = useBearStore.eventStore();
  const { selectedTemplate, setSelectedTemplate } =
    useBearStore.templateStore();
  const { contactList, setContactList } = useBearStore.contactStore();
  const { screen, setLoading } = useBearStore.appStore();
  const { token } = theme.useToken();
  const [current, setCurrent] = React.useState(1);
  const { height } = useWindowSize();

  React.useEffect(() => {
    if (selectedEvents.name) {
      getTemplatesById();
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

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const onChange = (value: number) => {
    console.log("onChange:", value);
    setCurrent(value + 1);
  };

  const renderComponent = (current: number) => {
    console.log({ current, selectedEvents });
    switch (current) {
      case 1: {
        if (selectedEvents.type === EVENT_TYPES.MARRIAGE)
          return <MarriageEventCard {...selectedEvents} />;
        else if (selectedEvents.type === EVENT_TYPES.BIRTHDAY)
          return <BirthdayEventCard {...selectedEvents} />;
      }
      case 2: {
        return (
          <>
            <div
              dangerouslySetInnerHTML={{ __html: selectedTemplate.message }}
            />
          </>
        );
      }
      case 3: {
        return (
          <Row gutter={[16, 16]}>
            {contactList.map((contact) => (
              <Col span={screen === "MOBILE" ? 24 : 8} key={contact.id}>
                <ContactUserCard
                  mobile={contact.mobile}
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
        console.log({ location: "contact", error });
      });
  };

  const getContactList = (id: string): any => {
    setLoading(true);
    API.contactManagement
      .getContactList(id)
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

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const contentStyle: React.CSSProperties = {
    // lineHeight: "260px",
    height: height - 300,
    textAlign: "center",
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px solid ${token.colorBorder}`,
    marginTop: 16,
  };

  return (
    <>
      <Steps
        current={current - 1}
        items={items}
        onChange={onChange}
        responsive
      />
      <div style={contentStyle}>{renderComponent(current)}</div>
      <div style={{ marginTop: 24 }}>
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
    </>
  );
};
