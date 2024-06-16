import { IdcardOutlined, MoreOutlined } from "@ant-design/icons";
import {
  Avatar,
  Badge,
  Button,
  Card,
  Checkbox,
  Col,
  Dropdown,
  Input,
  MenuProps,
  Row,
  Typography,
} from "antd";
import React from "react";
import {
  EVENT_SEND_STATUS_LABEL_MAP,
  EVENT_SEND_STATUS_MAP,
} from "../../constants";
import { ContactDirectoryType, EditConfigType } from "../../types";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import "./styles.scss";
import { cloneDeep } from "lodash";

const { Title, Text, Paragraph } = Typography;

type ContactUserCardType = {
  id: string;
  name: string;
  senderId: number | string;
  image?: string;
  status?: number;
  menuItems?: MenuProps["items"];
  editable?: boolean | EditConfigType;
  isError?: boolean;
  isSelected?: boolean;
  onContactChange?: (id: string, name: string, value: string) => void;
  onSelectCard?: (id: string, checked: boolean) => void;
  showLogs?: boolean;
  otherProps?: Record<string, any>;
  data?: Record<string, any>;
};

export const ContactUserCard = (props: ContactUserCardType) => {
  const {
    senderId,
    name,
    id,
    menuItems,
    editable,
    status,
    image,
    isError,
    isSelected,
    onContactChange,
    onSelectCard,
    showLogs,
    data = {},
    otherProps = {},
  } = props;

  const avatarClassName = image ? "" : `ee__avatar-color`; //-${name?.toString()?.[0]?.toLowerCase()}`;

  const userAvatar = image ? (
    <Avatar shape="square" size={50} src={image} />
  ) : (
    <Avatar shape="square" size={50} className={avatarClassName}>
      {name
        ?.toString()
        .split(" ")
        .map((item) => item?.[0])
        .splice(0, 2)
        .join("")}
    </Avatar>
  );

  const onRowToggle = (key: string) => {
    const { onRowToggle, expandedRows } = otherProps;
    const _expandedRows = cloneDeep(expandedRows || {});
    if (_expandedRows[key]) {
      delete _expandedRows[key];
    } else {
      _expandedRows[key] = true;
    }
    onRowToggle?.({ data: _expandedRows });
  };

  return (
    <Badge.Ribbon
      className={!status ? "contact-card__no-status" : ""}
      text={EVENT_SEND_STATUS_MAP[status?.toString() as string]}
      color={EVENT_SEND_STATUS_LABEL_MAP[status?.toString() as string]}
    >
      <Card
        className={`contact-user-card__container ${isSelected && "selected"}`}
      >
        <Row gutter={[-8, 16]}>
          <Col span={6}>
            <div>{userAvatar}</div>
            {editable && (
              <div>
                <Checkbox
                  checked={isSelected}
                  style={{ position: "relative", left: "20%" }}
                  onChange={(e) => {
                    onSelectCard?.(id, e.target.checked);
                  }}
                />
              </div>
            )}
          </Col>
          <Col
            span={menuItems || editable || showLogs ? 15 : 17}
            className="contact-name-sender__container"
          >
            <div style={editable ? { marginBottom: "5px" } : {}}>
              {editable ? (
                <Input
                  placeholder="Input user name"
                  status={isError && !name ? "error" : ""}
                  value={name}
                  onChange={(e) => {
                    onContactChange?.(id, "name", e.target.value);
                  }}
                />
              ) : (
                <Text strong>{name}</Text>
              )}
            </div>
            <div>
              {editable ? (
                <Input
                  placeholder="Input user mobile"
                  status={isError && !senderId ? "error" : ""}
                  value={senderId}
                  onChange={(e) => {
                    onContactChange?.(id, "senderId", e.target.value);
                  }}
                  maxLength={10}
                />
              ) : (
                <Text>{senderId.toString()}</Text>
              )}
            </div>
          </Col>
          {menuItems && (
            <Col span={2}>
              <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
                <MoreOutlined />
              </Dropdown>
            </Col>
          )}
          {showLogs && (
            <Col span={2}>
              <Button
                type="text"
                icon={
                  otherProps?.expandedRows?.[data?.[otherProps?.dataKey]] ? (
                    <RemoveIcon fontSize="inherit" />
                  ) : (
                    <AddIcon fontSize="inherit" />
                  )
                }
                onClick={() => {
                  onRowToggle(data?.[otherProps?.dataKey]);
                }}
              />
            </Col>
          )}
        </Row>
        {showLogs &&
          otherProps?.expandedRows?.[data?.[otherProps?.dataKey]] &&
          otherProps?.rowExpansionTemplate(data)}
      </Card>
    </Badge.Ribbon>
  );
};
