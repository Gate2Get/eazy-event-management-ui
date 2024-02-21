import React from "react";
import { Button, Space, Typography } from "antd";
import "./styles.scss";
import { useBearStore } from "../../store";

const { Text } = Typography;

type EmptyDataType = {
  image: string;
  onClickAction?: () => void;
  description: React.ReactNode;
  buttonText?: string;
};

export const EmptyData = (props: EmptyDataType) => {
  const { image, onClickAction, description, buttonText } = props;
  const { screen } = useBearStore.appStore();

  return (
    <Space
      className={`empty-data__container ${screen}`}
      direction="vertical"
      size="small"
    >
      <div>
        <img loading="lazy" src={image} alt="" height={250} width="100%" />
      </div>
      <Text type="secondary" italic>
        {description}
      </Text>
      {buttonText && (
        <div>
          <Button type="primary" size="middle" onClick={onClickAction}>
            {buttonText}
          </Button>
        </div>
      )}
    </Space>
  );
};
