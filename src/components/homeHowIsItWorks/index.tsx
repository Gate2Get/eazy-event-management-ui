import { Col, Row, Tag, Typography } from "antd";
import React from "react";
import { useWindowSize } from "../../hooks/useWindowSize";
import { useBearStore } from "../../store";
import "./styles.scss";
import { useSpring, animated } from "react-spring";
import { useInView } from "react-intersection-observer";

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

  const [ref, inView] = useInView({
    triggerOnce: false,
  });

  const animationCol = (order: number) =>
    useSpring({
      opacity: inView ? 1 : 0,
      transform: inView
        ? "translateX(0)"
        : order === 2
        ? "translateX(-50px)"
        : "translateX(50px)",
      config: { tension: 50, friction: 10 },
    });

  const colOption = (count: number) =>
    screen === "MOBILE"
      ? {
          flex: count,
        }
      : { span: count };

  return (
    <div className="home-how-is-it-works__container">
      <Row gutter={[64, 64]} className="content-row">
        <Col
          {...colOption(14)}
          order={!isOdd && screen !== "MOBILE" ? 2 : 1}
          className="how-is-it-works__image"
          ref={ref} // Attach the ref here
        >
          <animated.img
            src={image}
            alt=""
            width={screen === "MOBILE" ? width - 100 : width / 2}
            style={animationCol(!isOdd && screen !== "MOBILE" ? 2 : 1)}
          />
        </Col>
        <Col {...colOption(10)} order={!isOdd && screen !== "MOBILE" ? 1 : 2}>
          <animated.div
            style={animationCol(!isOdd && screen !== "MOBILE" ? 2 : 1)}
          >
            <Tag bordered={false} color="rgb(18, 183, 106)">
              <Text className="tag-module" italic>
                {moduleName}
              </Text>
            </Tag>
            <Title
              className="content-title"
              level={screen === "MOBILE" ? 2 : 1}
            >
              {title}
            </Title>
            <Text className="content-text">{text}</Text>
          </animated.div>
        </Col>
      </Row>
    </div>
  );
};
