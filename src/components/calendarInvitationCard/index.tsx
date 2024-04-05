import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardHeader,
  IconButton,
  CardActions,
} from "@mui/material";
import { MyInvitationType } from "../../types";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { EVENT_TYPE_PROPS, EVENT_TYPES, ROUTES_URL } from "../../constants";
import { useNavigate } from "react-router-dom";
import { Tag, Typography as AntdTypography, Row, Col } from "antd";
import MapIcon from "@mui/icons-material/Map";

const { Link } = AntdTypography;

export const CalendarInvitationCard = (props: MyInvitationType) => {
  const {
    name,
    groomName,
    brideName,
    startDateTime,
    endDateTime,
    location,
    invitationAttachment,
    type,
    personName,
    id,
    locationUrl,
  } = props;

  const formattedStartDateTime = new Date(
    startDateTime as string
  ).toLocaleString();
  const formattedEndDateTime = new Date(endDateTime as string).toLocaleString();
  const navigate = useNavigate();

  return (
    <Card
      style={{
        boxShadow: "none",
        borderRadius: "0.75rem",
      }}
      onClick={() => {
        navigate(
          `${ROUTES_URL.EE}/${ROUTES_URL.MY_INVITATION}?id=${id}&action=VIEW`
        );
      }}
    >
      <CardHeader
        action={
          <Typography
            variant="body2"
            color="text.secondary"
            style={{ textAlign: "end" }}
          >
            <Tag color="success">{EVENT_TYPE_PROPS[type as string].label}</Tag>
          </Typography>
        }
        title={
          <Typography fontWeight={700} variant="body1" color="text.secondary">
            {name}
          </Typography>
        }
        subheader={
          <>
            <Typography variant="body2" color="text.secondary">
              {formattedStartDateTime} - {formattedEndDateTime}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {type === EVENT_TYPES.MARRIAGE
                ? `${groomName} & ${brideName}`
                : type === EVENT_TYPES.BIRTHDAY
                ? `Person: ${personName}`
                : ""}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <MapIcon
                fontSize="small"
                style={{ position: "relative", top: "4px" }}
              />{" "}
              <Link target="_blank" href={locationUrl}>
                {location}
              </Link>
            </Typography>
          </>
        }
      />
    </Card>
  );
};
