import React from "react";
import { Typography, Tag, Space, Alert, Button } from "antd";
import { EventNotificationCardType } from "../../types";
import {
  CHANNEL_OPTIONS,
  DATE_TIME_FORMAT,
  EVENT_STATUS,
  PRICE_CONFIG,
  ROUTES_URL,
} from "../../constants";
import "./styles.scss";
import dayjs from "dayjs";
import { useBearStore } from "../../store";
import { useNavigate } from "react-router-dom";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import SendIcon from "@mui/icons-material/Send";

const { Paragraph, Link, Text } = Typography;

const channelMap: any = {};
CHANNEL_OPTIONS.forEach((channel) => {
  channelMap[channel.value] = channel.label;
});

export const ViewEventNotification = (props: EventNotificationCardType) => {
  const {
    contactDirectory,
    messageTemplate,
    triggerDateTime,
    contactList,
    templates,
    price = 0,
    status,
    channel,
    viewNotification,
    sendNotification,
  } = props;

  const navigate = useNavigate();

  const { user, activePlan } = useBearStore.userStore();
  const template = templates.find(
    (template) => template.id === messageTemplate
  );
  const contacts = contactList.filter((contact) =>
    contactDirectory.includes(contact.id as string)
  );

  const channelPriceMap: any = activePlan?.pricingPlan;

  return (
    <>
      <div>
        <Paragraph strong>Contacts</Paragraph>
        <Paragraph>
          <Space wrap>
            {contacts?.map((contact) => (
              <Tag bordered={false}>{contact.name}</Tag>
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
        <Paragraph strong>Channel</Paragraph>
        <Paragraph style={{ color: "rgb(102, 112, 133)" }}>
          {channelMap[channel as string]}
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
          {[EVENT_STATUS.NOT_STARTED, EVENT_STATUS.NO_CREDITS].includes(
            status as string
          )
            ? "Estimated credits to send notification"
            : "Credit utilized on this notification"}{" "}
          :{" "}
          <Text style={{ color: "rgb(102, 112, 133)" }}>
            {parseFloat(price?.toString())}
          </Text>
        </Paragraph>

        {[EVENT_STATUS.NOT_STARTED, EVENT_STATUS.NO_CREDITS].includes(
          status as string
        ) &&
          price > (activePlan?.notificationCredit as number) && (
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
                  to buy a new plan.
                </>
              }
              type="error"
              style={{ marginBottom: "8px" }}
            />
          )}
      </div>
      <Space size="large">
        <Button
          icon={<OpenInNewIcon fontSize="inherit" />}
          type="link"
          onClick={viewNotification}
          className="app-link"
          style={{ padding: "0px" }}
        >
          View notification
        </Button>
        {(activePlan?.notificationCredit as number) >=
          channelPriceMap?.[PRICE_CONFIG[channel as string]] && (
          <Button
            icon={<SendIcon fontSize="inherit" />}
            type="link"
            onClick={sendNotification}
            className="app-link"
            style={{ padding: "0px" }}
          >
            Send to me
          </Button>
        )}
      </Space>
    </>
  );
};
