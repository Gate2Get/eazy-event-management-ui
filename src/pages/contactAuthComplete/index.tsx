import React from "react";
import { useWindowSize } from "../../hooks/useWindowSize";
import { Typography } from "antd";
import "./styles.scss";

const { Title } = Typography;

export const ContactAuthComplete = () => {
  const { height } = useWindowSize();
  const [timer, setTimer] = React.useState(0);

  React.useEffect(() => {
    localStorage.setItem("isContactToken", "true");
    setTimer(3);
    const intervalId = setInterval(() => {
      setTimer((timer) => timer - 1);
    }, 1000);

    setTimeout(() => {
      //   window.close();
      console.log("clear timeout");
      clearInterval(intervalId);
    }, 5000); // delay of 3 second
  }, []);

  return (
    <div className="contact-auth-complete__container" style={{ height }}>
      <Title level={4}>
        Please wait... Authentication in progress. Do not close your browser; it
        will close automatically in {timer} seconds.
      </Title>
    </div>
  );
};
