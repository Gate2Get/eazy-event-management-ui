import { VoiceMessageTemplateType } from "../types";

const replaceUndefinedOrNull = (key: string, value: any) => {
  if (value === null || value === "") {
    return undefined;
  }

  return value;
};

export const removeEmptyProp = (obj: any) => {
  const strObj = JSON.stringify(obj, replaceUndefinedOrNull);
  const parsedObj = JSON.parse(strObj);
  return parsedObj;
};

export const getFormattedMessage = (message: string, type: string) => {
  if (type === "VOICE_CALL") {
    const messages: Record<string, VoiceMessageTemplateType> =
      JSON.parse(message);
    const newMessage: Record<string, VoiceMessageTemplateType> = {};
    Object.values(messages).forEach((msg: VoiceMessageTemplateType) => {
      if (msg.type === "AUDIO") {
        const urlObject = new URL(msg.value);
        const pathname = urlObject.pathname;
        let file = pathname;
        if (file.startsWith("/")) {
          file = file.substring(1);
        }
        msg.value = file;
      }
      newMessage[msg.id] = msg;
    });
    return JSON.stringify(newMessage);
  }
  return message;
};
