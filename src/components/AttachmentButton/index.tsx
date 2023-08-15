import React from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Tooltip, Upload } from "antd";
import { type AttachmentButtonType } from "./types";

export const AttachmentButton = (
  props: AttachmentButtonType
): React.ReactElement => {
  const { onAttach, disabled, hoverText, buttonText, accept = "*" } = props;
  return (
    <div>
      <Upload
        accept={accept}
        disabled={disabled}
        progress={{ showInfo: true }}
        showUploadList={false}
        beforeUpload={(file) => {
          return false;
        }}
        onChange={onAttach}
      >
        <Tooltip placement="bottom" title={hoverText}>
          <Button icon={<UploadOutlined />}>{buttonText}</Button>
        </Tooltip>
      </Upload>
    </div>
  );
};
