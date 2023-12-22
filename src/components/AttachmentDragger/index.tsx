import React from "react";
import { InboxOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Modal,
  Row,
  Space,
  UploadFile,
  UploadProps,
} from "antd";
import { message, Upload } from "antd";
import { AttachmentButtonType } from "../AttachmentButton/types";
import { RcFile } from "antd/es/upload";
import { getBase64 } from "../../utils/common.utils";
import { useBearStore } from "../../store";
import { AttachmentType } from "../../types";
import { PdfViewer } from "../pdfViewer";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { useWindowSize } from "../../hooks/useWindowSize";
import { checkIsPdf } from "../../utils/validation.utils";

const { Dragger } = Upload;
const { Meta } = Card;

export const AttachmentDragger = (props: AttachmentButtonType) => {
  const {
    onAttach,
    disabled,
    hoverText,
    buttonText,
    accept = "*",
    isPreview,
    otherProps = {},
  } = props;

  const { width } = useWindowSize();
  const { screen } = useBearStore.appStore();
  const [previewOpen, setPreviewOpen] = React.useState(false);
  const [previewUrl, setPreviewUrl] = React.useState("");
  const [previewTitle, setPreviewTitle] = React.useState("");

  const handleCancel = () => setPreviewOpen(false);

  const pdfImageUrl = React.useMemo(() => {
    return new URL(`../../assets/svg/pdf-icon.svg`, import.meta.url);
  }, []);

  const colOption = (count: number) =>
    screen === "MOBILE"
      ? {
          flex: count,
        }
      : { span: count };

  const handlePreview = async (file: AttachmentType) => {
    setPreviewUrl(file.url);
    setPreviewOpen(true);
    setPreviewTitle(file.name);
  };

  if (isPreview) {
    otherProps.previewFile = handlePreview;
    otherProps.listType = "text";
  }

  let isPdf = false;
  if (previewUrl) {
    isPdf = checkIsPdf(previewUrl);
  }

  const sidebarWidth = (width * 21) / 100;

  return (
    <>
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
      <Row gutter={[8, 8]}>
        {otherProps?.fileList?.map((file: AttachmentType) => (
          <Col {...colOption(6)}>
            <Card
              hoverable
              style={{
                width:
                  screen === "MOBILE" ? width * 0.75 : width / 3 - sidebarWidth,
              }}
              cover={
                <img
                  alt={file.name}
                  src={checkIsPdf(file.url) ? (pdfImageUrl as any) : file.url}
                />
              }
              onClick={() => {
                handlePreview(file);
              }}
            >
              <Meta description={file.name} />
            </Card>
          </Col>
        ))}
      </Row>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <>
          {isPdf ? (
            <PdfViewer url={previewUrl} />
          ) : (
            <img alt="example" style={{ width: "100%" }} src={previewUrl} />
          )}
        </>
      </Modal>
    </>
  );
};
