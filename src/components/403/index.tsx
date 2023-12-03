import React from "react";
import { Button, Result } from "antd";
import { ILLUSTRATION_ASSETS } from "../../constants";
import { useBearStore } from "../../store";

export const App403: React.FC = () => {
  const { screen } = useBearStore.appStore();
  const randomIndex = Math.ceil(
    Math.random() * (ILLUSTRATION_ASSETS.forbidden - 1)
  );
  const imageUrl = React.useMemo(() => {
    return new URL(
      `../../assets/svg/403/403-${randomIndex}.svg`,
      import.meta.url
    );
  }, []);
  return (
    <Result
      icon={
        <img
          src={imageUrl as any}
          alt=""
          width={screen === "MOBILE" ? "100%" : "30%"}
        />
      }
      subTitle="Sorry, you are not authorized to access this page."
      title="Unauthorized"
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
