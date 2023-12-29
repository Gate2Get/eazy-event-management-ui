import React from "react";
import { Typography, Tag, Space } from "antd";
import { EventNotificationCardType } from "../../types";
import { DATE_TIME_FORMAT } from "../../constants";
import "./styles.scss";
import dayjs from "dayjs";

const { Paragraph, Link } = Typography;

export const ViewEventNotification = (props: EventNotificationCardType) => {
  const {
    contactDirectory,
    messageTemplate,
    triggerDateTime,
    contactList,
    templates,
    viewNotification,
  } = props;

  const template = templates.find(
    (template) => template.id === messageTemplate
  );
  const contacts = contactList.filter((contact) =>
    contactDirectory.includes(contact.id as string)
  );

  return (
    <>
      <div>
        <Paragraph strong>Contacts</Paragraph>
        <Paragraph>
          <Space wrap>
            {contacts?.map((contact) => (
              <Tag>{contact.name}</Tag>
            ))}
          </Space>
        </Paragraph>
      </div>
      <div>
        <Paragraph strong>Message</Paragraph>
        <Paragraph>{template?.name}</Paragraph>
      </div>
      <div>
        <Paragraph strong>Send Date and Time</Paragraph>
        <Paragraph>{dayjs(triggerDateTime).format(DATE_TIME_FORMAT)}</Paragraph>
      </div>
      <div>
        <Link onClick={viewNotification}>View</Link>
      </div>
    </>
  );
};
