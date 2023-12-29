import React from "react";
import { Button, Modal, Tabs, theme } from "antd";
import { useBearStore } from "../../store";
import { API } from "../../api";
import { EventNotificationType, EventType, TemplateType } from "../../types";
import { PreviewTemplate } from "../previewTemplate";
import { PreviewContact } from "../previewContact";
import { checkIsPdf } from "../../utils/validation.utils";

type PreviewEventType = {
  onSubmit?: () => void;
  isEditable?: boolean;
  previewOpen?: boolean;
  setPreviewClose?: () => void;
};

const STEPS_EDITABLE = [
  {
    title: "Contacts",
    content: "Last-content",
  },
];

export const PreviewEvent = (props: PreviewEventType) => {
  const { previewOpen, setPreviewClose } = props;
  const { selectedEvents, isEdit, setIsEdit } = useBearStore.eventStore();
  const { selectedTemplate, setSelectedTemplate } =
    useBearStore.templateStore();
  const { contactList, setContactList } = useBearStore.contactStore();
  const { screen, setLoading } = useBearStore.appStore();
  const { token } = theme.useToken();
  const [current, setCurrent] = React.useState(1);
  const [previewUrl, setPreviewUrl] = React.useState("");
  const [previewTitle, setPreviewTitle] = React.useState("");

  React.useEffect(() => {
    if (previewOpen) {
      getEventContacts();
      setIsEdit(false);
    }
  }, [selectedEvents, previewOpen]);

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
    switch (current) {
      case 1: {
        return (
          <PreviewContact
            contactList={contactList}
            showStatus={false}
            setContactList={setContactList}
            isEditable
            onUpdateContact={updateEventContacts}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
          />
        );
      }
      default:
        return <></>;
    }
  };

  const getEventContacts = (): void => {
    setLoading(true);
    API.eventManagement
      .getEventContact(selectedEvents.id as string)
      .then((contact) => {
        setContactList(contact);
        setLoading(false);
      })
      .catch((error: Error) => {
        setLoading(false);
        console.log({ location: "getEventContacts", error });
      });
  };

  const updateEventContacts = (): void => {
    setLoading(true);
    API.eventManagement
      .updateEventContact(selectedEvents.id as string, contactList)
      .then((contact) => {
        setLoading(false);
        setPreviewClose?.();
      })
      .catch((error: Error) => {
        setLoading(false);
        console.log({ location: "updateEventContacts", error });
      });
  };

  const steps = STEPS_EDITABLE;

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

  let isPdf = false;
  if (previewUrl) {
    isPdf = checkIsPdf(previewUrl);
  }

  return (
    <>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        width="100%"
        onCancel={setPreviewClose}
      >
        {/* {selectedEvents?.invitationAttachment?.map((invitation) => (
          <div>
            {checkIsPdf(invitation.url) ? (
              <PdfViewer url={invitation.url} />
            ) : (
              <img
                alt="example"
                style={{ width: "100%" }}
                src={invitation.url}
              />
            )}
          </div>
        ))} */}
        <>
          <Tabs
            onChange={(value) => {
              onChange(Number(value));
            }}
            type="card"
            items={items}
          />

          <div style={contentStyle}>{renderComponent(current)}</div>
          {/* {
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
          } */}
        </>
      </Modal>
    </>
  );
};
