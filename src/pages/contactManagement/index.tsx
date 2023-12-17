import React from "react";
import "./styles.scss";
import { Button, Col, Divider, Row, Segmented, Space, Typography } from "antd";
import { API } from "../../api";
import { useBearStore } from "../../store";
import { ContactDirectoryType, ContactListType } from "../../types";
import { ListContactDirectory } from "./components/listContactDirectory";
import { AddEditContactDirectory } from "./components/addEditContactDirectory";
import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressBook } from "@fortawesome/free-solid-svg-icons";
import { urlhandler } from "../../utils/common.utils";
import { useSearchParams } from "react-router-dom";
import { LOCAL_STORAGE_VIEW, PAGE_ACTION } from "../../constants";

const { Title } = Typography;

export const ContactManagement = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { setLoading } = useBearStore.appStore();
  const {
    setDirectoryList,
    action,
    setAction,
    setIsListView,
    isListView,
    setSelectedDirectory,
    setContactList,
  } = useBearStore.contactStore();

  React.useEffect(() => {
    setIsListView(
      localStorage.getItem(LOCAL_STORAGE_VIEW.CONTACT_DIRECTORY) === "List"
    );
    return () => {
      setAction("");
      setDirectoryList([]);
      setIsListView(false);
    };
  }, []);

  React.useEffect(() => {
    urlhandler(searchParams, setAction, getContactList, getContactDirectory);
  }, [searchParams]);

  const getContactDirectory = (): any => {
    setLoading(true);
    API.contactManagement
      .getContactDirectory()
      .then((directoryList: ContactDirectoryType[]) => {
        setDirectoryList(directoryList);
        setLoading(false);
      })
      .catch((error: Error) => {
        setLoading(false);
        console.log({ location: "getContactDirectory", error });
      });
  };

  const getContactList = (id: string): any => {
    setLoading(true);
    API.contactManagement
      .getContactList(id)
      .then((directory: ContactDirectoryType) => {
        setLoading(false);
        setSelectedDirectory({
          id: directory.id,
          name: directory.name,
        });
        setContactList(directory.contacts as ContactListType[]);
      })
      .catch((error: Error) => {
        setLoading(false);
        console.log({ location: "getContactList", error });
      });
  };

  return (
    <div className="contact-management__container">
      {/* <Divider /> */}
      {!action && (
        <>
          <Row wrap gutter={[8, 8]}>
            <Col span={12}>
              <Title level={3}> Contact</Title>
            </Col>
            <Col span={12} className="contact__pagination">
              <Row>
                <Col flex={12} className="create-directory__button">
                  <Button
                    type="primary"
                    className="dark-color-bg"
                    onClick={() => {
                      setSearchParams({
                        action: PAGE_ACTION.ADD,
                      });
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
                      localStorage.setItem(
                        LOCAL_STORAGE_VIEW.CONTACT_DIRECTORY,
                        value.toString()
                      );
                      setIsListView(value === "List");
                    }}
                  />
                </Col>
              </Row>
            </Col>
          </Row>

          <ListContactDirectory />
        </>
      )}
      {action && <AddEditContactDirectory />}
    </div>
  );
};
