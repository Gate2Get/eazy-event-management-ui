import React from "react";
import { Card, Typography } from "antd";
import { TemplateType, VoiceMessageTemplateType } from "../../types";
import { useBearStore } from "../../store";
import { getFormattedMessage } from "../../utils/common.utils";

const { Paragraph, Text, Title } = Typography;
const { Meta } = Card;

export const PreviewTemplate = (props: TemplateType) => {
  const { screen } = useBearStore.appStore();
  console.log({ props });
  const { message, type, name, channel } = props;

  let cardStyle = {};
  if (screen === "DESKTOP") {
    cardStyle = {
      margin: "2% 20%",
      textAlign: "left",
    };
  }

  const renderTemplate = () => {
    if (!message) {
      return <></>;
    }
    switch (channel) {
      case "VOICE_CALL": {
        const messagesObj: Record<string, VoiceMessageTemplateType> =
          JSON.parse(message);
        return Object.values(messagesObj).map(
          (msg: VoiceMessageTemplateType) => {
            if (msg.type === "TEXT") {
              return (
                <Paragraph
                // ellipsis={{ rows: 2, expandable: true, symbol: "more" }}
                >
                  <Card>{msg.value}</Card>
                </Paragraph>
              );
            } else if (msg.type === "AUDIO") {
              return (
                <Card>
                  <audio src={msg.value} controls style={{ width: "100%" }} />
                </Card>
              );
            }
          }
        );
      }

      default:
        return <div dangerouslySetInnerHTML={{ __html: message }} />;
    }
  };
  return (
    <div>
      <Card style={cardStyle} bordered={false}>
        <Meta
          description={
            <div>
              {name && (
                <p>
                  <Title level={5}>Name</Title>
                  <Text italic>{name || ""}</Text>
                </p>
              )}
              {channel && (
                <p>
                  <Title level={5}>Channel</Title>
                  <Text italic>{channel || ""}</Text>
                </p>
              )}
              {type && (
                <p>
                  <Title level={5}>Type</Title>
                  <Text italic>{type || ""}</Text>
                </p>
              )}
              <p>
                <Title level={5}>Message</Title>
                <Text>{renderTemplate()}</Text>
              </p>
            </div>
          }
        />
      </Card>
    </div>
  );
};
