import React, { useRef, useState } from "react";
import {
  FileUpload,
  FileUploadHeaderTemplateOptions,
  FileUploadSelectEvent,
  FileUploadUploadEvent,
  ItemTemplateOptions,
} from "primereact/fileupload";
import { ProgressBar } from "primereact/progressbar";
import { Button } from "primereact/button";
import { Tooltip } from "primereact/tooltip";
import { Tag } from "primereact/tag";
import PhotoLibraryOutlinedIcon from "@mui/icons-material/PhotoLibraryOutlined";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Col, message, Row, Space } from "antd";
import { AttachmentType } from "../../types";
import "./styles.scss";

const maxFileSize = 5000000;

type UploadAttachmentDraggerType = {
  onUploadFile: (attachment: AttachmentType[]) => void;
  fileSize?: number;
  uploadUrl: string;
  accept?: string;
};

export const UploadAttachmentDragger = (props: UploadAttachmentDraggerType) => {
  const [totalSize, setTotalSize] = useState(0);
  const fileUploadRef = useRef<FileUpload>(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const { onUploadFile, uploadUrl, accept, fileSize = maxFileSize } = props;

  const onTemplateSelect = (e: FileUploadSelectEvent) => {
    let _totalSize = totalSize;
    let files = e.files;

    for (let i = 0; i < files.length; i++) {
      _totalSize += files[i].size || 0;
    }

    setTotalSize(_totalSize);
  };

  const onTemplateUpload = (e: FileUploadUploadEvent) => {
    let _totalSize = 0;

    e.files.forEach((file) => {
      _totalSize += file.size || 0;
    });

    setTotalSize(_totalSize);
    console.log({ e });
    // Update the state with the uploaded files
    setUploadedFiles([]);

    // Access the response from the uploaded files
    e.xhr.onload = () => {
      const response = JSON.parse(e.xhr.responseText);
      messageApi.open({
        key: `fileUploadMultiple`,
        type: "success",
        content: response?.message,
        duration: 5,
      });
      onUploadFile(response?.attachments);
    };
  };

  const onTemplateRemove = (file: File, callback: Function) => {
    setTotalSize(totalSize - file.size);
    callback();
  };

  const onTemplateClear = () => {
    setTotalSize(0);
    setUploadedFiles([]);
  };

  const headerTemplate = (options: FileUploadHeaderTemplateOptions) => {
    const { className, chooseButton, uploadButton, cancelButton } = options;
    const value = totalSize / 10000;
    const formatedValue =
      fileUploadRef && fileUploadRef.current
        ? fileUploadRef.current.formatSize(totalSize)
        : "0 B";

    return (
      <Row className={className}>
        <Col flex={11}>
          {chooseButton}
          {uploadButton}
          {cancelButton}
        </Col>
        <Col flex={11} className="uploaded-size">
          <span>{formatedValue} / 1 MB</span>
          <ProgressBar
            value={value}
            showValue={false}
            // style={{ width: "10rem", height: "12px" }}
          ></ProgressBar>
        </Col>
      </Row>
    );
  };

  const itemTemplate = (inFile: object, props: ItemTemplateOptions) => {
    const file = inFile as File & {
      objectURL: string;
    };
    // Render only the files that haven't been uploaded
    if (uploadedFiles.includes(file)) {
      return (
        <div className="flex align-items-center flex-wrap">
          <div className="flex align-items-center" style={{ width: "40%" }}>
            <img
              alt={file.name}
              role="presentation"
              src={file.objectURL}
              width={100}
            />
            <span className="flex flex-column text-left ml-3">
              {file.name}
              <small>{new Date().toLocaleDateString()}</small>
            </span>
          </div>
          <Tag
            value={props.formatSize}
            severity="warning"
            className="px-3 py-2"
          />
          <Button
            type="button"
            icon={<CloseOutlinedIcon />}
            className="p-button-outlined p-button-rounded p-button-danger ml-auto"
            onClick={() => onTemplateRemove(file, props.onRemove)}
          />
        </div>
      );
    }

    return null;
  };

  const emptyTemplate = () => {
    return (
      <Space direction="vertical" style={{ textAlign: "center" }}>
        <PhotoLibraryOutlinedIcon />

        <span
          style={{ fontSize: "1.2em", color: "var(--text-color-secondary)" }}
          className="my-5"
        >
          Drag and Drop Image Here
        </span>
      </Space>
    );
  };

  const chooseOptions = {
    icon: <PhotoLibraryOutlinedIcon />,
    iconOnly: true,
    className: "custom-choose-btn p-button-rounded p-button-outlined",
  };
  const uploadOptions = {
    icon: <FileUploadOutlinedIcon />,
    iconOnly: true,
    className:
      "custom-upload-btn p-button-success p-button-rounded p-button-outlined",
  };
  const cancelOptions = {
    icon: <CloseOutlinedIcon />,
    iconOnly: true,
    className:
      "custom-cancel-btn p-button-danger p-button-rounded p-button-outlined",
  };

  return (
    <div className="upload-drag__container">
      <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
      <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
      <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />

      <FileUpload
        ref={fileUploadRef}
        name="file"
        url={uploadUrl}
        multiple
        accept={accept}
        maxFileSize={maxFileSize}
        onUpload={onTemplateUpload}
        onSelect={onTemplateSelect}
        onError={onTemplateClear}
        onClear={onTemplateClear}
        headerTemplate={headerTemplate}
        itemTemplate={itemTemplate}
        emptyTemplate={emptyTemplate}
        chooseOptions={chooseOptions}
        uploadOptions={uploadOptions}
        cancelOptions={cancelOptions}
      />
    </div>
  );
};
