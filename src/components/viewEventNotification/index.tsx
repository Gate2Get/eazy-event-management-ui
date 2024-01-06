import React from "react";
import { Typography, Tag, Space, Alert, Button } from "antd";
import { EventNotificationCardType } from "../../types";
import { DATE_TIME_FORMAT, EVENT_STATUS, ROUTES_URL } from "../../constants";
import "./styles.scss";
import dayjs from "dayjs";
import { useBearStore } from "../../store";
import { useNavigate } from "react-router-dom";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const { Paragraph, Link, Text } = Typography;

export const ViewEventNotification = (props: EventNotificationCardType) => {
  const {
    contactDirectory,
    messageTemplate,
    triggerDateTime,
    contactList,
    templates,
    price = 0,
    status,
    viewNotification,
  } = props;

  const navigate = useNavigate();

  const { user } = useBearStore.userStore();
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
              <Tag color="success">{contact.name}</Tag>
            ))}
          </Space>
        </Paragraph>
      </div>
      <div>
        <Paragraph strong>Message</Paragraph>
        <Paragraph style={{ color: "rgb(102, 112, 133)" }}>
          {template?.name}
        </Paragraph>
      </div>
      <div>
        <Paragraph strong>Send Date and Time</Paragraph>
        <Paragraph style={{ color: "rgb(102, 112, 133)" }}>
          {dayjs(triggerDateTime).format(DATE_TIME_FORMAT)}
        </Paragraph>
      </div>
      <div>
        <Paragraph strong>
          {status === EVENT_STATUS.NOT_STARTED
            ? "Estimated credits required to send notification"
            : "Credit spend on this notification"}{" "}
          : <Text style={{ color: "rgb(102, 112, 133)" }}>{price}</Text>
        </Paragraph>

        {status === EVENT_STATUS.NOT_STARTED &&
          price > (user?.walletBalance as number) && (
            <Alert
              message={
                <>
                  You don't have enough credit to send this notification.
                  <Button
                    type="link"
                    style={{ padding: "4px" }}
                    onClick={() => {
                      navigate(`${ROUTES_URL.EE}/${ROUTES_URL.WALLET}`);
                    }}
                  >
                    Click here
                  </Button>
                  to add credit to the wallet.
                </>
              }
              type="error"
              style={{ marginBottom: "8px" }}
            />
          )}
      </div>
      <div>
        <Button
          icon={<OpenInNewIcon fontSize="inherit" />}
          type="link"
          onClick={viewNotification}
          className="app-link"
        >
          View notification
        </Button>
      </div>
    </>
  );
};
