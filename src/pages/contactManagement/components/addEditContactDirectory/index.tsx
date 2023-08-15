import React from "react";
import { Button, Col, Form, Input, Modal, Row, Space, Typography } from "antd";
import { AddEditContactDirectoryType } from "./types";
import { AttachmentButton } from "../../../../components/AttachmentButton";
import { useBearStore } from "../../../../store";

const { Title, Text, Link } = Typography;

export const AddEditContactDirectory = (props: AddEditContactDirectoryType) => {
  const [form] = Form.useForm();
  const { isOpen, setOpen, action } = props;

  const { selectedDirectory, setSelectedDirectory } =
    useBearStore.contactStore();

  const onFinish = (values: any) => {
    console.log({ values });
  };

  const onChangeForm = (key: string, value: any) => {
    setSelectedDirectory({ ...selectedDirectory, [key]: value });
  };

  console.log({ selectedDirectory });
  return (
    <div>
      <Modal
        title={action === "ADD" ? "Create Directory" : "Update Directory"}
        open={isOpen}
        onOk={() => {
          setOpen("");
        }}
        onCancel={() => {
          setOpen("");
        }}
        okText={action === "ADD" ? "Create" : "Update"}
        cancelText="Cancel"
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <Text>Enter Name</Text>
          <Input
            value={selectedDirectory.name}
            placeholder="Name of the directory"
            width={"100%"}
            onChange={(event) => onChangeForm("name", event.target.value)}
          />
          <Text>Upload Directory file</Text>
          <AttachmentButton buttonText="Upload" />
          <Text>
            Template file?{" "}
            <Link href="https://ant.design" target="_blank">
              download here
            </Link>
          </Text>{" "}
        </Space>
      </Modal>
    </div>
  );
};
