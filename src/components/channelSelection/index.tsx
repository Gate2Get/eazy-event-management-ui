import { Radio, RadioChangeEvent } from "antd";
import React from "react";

const options = [
  { label: "SMS", value: "SMS" },
  { label: "Whatsapp", value: "WHATSAPP" },
  { label: "Voice call", value: "VOICE_CALL" },
];

type ChannelSelectionType = {
  value: string;
  setValue: (value: string) => void;
};

export const ChannelSelection = (props: ChannelSelectionType) => {
  const { value, setValue } = props;
  const onChange = ({ target: { value } }: RadioChangeEvent) => {
    console.log("radio4 checked", value);
    setValue(value);
  };

  return (
    <div>
      <Radio.Group
        options={options}
        onChange={onChange}
        value={value}
        optionType="button"
        buttonStyle="solid"
      />
    </div>
  );
};
