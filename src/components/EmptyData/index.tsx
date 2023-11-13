import React from "react";
import { Button, Space, Typography } from "antd";
import "./styles.scss";

const { Text } = Typography;

type EmptyDataType = {
  image: string;
  onClickAction: () => void;
  description: React.ReactNode;
  buttonText: string;
};

export const EmptyData = (props: EmptyDataType) => {
  const { image, onClickAction, description, buttonText } = props;

  return (
    <Space className="empty-data__container" direction="vertical" size="small">
      <div>
        <img src={image} alt="" height={250} width="100%" />
      </div>
      <Text type="secondary" italic>
        {description}
      </Text>
      <div>
        <Button type="primary" size="middle" onClick={onClickAction}>
          {buttonText}
        </Button>
      </div>
    </Space>
  );
};
