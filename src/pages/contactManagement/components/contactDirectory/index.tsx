import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Modal, Space } from "antd";
import React from "react";
import { DataTable } from "../../../../components/dataTable";
import { useBearStore } from "../../../../store";
import { ContactDirectoryType } from "../../../../types";
import { contactDirectoryColumns } from "./config";
import { CONTACT_DIRECTORY_COLUMN_KEYS } from "./constant";

export const ContactDirectory = () => {
  const { directoryList, setSelectedDirectory } = useBearStore.contactStore();
  const [isDeleteConfirmation, setIsDeleteConfirmation] = React.useState(false);

  contactDirectoryColumns.forEach((column) => {
    if (column.key === CONTACT_DIRECTORY_COLUMN_KEYS.ACTION) {
      column.render = (text, record) => (
        <Space>
          <EditOutlined />
          <DeleteOutlined
            onClick={() => {
              onDeleteConfirmation(record);
            }}
          />
        </Space>
      );
    }
  });

  const onDeleteConfirmation = (record: ContactDirectoryType) => {
    setIsDeleteConfirmation(true);
    setSelectedDirectory(record);
  };

  const onEditSelect = (record: ContactDirectoryType) => {
    setSelectedDirectory(record);
  };

  const onDeleteContactDirectory = () => {
    closeContactDirectoryModal();
  };

  const closeContactDirectoryModal = () => {
    setIsDeleteConfirmation(false);
  };

  return (
    <div>
      <DataTable columns={contactDirectoryColumns} data={directoryList} />
      <Modal
        title={
          <>
            <ExclamationCircleOutlined /> Delete Confirmation
          </>
        }
        open={isDeleteConfirmation}
        onOk={onDeleteContactDirectory}
        onCancel={closeContactDirectoryModal}
        okText="Yes"
        cancelText="No"
      >
        Once deleted it cannot be undo
      </Modal>
    </div>
  );
};
