import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Col, Input, MenuProps, Row, Space, Typography } from "antd";
import React from "react";
import { ContactDirectoryCard } from "../../../../components/contactDirectoryCard";
import { DataTable } from "../../../../components/dataTable";
import { EmptyData } from "../../../../components/EmptyData";
import { useBearStore } from "../../../../store";
import { ContactDirectoryType } from "../../../../types";
import { searchGrid } from "../../../../utils/searchGrid.utils";
import { contactDirectoryColumns } from "./config";
import { CONTACT_DIRECTORY_COLUMN_KEYS } from "./constant";
import NoContact from "../../../../assets/svg/no-contact.svg";

const { Link, Text } = Typography;
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

  const colOption = (count: number) =>
    screen === "MOBILE"
      ? {
          flex: count,
        }
      : { span: count };

  return (
    <div className="list-contact-directory__container">
      <Row gutter={[8, 8]} className="margin-bottom-16">
        <Col {...colOption(12)}>
          {directoryList.length ? (
            <Search
              placeholder="Search here"
              value={searchValue}
              onSearch={onSearch}
              style={{ width: "100%" }}
              size="large"
              allowClear
            />
          ) : null}
        </Col>
        <Col {...colOption(12)}>
          {searchValue ? (
            <Text italic className="float-right">
              Showing <Text strong>{filteredGrid.length}</Text> of
              <Text strong>{directoryList.length}</Text> directories
            </Text>
          ) : (
            <Text italic className="float-right">
              Showing total <Text strong>{directoryList.length} </Text>
              directories
            </Text>
          )}
        </Col>
      </Row>
      {(searchValue ? filteredGrid : directoryList)?.length ? (
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
      ) : (
        <EmptyData
          onClickAction={() => {
            setAction("ADD");
          }}
          image={NoContact}
          description={
            searchValue ? (
              <>
                No contact to show for the selected filter,{" "}
                <Link
                  href="#"
                  onClick={() => {
                    onSearch("");
                  }}
                >
                  Clear filter
                </Link>
              </>
            ) : (
              "No contact to show"
            )
          }
          buttonText="Create Contact"
        />
      )}
    </div>
  );
};
