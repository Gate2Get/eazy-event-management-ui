import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Alert, Col, Input, MenuProps, Row, Space, Typography } from "antd";
import React from "react";
import { ContactDirectoryCard } from "../../../../components/contactDirectoryCard";
import { DataTable } from "../../../../components/dataTable";
import { EmptyData } from "../../../../components/EmptyData";
import { useBearStore } from "../../../../store";
import { ContactDirectoryType } from "../../../../types";
import { searchGrid } from "../../../../utils/searchGrid.utils";
import { contactDirectoryColumns } from "./config";
import { CONTACT_DIRECTORY_COLUMN_KEYS, SORT_KEYS } from "./constant";
import NoContact from "../../../../assets/svg/no-contact.svg";
import { useSearchParams } from "react-router-dom";
import { NO_PLAN_ASSIGNED_MESSAGE, PAGE_ACTION } from "../../../../constants";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";

const { Link, Text } = Typography;
const { Search } = Input;

export const ListContactDirectory = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { directoryList, setSelectedDirectory, setAction, isListView } =
    useBearStore.contactStore();
  const { screen } = useBearStore.appStore();
  const { activePlan } = useBearStore.userStore();
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
      icon: <EditOutlinedIcon style={{ color: "rgb(102, 112, 133)" }} />,
    },
  ];

  contactDirectoryColumns.forEach((column) => {
    if (column.key === CONTACT_DIRECTORY_COLUMN_KEYS.ACTION) {
      column.render = (record) => (
        <Space>
          <EditOutlinedIcon
            fontSize="inherit"
            onClick={() => {
              onEditSelect(record);
            }}
            style={{ color: "rgb(102, 112, 133)", cursor: "pointer" }}
          />
          <VisibilityIcon
            fontSize="inherit"
            onClick={() => {
              onViewSelect(record);
            }}
            style={{ color: "rgb(102, 112, 133)", cursor: "pointer" }}
          />
        </Space>
      );
    } else if (column.key === CONTACT_DIRECTORY_COLUMN_KEYS.NAME) {
      column.render = (record) => (
        <Text
          style={{ cursor: "pointer" }}
          onClick={() => {
            onViewSelect(record);
          }}
        >
          {record.name}
        </Text>
      );
    }
  });

  const onViewSelect = (record: ContactDirectoryType) => {
    setSearchParams({ id: record.id as string, action: PAGE_ACTION.VIEW });
  };

  const onEditSelect = (record: ContactDirectoryType) => {
    setSearchParams({ id: record.id as string, action: PAGE_ACTION.EDIT });
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
              onChange={(e) => {
                onSearch(e.target.value);
              }}
              style={{ width: "100%" }}
              allowClear
            />
          ) : null}
        </Col>
        <Col {...colOption(12)}>
          {searchValue ? (
            <Text italic className="float-right">
              Showing <Text strong>{filteredGrid.length}</Text> of{" "}
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
      <div className="padding-bottom-8">
        <Alert
          message={
            activePlan?.isActive
              ? (activePlan?.contactDirectoryCount as number) <= 0
                ? `According to your plan, you have successfully created all ${activePlan?.pricingPlan?.contactDirectoryCount} contact directories allowed.`
                : `According to your plan, you have currently created ${
                    (activePlan?.pricingPlan?.contactDirectoryCount as number) -
                    (activePlan?.contactDirectoryCount as number)
                  } out of ${
                    activePlan?.pricingPlan?.contactDirectoryCount
                  } contact directories.`
              : NO_PLAN_ASSIGNED_MESSAGE("contact directories")
          }
          type={activePlan?.isActive ? "info" : "warning"}
          icon={<PriorityHighIcon />}
          closable={activePlan?.isActive}
          showIcon
        />
      </div>
      {(searchValue ? filteredGrid : directoryList)?.length ? (
        <Row gutter={[16, 16]}>
          {isListView ? (
            <DataTable
              columns={contactDirectoryColumns}
              data={searchValue ? filteredGrid : directoryList}
              sortKeys={SORT_KEYS}
            />
          ) : (
            (searchValue ? filteredGrid : directoryList).map((directory) => {
              return (
                <Col
                  span={screen === "MOBILE" ? 24 : 8}
                  key={directory.id}
                  style={{ cursor: "pointer" }}
                >
                  <ContactDirectoryCard
                    cardContact={directory}
                    menuItems={getMenuItems(directory)}
                    onClick={() => {
                      onViewSelect(directory);
                    }}
                  />
                </Col>
              );
            })
          )}
        </Row>
      ) : (
        <EmptyData
          onClickAction={() => {
            setSearchParams({
              action: PAGE_ACTION.ADD,
            });
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
          buttonText={
            (activePlan?.contactDirectoryCount as number) > 0
              ? "Create Contact"
              : undefined
          }
        />
      )}
    </div>
  );
};
