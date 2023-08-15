import React from "react";
import "./styles.scss";
import { Button, Col, Row, Segmented, Space, Typography } from "antd";
import { API } from "../../api";
import { useBearStore } from "../../store";
import { ActionType, ContactDirectoryType } from "../../types";
import { ViewContactDirectory } from "./components/viewContactDirectory";
import { AddEditContactDirectory } from "./components/addEditContactDirectory";
import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";

const { Title } = Typography;

export const ContactManagement = () => {
  const { setLoading } = useBearStore.appStore();
  const { setDirectoryList, action, setAction, setIsListView, isListView } =
    useBearStore.contactStore();

  React.useEffect(() => {
    getContactDirectory();
  }, []);

  const getContactDirectory = (): any => {
    setLoading(true);
    API.contactManagement
      .getContactDirectory()
      .then((contacts: ContactDirectoryType[]) => {
        setDirectoryList(contacts);
      })
      .catch((error: Error) => {
        setLoading(false);
        console.log({ location: "getContactDirectory", error });
      });
  };

  return (
    <Space direction="vertical" className="contact-management__container">
      <Title level={3}>Contact Management</Title>
      <Row>
        <Col flex={12}>
          <Button
            type="primary"
            onClick={() => {
              setAction("ADD");
            }}
          >
            Create Directory
          </Button>
        </Col>
        <Col className="list__grid-view">
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
              setIsListView(value === "List");
            }}
          />
        </Col>
      </Row>
      <ViewContactDirectory />
      <AddEditContactDirectory
        action={action as ActionType}
        isOpen={action === "ADD" || action === "EDIT"}
        setOpen={setAction}
      />
    </Space>
  );
};
