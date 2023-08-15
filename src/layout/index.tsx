import React from "react";
import { Layout } from "antd";
import { useWindowSize } from "../hooks/useWindowSize";
import { Header as AppHeader } from "../components/header";
import "./styles.scss";

const { Header, Content } = Layout;

export const AppLayout: React.FC<any> = (props): React.ReactElement => {
  /* A custom hook that returns the width and height of the window. */
  const { height } = useWindowSize();

  const { children } = props;

  return (
    <Layout>
      <Header className="layout__header">
        <AppHeader />
      </Header>
      <Layout>
        <Content
          style={{
            margin: "10px 10px",
            padding: 10,
            background: "#FFFFFF",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
