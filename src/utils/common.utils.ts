import { VoiceMessageTemplateType } from "../types";

//  "+91 77777 77777";
const mobileRegex = /^\+91\s\d{5}\s\d{5}/;

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

export const phoneNumberParser = (text: string) => {
  try {
    const phoneNumbers = text.toString();
    if (phoneNumbers.length === 10) {
      return Number(phoneNumbers);
    }

    const phn = phoneNumbers.includes(":::")
      ? phoneNumbers.split(":::")
      : phoneNumbers;
    const phoneNmbr = typeof phn == "object" ? phn[0] : phoneNumbers;
    console.log({ phoneNmbr });
    if (phoneNmbr.length === 10) {
      return Number(phoneNmbr);
    } else if (mobileRegex.test(phoneNmbr)) {
      return Number(phoneNmbr.replace("+91", "").replaceAll(" ", ""));
    } else if (phoneNmbr.startsWith("+91")) {
      return Number(phoneNmbr.replace("+91", "").replaceAll(" ", ""));
    } else if (phoneNmbr.startsWith("91")) {
      return Number(phoneNmbr.replace("91", "").replaceAll(" ", ""));
    } else {
      return Number(phoneNmbr.replaceAll(" ", ""));
    }
  } catch (error) {
    console.error({ location: "phoneNumberParser", error, text });
    return null;
  }
};
