import React from "react";
import { Card, Tag, Space, Typography, Row, Col, Divider, Image } from "antd";
import { MyInvitationType } from "../../types";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import MapIcon from "@mui/icons-material/Map";
import { CHANNEL_OPTIONS } from "../../constants";
import { useBearStore } from "../../store";
import { checkIsPdf } from "../../utils/validation.utils";
import { PdfViewer } from "../pdfViewer";

const { Text, Link } = Typography;

export const InvitationCard = (props: MyInvitationType) => {
  const {
    name,
    type,
    startDateTime,
    endDateTime,
    location,
    invitationAttachment,
    locationUrl,
    invitedByInfo,
  } = props;

  const { screen } = useBearStore.appStore();
  const colOption = (count: number) =>
    screen === "MOBILE"
      ? {
          flex: count,
        }
      : { span: count };

  const formattedStartDateTime = new Date(
    startDateTime as string
  ).toLocaleString();
  const formattedEndDateTime = new Date(endDateTime as string).toLocaleString();

  return (
    <Card
      title="Event Details"
      extra={
        <Tag bordered={false} color="success">
          {type}
        </Tag>
      }
    >
      <Space
        direction="vertical"
        size="middle"
        style={{ width: "100%", textAlign: "start" }}
      >
        <RenderList name="Event Name" value={<>{name}</>} />
        <RenderList
          name="Event Date"
          value={
            <>
              <CalendarMonthIcon
                fontSize="small"
                style={{ position: "relative", top: "4px" }}
              />{" "}
              {formattedStartDateTime} - {formattedEndDateTime}
            </>
          }
        />
        <RenderList
          name="Event location"
          value={
            <>
              <LocationOnIcon
                fontSize="small"
                style={{ position: "relative", top: "4px" }}
              />{" "}
              {location}
            </>
          }
        />
        {locationUrl && (
          <RenderList
            name="Google location"
            value={
              <>
                <MapIcon
                  fontSize="small"
                  style={{ position: "relative", top: "4px" }}
                />{" "}
                <Link target="_blank" href={locationUrl}>
                  Click here
                </Link>
              </>
            }
          />
        )}
        <RenderList
          name="Invited by"
          value={
            <>
              <PersonIcon
                fontSize="small"
                style={{ position: "relative", top: "4px" }}
              />{" "}
              {invitedByInfo?.firstName} {invitedByInfo?.lastName} (
              {invitedByInfo?.mobile})
            </>
          }
        />
        {invitationAttachment && (
          <Row>
            {invitationAttachment.map((invitation) => (
              <Col {...colOption(invitationAttachment?.length === 1 ? 24 : 12)}>
                {checkIsPdf(invitation.url) ? (
                  <PdfViewer url={invitation.url} />
                ) : (
                  <img
                    loading="lazy"
                    alt="example"
                    style={{ width: "100%" }}
                    src={invitation?.url}
                  />
                )}
              </Col>
            ))}
          </Row>
        )}
      </Space>
    </Card>
  );
};

type RenderListType = {
  name: React.ReactNode;
  value: React.ReactNode;
};

const RenderList = (props: RenderListType) => {
  const { name, value } = props;
  const { screen } = useBearStore.appStore();
  const colOption = (count: number) =>
    screen === "MOBILE"
      ? {
          flex: count,
        }
      : { span: count };
  return (
    <>
      <Row>
        <Col {...colOption(8)}>
          <Text strong style={{ fontSize: "16px" }}>
            {name}
          </Text>
        </Col>
        <Col {...colOption(16)}>
          <Text italic>{value}</Text>
        </Col>
      </Row>
      <Divider />
    </>
  );
};
