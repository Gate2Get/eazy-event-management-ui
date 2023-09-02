import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Form, Input, Radio, Row, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { UploadChangeParam, UploadFile } from "antd/es/upload";
import React, { Dispatch } from "react";
import { API } from "../../api";
import { AttachmentButton } from "../../components/AttachmentButton";
import { RichTextEditor } from "../../components/richTextEditor";
import { CHANNEL_OPTIONS, EVENT_TYPE_PROPS } from "../../constants";
import { useBearStore } from "../../store";
import { ActionType, TemplateType } from "../../types";
import "./styles.scss";

const eventTypeOptions = Object.keys(EVENT_TYPE_PROPS).map((event: string) => ({
  label: EVENT_TYPE_PROPS[event].label,
  value: event,
}));

export const TemplateManagement = () => {
  const [form] = Form.useForm();
  const { setLoading, screen } = useBearStore.appStore();
  const {
    setTemplates,
    action,
    isListView,
    selectedTemplate,
    setAction,
    setIsListView,
    setSelectedTemplate,
    templates,
  } = useBearStore.templateStore();
  const [channel, setChannel] = React.useState("");

  React.useEffect(() => {
    getTemplates();
  }, []);

  const handleFileUpload = async (
    e: UploadChangeParam<UploadFile<any>>
  ): Promise<void> => {
    const { file } = e;
    console.log(file);
    if (file.status === "removed") {
      form.setFieldValue("contacts", undefined);
    } else if (file?.size && file.size < 50000) {
      const { uid, name } = file;
    } else {
    }
    form.validateFields();
  };

  const onCancel = () => {
    setAction("");
  };

  const getTemplates = (): void => {
    setLoading(true);
    API.templateManagement
      .getTemplate()
      .then((templates: TemplateType[]) => {
        setTemplates(templates);
      })
      .catch((error: Error) => {
        setLoading(false);
        console.log({ location: "getTemplates", error });
      });
  };

  const createTemplates = (template: TemplateType): void => {
    setLoading(true);
    API.templateManagement
      .createTemplate(template)
      .then(() => {})
      .catch((error: Error) => {
        setLoading(false);
        console.log({ location: "createTemplates", error });
      });
  };

  const onSubmit = (values: any) => {
    console.log("Received values", values);
    if (action === "ADD") {
      createTemplates(values);
    }
  };

  return (
    <div className="template-management__container">
      <Row gutter={[16, 16]} className="header__row">
        <Col flex={12}>
          <Row className="header__container">
            {action && (
              <Col
                span={screen === "MOBILE" ? 4 : 1}
                className="back-icon__container"
              >
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  size="2x"
                  className="back-icon"
                  onClick={onCancel}
                />
              </Col>
            )}
            {!action && (
              <Col span={screen === "MOBILE" ? 20 : 23}>
                <Button
                  size="large"
                  type="primary"
                  onClick={() => {
                    setAction("ADD");
                  }}
                >
                  Create Template
                </Button>
              </Col>
            )}
          </Row>
        </Col>
      </Row>
      {action && (
        <Form layout="vertical" onFinish={onSubmit}>
          <Form.Item
            label="Select the channel"
            name="channel"
            rules={[
              { required: true, message: "Please select event channel!" },
            ]}
          >
            <Radio.Group
              options={CHANNEL_OPTIONS}
              optionType="button"
              buttonStyle="solid"
              onChange={(e) => setChannel(e.target.value)}
            />
          </Form.Item>
          {channel && (
            <Form.Item label="Select Event" name="type">
              <Select
                style={{ width: "100%" }}
                size="large"
                allowClear
                placeholder="Select a event"
                optionFilterProp="children"
                options={eventTypeOptions}
              />
            </Form.Item>
          )}
          {channel && (
            <Form.Item
              label="Enter template name"
              name="name"
              rules={[
                { required: true, message: "Please input your template name" },
              ]}
            >
              <Input size="large" />
            </Form.Item>
          )}
          {channel === "WHATSAPP" && <RichTextEditor />}
          {channel === "SMS" || channel === "VOICE_CALL" ? (
            <Form.Item
              label="Enter text"
              name="message"
              rules={[{ required: true, message: "Please input your message" }]}
            >
              <TextArea style={{ minHeight: "40vh" }} />
            </Form.Item>
          ) : null}
          {channel === "VOICE_CALL" && (
            <Form.Item
              label="Upload voice file"
              name="contacts"
              rules={[
                {
                  required: true,
                  message: "Please upload your voice file!",
                },
              ]}
              valuePropName="fileList"
            >
              <AttachmentButton
                buttonText="Upload"
                onAttach={handleFileUpload}
              />
            </Form.Item>
          )}
          {(action === "ADD" || action === "EDIT") && (
            <Form.Item>
              <Button type="primary" htmlType="submit" size="large">
                {action === "ADD" ? "Create" : "Update"}
              </Button>
            </Form.Item>
          )}
        </Form>
      )}
    </div>
  );
};
