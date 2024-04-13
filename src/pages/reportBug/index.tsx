import React from "react";
import {
  Col,
  Divider,
  Row,
  Typography,
  Form,
  Rate,
  Button,
  Select,
  Alert,
} from "antd";
import bugBanner from "../../assets/svg/bug-banner.svg";
import { TOPIC_OPTIONS } from "./constant";
import TextArea from "antd/es/input/TextArea";
import { AttachmentButton } from "../../components/AttachmentButton";
import { AttachmentType, ReportBugsType } from "../../types";
import { API } from "../../api";
import { useBearStore } from "../../store";
import { AttachmentDragger } from "../../components/AttachmentDragger";
import { UploadChangeParam, UploadFile } from "antd/es/upload";
import { useSearchParams } from "react-router-dom";

const { Title, Text } = Typography;
const topicOptions = TOPIC_OPTIONS.map((topic) => ({
  label: topic,
  value: topic,
}));

export const ReportBug = () => {
  const [form] = Form.useForm();
  const { setLoading, screen } = useBearStore.appStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const attachments = Form.useWatch("attachment", {
    form,
    preserve: true,
  });

  const colOption = (count: number) =>
    screen === "MOBILE"
      ? {
          flex: count,
        }
      : { span: count };

  const handleSubmit = (bugs: ReportBugsType) => {
    setLoading(true);
    API.commonAPI
      .createBug(bugs)
      .then((response) => {
        setLoading(false);
        form.resetFields();
        if (response?.result?._id)
          setSearchParams({ id: response?.result?._id });
      })
      .catch((error: Error) => {
        setLoading(false);
        console.log({ location: "handleSubmit", error });
      });
  };

  const handleFileUpload = async (e: any): Promise<void> => {
    const { file } = e;
    console.log({ file });
    const { status, preview, uid, id, name } = file;
    if (file.status === "removed") {
      const attachment: AttachmentType[] =
        form.getFieldValue("attachment") || [];
      const _attachment = attachment.filter(
        (invitation: AttachmentType) => invitation.id !== id
      );
      form.setFieldValue("attachment", _attachment);
    } else if (file?.size && file.size < 5000000) {
      setLoading(true);
      API.commonAPI
        .uploadFile(file, "invitation")
        .then((blobId: string) => {
          setLoading(false);
          const attachment: AttachmentType[] =
            form.getFieldValue("attachment") || [];
          attachment.push({
            id: uid,
            name,
            url: blobId,
          });
          form.setFieldValue("attachment", attachment);
        })
        .catch((error: Error) => {
          setLoading(false);
          console.log({ location: "handleFileUpload", error });
        });
    } else {
      console.error("Upload file error", file);
    }
  };

  return (
    <div>
      {searchParams.get("id") && (
        <Alert
          message={`Bug reported with reference no: ${searchParams.get("id")}`}
          banner
          closable
          type="success"
          onClose={() => {
            setSearchParams({});
          }}
        />
      )}
      <Row gutter={[16, 16]}>
        <Col {...colOption(8)} style={{ textAlign: "center" }}>
          <img
            loading="lazy"
            src={bugBanner}
            alt=""
            width={screen === "MOBILE" ? "70%" : "100%"}
          />
        </Col>
        <Col {...colOption(16)}>
          <Title level={3}>Report a bug</Title>

          <Divider />
          <Form
            layout="vertical"
            form={form}
            style={{ maxWidth: 600 }}
            onFinish={handleSubmit}
          >
            <Form.Item
              label="Select a topic."
              name="topic"
              rules={[
                {
                  required: true,
                  message: "Please select topic",
                },
              ]}
            >
              <Select
                options={topicOptions}
                placeholder="Select any topic to continue"
              />
            </Form.Item>
            <Form.Item
              label="Please provide additional information."
              name="information"
              rules={[
                {
                  required: true,
                  message: "Please provide the information!",
                },
              ]}
            >
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item label="Attachment" name="attachment">
              <AttachmentDragger
                buttonText="Upload Attachment"
                otherProps={{
                  fileList: attachments,
                }}
                isPreview
                accept="image/*,application/pdf"
                onAttach={(e) => handleFileUpload?.(e)}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};
