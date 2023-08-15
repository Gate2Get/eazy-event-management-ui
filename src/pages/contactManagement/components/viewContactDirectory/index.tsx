import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { Card, Col, Modal, Row, Space } from "antd";
import Meta from "antd/es/card/Meta";
import React from "react";
import { DataTable } from "../../../../components/dataTable";
import { useBearStore } from "../../../../store";
import { ContactDirectoryType } from "../../../../types";
import { contactDirectoryColumns } from "./config";
import { CONTACT_DIRECTORY_COLUMN_KEYS } from "./constant";

export const ViewContactDirectory = () => {
  const { directoryList, setSelectedDirectory, setAction, isListView } =
    useBearStore.contactStore();
  const [isDeleteConfirmation, setIsDeleteConfirmation] = React.useState(false);

  contactDirectoryColumns.forEach((column) => {
    if (column.key === CONTACT_DIRECTORY_COLUMN_KEYS.ACTION) {
      column.render = (text, record) => (
        <Space>
          <EditOutlined
            onClick={() => {
              onEditSelect(record);
            }}
          />
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
    setAction("EDIT");
    setSelectedDirectory(record);
  };

  const onDeleteContactDirectory = () => {
    closeDeleteModal();
  };

  const closeEditModal = () => {
    setAction("");
  };

  const closeDeleteModal = () => {
    setIsDeleteConfirmation(false);
  };

  return (
    <div>
      <Row gutter={[8, 8]}>
        {isListView ? (
          <DataTable columns={contactDirectoryColumns} data={directoryList} />
        ) : (
          directoryList.map((directory) => (
            <Col flex={8}>
              <Card
                style={{ width: 300 }}
                actions={[
                  <EditOutlined
                    key="edit"
                    onClick={() => {
                      onEditSelect(directory);
                    }}
                  />,
                  <DeleteOutlined
                    key="ellipsis"
                    onClick={() => {
                      onDeleteConfirmation(directory);
                    }}
                  />,
                  <EyeOutlined />,
                ]}
              >
                <Meta
                  title={directory.name}
                  description={`No of Contacts - ${directory.noOfContacts}`}
                />
              </Card>
            </Col>
          ))
        )}
      </Row>
      <Modal
        title={<>Delete Confirmation</>}
        open={isDeleteConfirmation}
        onOk={onDeleteContactDirectory}
        onCancel={closeDeleteModal}
        okText="Yes"
        cancelText="No"
        okType="danger"
      >
        Once deleted it cannot be undo
      </Modal>
    </div>
  );
};
