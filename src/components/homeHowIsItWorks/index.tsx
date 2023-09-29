import { Col, Row, Tag, Typography } from "antd";
import React from "react";
import { useWindowSize } from "../../hooks/useWindowSize";
import { useBearStore } from "../../store";

const { Title, Text } = Typography;

type HomeHowIsItWorksType = {
  image: string;
  moduleName: string;
  title: string;
  text: string;
  isOdd?: boolean;
};

export const HomeHowIsItWorks = (props: HomeHowIsItWorksType) => {
  const { width } = useWindowSize();
  const { screen } = useBearStore.appStore();
  const { image, moduleName, title, text, isOdd } = props;

  const colOption = (count: number) =>
    screen === "MOBILE"
      ? {
          flex: count,
        }
      : { span: count };
  return (
    <div>
      <Row gutter={[64, 64]} className="content-row">
        <Col {...colOption(14)} order={!isOdd && screen !== "MOBILE" ? 2 : 1}>
          <img
            src={image}
            alt=""
            width={screen === "MOBILE" ? width - 100 : width / 2}
          />
        </Col>
        <Col {...colOption(10)} order={!isOdd && screen !== "MOBILE" ? 1 : 2}>
          <Tag color="#004484">
            <Text className="tag-module" italic>
              {moduleName}
            </Text>
          </Tag>
          <Title className="content-title">{title}</Title>
          <Text className="content-text">{text}</Text>
        </Col>
      </Row>
    </div>
  );
};
