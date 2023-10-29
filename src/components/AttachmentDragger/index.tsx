import React from "react";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { message, Upload } from "antd";
import { AttachmentButtonType } from "../AttachmentButton/types";

const { Dragger } = Upload;

const props: UploadProps = {
  name: "file",
  multiple: true,
  action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

export const AttachmentDragger = (props: AttachmentButtonType) => {
  const {
    onAttach,
    disabled,
    hoverText,
    buttonText,
    accept = "*",
    otherProps,
  } = props;
  return (
    <Dragger
      {...otherProps}
      accept={accept}
      disabled={disabled}
      progress={{ showInfo: true }}
      showUploadList={true}
      beforeUpload={(file) => {
        return false;
      }}
      onChange={onAttach}
      height="35vh"
    >
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">Browse for files or drag them here.</p>
    </Dragger>
  );
};
