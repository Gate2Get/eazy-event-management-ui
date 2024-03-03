import React, { Dispatch } from "react";
import { Avatar, Button, Card, Divider, Space, Typography } from "antd";
import {
  TemplatePreviewType,
  TemplateType,
  VoiceMessageTemplateType,
} from "../../types";
import { useBearStore } from "../../store";
import { getFormattedMessage } from "../../utils/common.utils";
import { UserOutlined } from "@ant-design/icons";
import "./styles.scss";
import { CHANNEL_OPTIONS } from "../../constants";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import StopIcon from "@mui/icons-material/Stop";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const { Paragraph, Text, Title, Link } = Typography;

export const PreviewTemplate = (props: TemplatePreviewType) => {
  const { screen } = useBearStore.appStore();
  console.log({ props });
  const {
    message,
    type,
    name,
    channel,
    // speechStatus,
    // pauseSpeech,
    // playSpeech,
    // resumeSpeech,
    // stopSpeech,
  } = props;

  const [speechMsg, setSpeechMsg]: [
    SpeechSynthesisUtterance | undefined,
    Dispatch<any>
  ] = React.useState();
  const [speechStatus, setSpeechStatus] = React.useState({
    id: "",
    status: "",
  });

  const playSpeech = (text: string, id: string) => {
    stopSpeech();
    const msg = new SpeechSynthesisUtterance();
    msg.text = text;
    const voices = window.speechSynthesis.getVoices();
    msg.voice = voices[0]; // Use the first available voice
    msg.onend = function () {
      console.log("Speech finished");
      setSpeechMsg(undefined);
      setSpeechStatus({ id: "", status: "ENDED" });
    };
    console.log({ text });
    window.speechSynthesis.speak(msg);
    setSpeechMsg(msg);
    if (speechStatus.status === "PLAYING") {
      setSpeechStatus({ id: "", status: "" });
    } else {
      setSpeechStatus({ id, status: "PLAYING" });
    }
  };

  const stopSpeech = () => {
    // Pause the current utterance
    window?.speechSynthesis?.cancel();
    console.log("Speech stopped");
    setSpeechStatus({ id: "", status: "" });
  };

  const resumeSpeech = () => {
    if (speechMsg) {
      // Pause the current utterance
      window.speechSynthesis.resume();
      setSpeechStatus({ ...speechStatus, status: "PLAYING" });
    }
  };

  const pauseSpeech = () => {
    if (speechMsg) {
      // Pause the current utterance
      window.speechSynthesis.pause();
      setSpeechStatus({ ...speechStatus, status: "PAUSED" });
    }
  };

  let cardStyle = {};
  if (screen === "DESKTOP") {
    cardStyle = {
      margin: "2% 20%",
      textAlign: "left",
    };
  }

  const channelComp = CHANNEL_OPTIONS.find((item) => item.value === channel);

  const renderTemplate = () => {
    if (!message) {
      return <></>;
    }
    switch (channel) {
      case "VOICE_CALL": {
        const messagesObj: Record<string, VoiceMessageTemplateType> = message;
        return Object.values(messagesObj).map(
          (msg: VoiceMessageTemplateType) => {
            if (msg.type === "TEXT") {
              return (
                <Paragraph>
                  <Card className="message sent" bordered={false}>
                    <div>{msg.value}</div>
                    <div style={{ float: "right" }}>
                      {speechStatus?.id !== msg.id && (
                        <PlayArrowIcon
                          onClick={() => {
                            playSpeech?.(msg.value, msg.id);
                          }}
                        />
                      )}

                      {speechStatus?.id === msg.id &&
                        speechStatus?.status === "PLAYING" && (
                          <PauseIcon
                            onClick={() => {
                              pauseSpeech?.();
                            }}
                          />
                        )}

                      {speechStatus?.id === msg.id &&
                        speechStatus?.status === "PAUSED" && (
                          <PlayArrowIcon
                            onClick={() => {
                              resumeSpeech?.();
                            }}
                          />
                        )}

                      {speechStatus?.id === msg.id &&
                        (speechStatus?.status === "PLAYING" ||
                          speechStatus?.status === "PAUSED") && (
                          <StopIcon
                            onClick={() => {
                              stopSpeech?.();
                            }}
                          />
                        )}
                    </div>
                  </Card>
                </Paragraph>
              );
            } else if (msg.type === "AUDIO") {
              console.log({ msg });
              return (
                // <Card className="message sent" bordered={false}>
                <audio
                  className="message sent"
                  src={msg.value}
                  controls
                  style={{ width: "100%" }}
                />
                // </Card>
              );
            }
          }
        );
      }

      case "SMS": {
        return <div dangerouslySetInnerHTML={{ __html: message.text }} />;
      }

      case "WHATSAPP": {
        let whatsapp = <></>;
        if (message) {
          console.log({ message });
          whatsapp = message?.map((msg: any) => {
            if (msg.type === "BODY") {
              const htmlString = msg.text
                .replace(/\*([^*]+)\*/g, "<strong>$1</strong>")
                .replace(/\n/g, "<br>");

              // Wrap the result in a <p> tag
              const finalHTML = `<p>${htmlString}</p>`;
              return <div dangerouslySetInnerHTML={{ __html: finalHTML }} />;
            }
            if (msg.type === "BUTTONS") {
              return (
                <Space
                  direction="vertical"
                  style={{ width: "100%" }}
                  size="small"
                >
                  {msg?.buttons?.map((button: any) => (
                    <>
                      <Divider />
                      <Space className="whatsapp-button">
                        <OpenInNewIcon fontSize="inherit" />

                        <Link
                          // icon={<OpenInNewIcon fontSize="inherit" />}
                          href={button.url}
                          target="_blank"
                          style={{ padding: "0px" }}
                        >
                          {button.text}
                        </Link>
                      </Space>
                    </>
                  ))}
                </Space>
              );
            }
          });
        }

        console.log({ whatsapp, message: message[0] });
        return whatsapp;
      }

      default:
        return <div dangerouslySetInnerHTML={{ __html: message }} />;
    }
  };
  return (
    <div>
      {/* <Card style={cardStyle} bordered={false}>
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
      </Card> */}

      <div className="phone">
        <Card style={cardStyle} className="chat-container">
          <Card.Meta
            avatar={<Avatar icon={<UserOutlined />} />}
            title={
              <div>
                <Paragraph>{name || ""}</Paragraph>
                <Paragraph italic style={{ fontWeight: "lighter" }}>
                  {channelComp?.label as React.ReactNode}
                </Paragraph>
              </div>
            }
          />
          <Divider />
          {renderTemplate()}
        </Card>
      </div>
    </div>
  );
};
