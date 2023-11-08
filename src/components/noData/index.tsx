import React from "react";
import { Empty } from "antd";

type NoDataType = {
  description?: React.ReactNode;
};

export const NoData = (props: NoDataType) => {
  const { description } = props;
  return (
    <Empty
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      description={<span>{description}</span>}
    />
  );
};
