import React from "react";
import "./styles.scss";
import { Button, Typography } from "antd";
import { API } from "../../api";
import { useBearStore } from "../../store";
import { ContactDirectoryType } from "../../types";
import { ContactDirectory } from "./components/contactDirectory";

const { Title } = Typography;

export const ContactManagement = () => {
  const { setLoading } = useBearStore.appStore();
  const { setDirectoryList } = useBearStore.contactStore();

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
    <div>
      <Title level={3}>Contact Management</Title>
      <Button type="primary">Create Directory</Button>
      <ContactDirectory />
    </div>
  );
};
