import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  EyeOutlined,
  IdcardOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Badge,
  Card,
  Col,
  Dropdown,
  MenuProps,
  Modal,
  Row,
  Space,
  Typography,
} from "antd";
import Meta from "antd/es/card/Meta";
import React from "react";
import { ContactDirectoryCard } from "../../../../components/contactDirectoryCard";
import { DataTable } from "../../../../components/dataTable";
import { useBearStore } from "../../../../store";
import { ContactDirectoryType } from "../../../../types";
import { contactDirectoryColumns } from "./config";
import { CONTACT_DIRECTORY_COLUMN_KEYS } from "./constant";

const { Title, Text } = Typography;

export const ListContactDirectory = () => {
  const { directoryList, setSelectedDirectory, setAction, isListView } =
    useBearStore.contactStore();
  const { screen } = useBearStore.appStore();

  const getMenuItems = (data: ContactDirectoryType): MenuProps["items"] => [
    {
      label: "View",
      key: "view",
      onClick: () => onViewSelect(data),
      icon: <EyeOutlined />,
    },
    {
      label: "Edit",
      key: "edit",
      onClick: () => onEditSelect(data),
      icon: <EditOutlined />,
    },
  ];

  contactDirectoryColumns.forEach((column) => {
    if (column.key === CONTACT_DIRECTORY_COLUMN_KEYS.ACTION) {
      column.render = (text, record) => (
        <Space>
          <EditOutlined
            onClick={() => {
              onEditSelect(record);
            }}
          />
          <EyeOutlined
            onClick={() => {
              onViewSelect(record);
            }}
          />
        </Space>
      );
    }
  });

  const onViewSelect = (record: ContactDirectoryType) => {
    setAction("VIEW");
    setSelectedDirectory(record);
  };

  const onEditSelect = (record: ContactDirectoryType) => {
    setAction("EDIT");
    setSelectedDirectory(record);
  };

  const closeEditModal = () => {
    setAction("");
  };

  return (
    <div>
      <Row gutter={[16, 16]}>
        {isListView ? (
          <DataTable columns={contactDirectoryColumns} data={directoryList} />
        ) : (
          directoryList.map((directory) => {
            return (
              <Col span={screen === "MOBILE" ? 24 : 8} key={directory._id}>
                <ContactDirectoryCard
                  cardContact={directory}
                  menuItems={getMenuItems(directory)}
                />
              </Col>
            );
          })
        )}
      </Row>
    </div>
  );
};
