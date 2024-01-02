import { RcFile } from "antd/es/upload";
import { SetURLSearchParams } from "react-router-dom";
import { PAGE_ACTION, PAGE_QUERY_ACTIONS } from "../constants";
import { ActionType, VoiceMessageTemplateType } from "../types";

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

export const urlhandler = (
  searchParams: URLSearchParams,
  setAction: React.Dispatch<any>,
  apiCallFilter: (id: string) => void,
  apiCallAll: () => void
) => {
  const id = searchParams.get("id");
  const actionType = searchParams.get("action");
  console.log({ actionType, id });
  if (actionType) {
    if (id) {
      apiCallFilter(id);
    }
    const action = PAGE_QUERY_ACTIONS.includes(actionType)
      ? actionType
      : PAGE_ACTION.VIEW;
    setAction(action as ActionType);
  } else {
    setAction("");
    apiCallAll();
  }
};

export function removeFalsyValues(obj: any) {
  return Object.entries(obj)
    .filter(([key, value]) => Boolean(value))
    .reduce((acc: any, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});
}

export const getFileList = (file?: string) => {
  let fileList: any[] = [];
  if (file) {
    const urlObject = new URL(file);
    console.log({ urlObject });
    const pathname = urlObject.pathname;
    const filePath = pathname.substring(pathname.lastIndexOf("/") + 1);
    const fileName = filePath.split("_");
    fileName.shift();
    fileList = [
      {
        uid: "1",
        name: fileName.join("_"),
        status: "done",
        url: file,
      },
    ];
  }
  console.log({ fileList, file });
  return fileList;
};

export const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const handleNumberFormatter = (value: number) => {
  // If the value is zero or null, display an empty string
  return value === 0 || value === null ? "" : String(value);
};

export const handleNumberParser = (value: string) => {
  // If the input is an empty string, set the value to null
  return value === "" ? null : value;
};
