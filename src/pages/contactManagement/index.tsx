import React from "react";
import "./styles.scss";
import { Button, Col, Divider, Row, Segmented, Space, Typography } from "antd";
import { API } from "../../api";
import { useBearStore } from "../../store";
import { ContactDirectoryType } from "../../types";
import { ListContactDirectory } from "./components/listContactDirectory";
import { AddEditContactDirectory } from "./components/addEditContactDirectory";
import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressBook } from "@fortawesome/free-solid-svg-icons";

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
        setLoading(false);
      })
      .catch((error: Error) => {
        setLoading(false);
        console.log({ location: "getContactDirectory", error });
      });
  };

  return (
    <div className="contact-management__container">
      <Divider />
      {!action && (
        <>
          <Row>
            <Col flex={12} className="create-directory__button">
              <Button
                size="large"
                type="primary"
                className="dark-color-bg"
                onClick={() => {
                  setAction("ADD");
                }}
                icon={
                  <FontAwesomeIcon
                    icon={faAddressBook}
                    className="padding-right-8"
                  />
                }
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
          <ListContactDirectory />
        </>
      )}
      {action && <AddEditContactDirectory />}
    </div>
  );
};
