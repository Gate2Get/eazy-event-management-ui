import { FormInstance } from "antd";
import { CHANNEL_OPTIONS, COMPONENT_TYPE, EVENT_TYPES } from "../constants";
import { ScreenType } from "../types";

export const eventCreationConfig = (
  screen: ScreenType,
  form: FormInstance<any>
) => {
  return {
    [EVENT_TYPES.MARRIAGE]: [
      {
        type: COMPONENT_TYPE.INPUT_TEXT,
        label: "Event Name",
        name: "name",
        rules: [{ required: true, message: "Please input Event name!" }],
        fieldProps: {
          placeholder: "Enter your Event Name",
        },
      },
      {
        type: COMPONENT_TYPE.INPUT_TEXT,
        label: "Groom Name",
        name: "groomName",
        rules: [{ required: true, message: "Please input Groom name!" }],
        fieldProps: {
          placeholder: "Please input Groom name!",
        },
      },
      {
        type: COMPONENT_TYPE.INPUT_TEXT,
        label: "Bride Name",
        name: "brideName",
        rules: [{ required: true, message: "Please input Bride name!" }],
        fieldProps: {
          placeholder: "Please input Bride name!",
        },
      },
      ...(screen === "MOBILE"
        ? [
            {
              type: COMPONENT_TYPE.INPUT_DATETIME_LOCAL,
              label: "Select the event start date",
              name: "startDateTime",
              rules: [
                {
                  required: true,
                  message: "Please select event start date!",
                },
              ],
            },
            {
              type: COMPONENT_TYPE.INPUT_DATETIME_LOCAL,
              label: "Select the event end date",
              name: "endDateTime",
              rules: [
                {
                  required: true,
                  message: "Please select event end date!",
                },
              ],
            },
          ]
        : [
            {
              type: COMPONENT_TYPE.RANGE_PICKER,
              label: "Select the event date",
              name: "dateTime",
              rules: [{ required: true, message: "Please select event date!" }],
            },
          ]),
      {
        type: COMPONENT_TYPE.SWITCH,
        label: "Enable album",
        name: "isAlbumEnable",
      },
      {
        type: COMPONENT_TYPE.SWITCH,
        label: "Enable video",
        name: "isVideoEnable",
      },
      {
        type: COMPONENT_TYPE.INPUT_URL,
        label: "Video url",
        name: "videoUrl",
        rules: [
          {
            required: false,
            message: "Please input video url!",
          },
        ],
        fieldProps: {
          placeholder: "Please input video url!",
        },
      },
      {
        type: COMPONENT_TYPE.INPUT_TEXT,
        label: "Location",
        name: "location",
        rules: [
          { required: true, message: "Please input the event location!" },
        ],
        fieldProps: {
          placeholder: "Please input the event location!",
        },
      },
      {
        type: COMPONENT_TYPE.INPUT_URL,
        label: "Google Location url",
        name: "locationUrl",
        rules: [
          {
            required: false,
            message: "Please input google map location url!",
          },
        ],
        fieldProps: {
          placeholder: "Please input google map location url!",
        },
      },
    ],
    [EVENT_TYPES.BIRTHDAY]: [
      {
        type: COMPONENT_TYPE.INPUT_TEXT,
        label: "Event Name",
        name: "name",
        rules: [{ required: true, message: "Please input Event name!" }],
        fieldProps: {
          placeholder: "Enter your Event Name",
        },
      },
      {
        type: COMPONENT_TYPE.INPUT_TEXT,
        label: "Birthday person name",
        name: "personName",
        rules: [{ required: true, message: "Please input person name!" }],
        fieldProps: {
          placeholder: "Enter your birthday person name",
        },
      },
      ...(screen === "MOBILE"
        ? [
            {
              type: COMPONENT_TYPE.INPUT_DATETIME_LOCAL,
              label: "Select the event start date",
              name: "startDateTime",
              rules: [
                {
                  required: true,
                  message: "Please select event start date!",
                },
              ],
            },
            {
              type: COMPONENT_TYPE.INPUT_DATETIME_LOCAL,
              label: "Select the event end date",
              name: "endDateTime",
              rules: [
                {
                  required: true,
                  message: "Please select event end date!",
                },
              ],
            },
          ]
        : [
            {
              type: COMPONENT_TYPE.RANGE_PICKER,
              label: "Select the event date",
              name: "dateTime",
              rules: [{ required: true, message: "Please select event date!" }],
            },
          ]),
      {
        type: COMPONENT_TYPE.SWITCH,
        label: "Enable album",
        name: "isAlbumEnable",
      },
      {
        type: COMPONENT_TYPE.SWITCH,
        label: "Enable video",
        name: "isVideoEnable",
      },
      {
        type: COMPONENT_TYPE.INPUT_URL,
        label: "Video url",
        name: "videoUrl",
        rules: [
          {
            required: false,
            message: "Please input video url!",
          },
        ],
        fieldProps: {
          placeholder: "Please input video url!",
        },
      },
      {
        type: COMPONENT_TYPE.INPUT_TEXT,
        label: "Location",
        name: "location",
        rules: [
          { required: true, message: "Please input the event location!" },
        ],
        fieldProps: {
          placeholder: "Please input the event location!",
        },
      },
      {
        type: COMPONENT_TYPE.INPUT_URL,
        label: "Google Location url",
        name: "locationUrl",
        rules: [
          {
            required: false,
            message: "Please input google map location url!",
          },
        ],
        fieldProps: {
          placeholder: "Please input google map location url!",
        },
      },
    ],
    [EVENT_TYPES.OTHERS]: [
      {
        type: COMPONENT_TYPE.INPUT_TEXT,
        label: "Event Name",
        name: "name",
        rules: [{ required: true, message: "Please input Event name!" }],
        fieldProps: {
          placeholder: "Enter your Event Name",
        },
      },
      ...(screen === "MOBILE"
        ? [
            {
              type: COMPONENT_TYPE.INPUT_DATETIME_LOCAL,
              label: "Select the event start date",
              name: "startDateTime",
              rules: [
                {
                  required: true,
                  message: "Please select event start date!",
                },
              ],
            },
            {
              type: COMPONENT_TYPE.INPUT_DATETIME_LOCAL,
              label: "Select the event end date",
              name: "endDateTime",
              rules: [
                {
                  required: true,
                  message: "Please select event end date!",
                },
              ],
            },
          ]
        : [
            {
              type: COMPONENT_TYPE.RANGE_PICKER,
              label: "Select the event date",
              name: "dateTime",
              rules: [{ required: true, message: "Please select event date!" }],
            },
          ]),
      {
        type: COMPONENT_TYPE.SWITCH,
        label: "Enable album",
        name: "isAlbumEnable",
      },
      {
        type: COMPONENT_TYPE.SWITCH,
        label: "Enable video",
        name: "isVideoEnable",
      },
      {
        type: COMPONENT_TYPE.INPUT_URL,
        label: "Video url",
        name: "videoUrl",
        rules: [
          {
            required: false,
            message: "Please input video url!",
          },
        ],
        fieldProps: {
          placeholder: "Please input video url!",
        },
      },
      {
        type: COMPONENT_TYPE.INPUT_TEXT,
        label: "Location",
        name: "location",
        rules: [
          { required: true, message: "Please input the event location!" },
        ],
        fieldProps: {
          placeholder: "Please input the event location!",
        },
      },
      {
        type: COMPONENT_TYPE.INPUT_URL,
        label: "Google Location url",
        name: "locationUrl",
        rules: [
          {
            required: false,
            message: "Please input google map location url!",
          },
        ],
        fieldProps: {
          placeholder: "Please input google map location url!",
        },
      },
    ],
  };
};
