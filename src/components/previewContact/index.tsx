import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";
import { Col, Row, Segmented, Space } from "antd";
import React from "react";
import { LOCAL_STORAGE_VIEW } from "../../constants";
import { useBearStore } from "../../store";
import { ContactListType } from "../../types";
import { ContactUserCard } from "../contactUserCard";
import { DataTable } from "../dataTable";
import { contactListColumns } from "./config";

type PreviewContactType = {
  contactList: ContactListType[];
};

export const PreviewContact = (props: PreviewContactType) => {
  const { contactList } = props;
  const { screen } = useBearStore.appStore();
  const { setIsListView, isListView } = useBearStore.contactStore();

  React.useEffect(() => {
    setIsListView(
      localStorage.getItem(LOCAL_STORAGE_VIEW.CONTACT_LIST) === "List"
    );
  }, []);

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Segmented
        value={isListView ? "List" : "Card"}
        options={[
          {
            value: "List",
            icon: <BarsOutlined />,
          },
          {
            value: "Card",
            icon: <AppstoreOutlined />,
          },
        ]}
        onChange={(value) => {
          localStorage.setItem(
            LOCAL_STORAGE_VIEW.CONTACT_LIST,
            value.toString()
          );
          setIsListView(value === "List");
        }}
        style={{ float: "right", marginBottom: ".5rem" }}
      />
      {isListView ? (
        <DataTable columns={contactListColumns} data={contactList} />
      ) : (
        <Row gutter={[16, 16]}>
          {contactList.map((contact) => (
            <Col span={screen === "MOBILE" ? 24 : 8} key={contact.id}>
              <ContactUserCard
                senderId={contact.senderId}
                name={contact.name}
                id={contact.id}
                status={contact.status}
              />
            </Col>
          ))}
        </Row>
      )}
    </Space>
  );
};
