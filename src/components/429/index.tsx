import React from "react";
import { Button, Result } from "antd";
import { useBearStore } from "../../store";

const imageUrl = new URL(
  `../../assets/svg/Error-429-pana.svg`,
  import.meta.url
);

export const App429: React.FC = () => {
  const { screen } = useBearStore.appStore();

  return (
    <Result
      icon={
        <img
          loading="lazy"
          src={imageUrl as any}
          alt=""
          width={screen === "MOBILE" ? "100%" : "30%"}
        />
      }
      subTitle="You've made too many requests in a short period. Please wait a few moments and try again later. We apologize for the inconvenience."
      title="Too many request"
      extra={
        <Button
          type="default"
          onClick={() => {
            window.location.replace("/");
          }}
        >
          Back Home
        </Button>
      }
    />
  );
};
