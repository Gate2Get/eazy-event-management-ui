import { type UploadChangeParam, type UploadFile } from "antd/es/upload";

type AttachmentButtonType = {
  onAttach?: (e: UploadChangeParam<UploadFile<any>>) => void;
  disabled?: boolean;
  accept?: string;
  hoverText?: React.ReactNode;
  buttonText: React.ReactNode;
  otherProps?: any;
  isPreview?: boolean;
};
