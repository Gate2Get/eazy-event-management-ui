import { FormInstance } from "antd";
import { RangePickerProps } from "antd/es/date-picker";
import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const range = (start: number, end: number) => {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
};

// eslint-disable-next-line arrow-body-style
export const disabledDate: RangePickerProps["disabledDate"] = (current) => {
  // Can not select days before today and today
  return current && current < dayjs().startOf("day");
};

export const disabledDateTime = () => ({
  disabledHours: () => range(0, 24).splice(4, 20),
  disabledMinutes: () => range(30, 60),
  disabledSeconds: () => [55, 56],
});

export const disabledRangeTime: RangePickerProps["disabledTime"] = (
  _,
  type
) => {
  if (type === "start") {
    return {
      disabledHours: () => range(0, 60).splice(4, 20),
      disabledMinutes: () => range(30, 60),
      disabledSeconds: () => [55, 56],
    };
  }
  return {
    disabledHours: () => range(0, 60).splice(20, 4),
    disabledMinutes: () => range(0, 31),
    disabledSeconds: () => [55, 56],
  };
};

export const handleTimeChange = (
  time: Dayjs,
  form: FormInstance<any>,
  field: string
) => {
  const prevDateTime = form.getFieldValue(field);
  // Combine the existing date with the selected time
  const datePart = prevDateTime
    ? dayjs(prevDateTime).format("YYYY-MM-DD")
    : dayjs().format("YYYY-MM-DD");
  // return dayjs(`${datePart} ${time.format("HH:mm")}`);
};
