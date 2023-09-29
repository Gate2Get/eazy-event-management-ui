import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Col, Input, MenuProps, Row, Space, Typography } from "antd";
import React from "react";
import { ContactDirectoryCard } from "../../../../components/contactDirectoryCard";
import { DataTable } from "../../../../components/dataTable";
import { useBearStore } from "../../../../store";
import { ContactDirectoryType } from "../../../../types";
import { searchGrid } from "../../../../utils/searchGrid.utils";
import { contactDirectoryColumns } from "./config";
import { CONTACT_DIRECTORY_COLUMN_KEYS } from "./constant";

const { Title, Text } = Typography;
const { Search } = Input;

export const ListContactDirectory = () => {
  const { directoryList, setSelectedDirectory, setAction, isListView } =
    useBearStore.contactStore();
  const { screen } = useBearStore.appStore();
  const [searchValue, setSearchValue] = React.useState("");
  let filteredGrid: any[] = [];

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

  const onSearch = (searchValue: string) => {
    setSearchValue(searchValue);
  };

  if (searchValue) {
    console.log({ searchValue });
    filteredGrid = searchGrid(searchValue, directoryList);
    console.log({ filteredGrid });
  }

  return (
    <div className="list-contact-directory__container">
      <Search
        placeholder="Search here"
        onSearch={onSearch}
        style={{ width: screen === "MOBILE" ? "100%" : "40%" }}
        size="large"
        allowClear
      />
      <Row gutter={[16, 16]}>
        {isListView ? (
          <DataTable
            columns={contactDirectoryColumns}
            data={searchValue ? filteredGrid : directoryList}
          />
        ) : (
          (searchValue ? filteredGrid : directoryList).map((directory) => {
            return (
              <Col span={screen === "MOBILE" ? 24 : 8} key={directory.id}>
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
