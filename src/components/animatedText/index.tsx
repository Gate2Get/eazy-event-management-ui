import Texty from "rc-texty";
import "../../../node_modules/rc-texty/assets/index.css";
import TweenOne from "rc-tween-one";
import Button from "antd/lib/button";
import React, { ReactNode } from "react";
import "./styles.scss";

export const AnimatedText = () => {
  const [show, setShow] = React.useState(true);
  React.useEffect(() => {
    if (!show) {
      setShow(true);
    }
  }, [show]);
  const geInterval = (e: any) => {
    switch (e.index) {
      case 0:
        return 0;
      case 1:
        return 150;
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
        return 150 + 450 + (e.index - 2) * 10;
      default:
        return 150 + 450 + (e.index - 6) * 150;
    }
  };
  const getEnter = (e: any) => {
    const t = {
      opacity: 0,
      scale: 0.8,
      y: "-100%",
    };
    if (e.index >= 2 && e.index <= 6) {
      return { ...t, y: "-30%", duration: 150 };
    }
    return t;
  };

  const getSplit = (e: any) => {
    const t = e.split(" ");
    const c: any[] = [];
    t.forEach((str: string, i: number) => {
      c.push(<span key={`${str}-${i}`}>{str}</span>);
      if (i < t.length - 1) {
        c.push(<span key={` -${i}`}> </span>);
      }
    });
    return c;
  };

  const onClick = () => {
    // setState({
    //   show: false,
    // }, () => {
    //   setState({
    //     show: true
    //   });
    // });
    setShow(false);
  };

  return (
    <div className="combined-wrapper">
      <div className="combined-reload">
        <Button shape="circle" icon="reload" onClick={onClick} />
      </div>
      {
        <div className="combined">
          <div className="combined-shape">
            <div className="shape-left">
              <TweenOne
                animation={[
                  {
                    x: 158,
                    type: "from",
                    ease: "easeInOutQuint",
                    duration: 600,
                  },
                  {
                    x: -158,
                    ease: "easeInOutQuart",
                    duration: 450,
                    delay: -150,
                  },
                ]}
              />
            </div>
            <div className="shape-right">
              <TweenOne
                animation={[
                  {
                    x: -158,
                    type: "from",
                    ease: "easeInOutQuint",
                    duration: 600,
                  },
                  {
                    x: 158,
                    ease: "easeInOutQuart",
                    duration: 450,
                    delay: -150,
                  },
                ]}
              />
            </div>
          </div>
          <Texty
            className="title"
            type="mask-top"
            delay={400}
            enter={getEnter}
            interval={geInterval}
            component={TweenOne}
            componentProps={{
              animation: [
                { x: 130, type: "set" },
                { x: 100, delay: 500, duration: 450 },
                {
                  ease: "easeOutQuart",
                  duration: 300,
                  x: 0,
                },
                {
                  letterSpacing: 0,
                  delay: -300,
                  scale: 0.9,
                  ease: "easeInOutQuint",
                  duration: 1000,
                },
                {
                  scale: 1,
                  width: "100%",
                  delay: -300,
                  duration: 1000,
                  ease: "easeInOutQuint",
                },
              ],
            }}
          >
            Ant Motion
          </Texty>
          <TweenOne
            className="combined-bar"
            animation={{
              delay: 2000,
              width: 0,
              x: 158,
              type: "from",
              ease: "easeInOutExpo",
            }}
          />
          <Texty
            className="content"
            type="bottom"
            split={getSplit}
            delay={2200}
            interval={30}
          >
            Animation specification and components of Ant Design.
          </Texty>
        </div>
      }
    </div>
  );
};
