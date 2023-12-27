import React from "react";
import {
  Collapse,
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  Typography,
  Radio,
  Tag,
  Space,
  Modal,
} from "antd";
import { EventNotificationCardType, EventNotificationType } from "../../types";
import { CHANNEL_OPTIONS, DATE_FORMAT, ROUTES_URL } from "../../constants";
import "./styles.scss";
import dayjs from "dayjs";

const { Paragraph } = Typography;

export const ViewEventNotification = (props: EventNotificationCardType) => {
  const {
    contactDirectory,
    name,
    messageTemplate,
    triggerDateTime,
    isEdit,
    isEditAllowed,
    contactList,
    getContactDirectory,
    getTemplates,
    onSearchContact,
    onSearchTemplate,
    onCancelEdit,
    templates,
    isContactFetching,
    isTemplateFetching,
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
          <Space>
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
        <Paragraph>{dayjs(triggerDateTime).format(DATE_FORMAT)}</Paragraph>
      </div>
    </>
  );
};
