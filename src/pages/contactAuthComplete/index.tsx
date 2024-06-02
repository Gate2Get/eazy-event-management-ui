import React from "react";
import { useWindowSize } from "../../hooks/useWindowSize";
import { Typography } from "antd";
import "./styles.scss";
import { useBearStore } from "../../store";
import { API } from "../../api";

const { Title } = Typography;

export const ContactAuthComplete = () => {
  const { height } = useWindowSize();

  React.useEffect(() => {
    localStorage.setItem("contactToken", Date.now().toString());

    setTimeout(() => {
      window.close();
      console.log("clear timeout");
    }, 3000); // delay of 3 second
  }, []);

  return (
    <div className="contact-auth-complete__container" style={{ height }}>
      <Title level={4}>
        Please wait... Authentication in progress. Do not close your browser; it
        will close automatically.
      </Title>
    </div>
  );
};
