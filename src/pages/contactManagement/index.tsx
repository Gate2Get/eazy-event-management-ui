import React from "react";
import "./styles.scss";
import {
  Button,
  Col,
  Divider,
  FloatButton,
  Row,
  Segmented,
  Space,
  Typography,
} from "antd";
import { API } from "../../api";
import { useBearStore } from "../../store";
import { ContactDirectoryType, ContactListType } from "../../types";
import { ListContactDirectory } from "./components/listContactDirectory";
import { AddEditContactDirectory } from "./components/addEditContactDirectory";
import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import { urlHandler } from "../../utils/common.utils";
import { useSearchParams } from "react-router-dom";
import { LOCAL_STORAGE_VIEW, PAGE_ACTION } from "../../constants";

const { Title } = Typography;

export const ContactManagement = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { setLoading, screen } = useBearStore.appStore();
  const {
    setDirectoryList,
    action,
    setAction,
    setIsListView,
    isListView,
    setSelectedDirectory,
    setContactList,
  } = useBearStore.contactStore();
  const { activePlan } = useBearStore.userStore();

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
    urlHandler(searchParams, setAction, getContactList, getContactDirectory);
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
      {!action && (
        <>
          <Row wrap gutter={[8, 8]}>
            <Col span={12}>
              <Title level={3}> Contact</Title>
            </Col>
          </Row>
          <Row wrap gutter={[8, 8]}>
            <Col flex={12} className="contact__pagination">
              {screen !== "MOBILE" &&
                (activePlan?.contactDirectoryCount as number) > 0 && (
                  <Button
                    type="primary"
                    className="dark-color-bg"
                    onClick={() => {
                      setSearchParams({
                        action: PAGE_ACTION.ADD,
                      });
                    }}
                    icon={<CreateNewFolderIcon fontSize="inherit" />}
                  >
                    Create
                  </Button>
                )}
            </Col>

            <Col className="list__grid-view contact__pagination">
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
          <ListContactDirectory />
        </>
      )}
      {action && <AddEditContactDirectory />}
      {!action &&
        screen === "MOBILE" &&
        (activePlan?.contactDirectoryCount as number) > 0 && (
          <FloatButton
            shape="square"
            style={{ right: 24 }}
            icon={
              <Button
                size="large"
                type="primary"
                style={{ width: "100%" }}
                className="dark-color-bg"
                onClick={() => {
                  setSearchParams({
                    action: PAGE_ACTION.ADD,
                  });
                }}
                icon={<CreateNewFolderIcon fontSize="inherit" />}
              >
                Create Directory
              </Button>
            }
          />
        )}
    </div>
  );
};
