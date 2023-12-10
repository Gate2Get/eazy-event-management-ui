import React from "react";
import { Button, Col, Popover, Row, Typography } from "antd";
import dayjs from "dayjs";
import { useBearStore } from "../../store";
import LaptopIcon from "@mui/icons-material/Laptop";
import SmartphoneIcon from "@mui/icons-material/Smartphone";

const { Paragraph } = Typography;

type SessionCardType = {
  sessionId?: String;
  metaData?: String;
  createdAt?: Date;
  expiryAt?: Date;
  isCurrent?: boolean;
  onLogout?: () => void;
};

export const SessionCard = (props: SessionCardType) => {
  const [isLogout, setIsLogout] = React.useState(false);
  const { createdAt, expiryAt, metaData, isCurrent, onLogout } = props;
  const { screen } = useBearStore.appStore();
  const iconSize = screen === "MOBILE" ? "32px" : "40px";

  const handleLogoutOpenChange = (newOpen: boolean) => {
    setIsLogout(newOpen);
  };

  const hideLogout = () => {
    setIsLogout(false);
  };

  const handleLogout = () => {
    onLogout?.();
    hideLogout();
  };

  let userAgent: any = {};
  try {
    userAgent = JSON.parse(metaData as string);
  } catch (error) {
    console.log({ error });
  }

  console.log({ userAgent });
  return (
    <div>
      <Row>
        <Col span={3}>
          {userAgent?.device?.type === "mobile" ? (
            <SmartphoneIcon
              style={{ fontSize: iconSize, color: "rgb(102, 112, 133)" }}
            />
          ) : (
            <LaptopIcon
              style={{ fontSize: iconSize, color: "rgb(102, 112, 133)" }}
            />
          )}
        </Col>
        <Col span={15}>
          <Paragraph>
            {userAgent?.device?.vendor || ""}{" "}
            {userAgent?.device?.model ? `(${userAgent?.device?.model})` : ""}{" "}
            {userAgent?.browser?.name || ""}{" "}
            {userAgent?.browser?.version
              ? `(${userAgent?.browser?.version})`
              : ""}
          </Paragraph>
          <Paragraph italic style={{ color: "rgba(0, 0, 0, 0.45)" }}>
            Logged In - {dayjs(createdAt).format("ddd, MMM D, YYYY h:mm A")}{" "}
            {isCurrent && `(Current User)`}
            {/* Expires In - {dayjs(expiryAt).format("ddd, MMM D, YYYY h:mm A")}{" "} */}
          </Paragraph>
        </Col>
        <Col>
          <Popover
            content={
              <>
                <Button type="link" onClick={handleLogout}>
                  Yes
                </Button>{" "}
                <Button type="text" onClick={hideLogout}>
                  No
                </Button>
              </>
            }
            title="Logout"
            trigger="click"
            open={isLogout}
            onOpenChange={handleLogoutOpenChange}
          >
            <Button type="text">Logout</Button>
          </Popover>
        </Col>
      </Row>
    </div>
  );
};
