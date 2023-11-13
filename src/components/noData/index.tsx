import React from "react";
import { Empty } from "antd";

type NoDataType = {
  description?: React.ReactNode;
  image?: React.ReactNode;
};

export const NoData = (props: NoDataType) => {
  const { description, image = Empty.PRESENTED_IMAGE_SIMPLE } = props;
  return <Empty image={image} description={<span>{description}</span>} />;
};
