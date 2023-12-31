import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Col,
  ColProps,
  DatePicker,
  Row,
  Tag,
  Typography,
  Modal,
  Input,
  InputNumber,
  Space,
  Segmented,
  Badge,
  Form,
  Select,
} from "antd";
import React from "react";
import { API } from "../../api";
import {
  EVENT_STATUS,
  EVENT_STATUS_LABEL,
  EVENT_STATUS_LABEL_COLOR,
  EVENT_TYPE_PROPS,
  LOCAL_STORAGE_VIEW,
  PAGE_ACTION,
  TEMPLATE_ADMIN_ACTION,
  TEMPLATE_STATUS_LABEL,
  TEMPLATE_STATUS_LABEL_COLOR,
} from "../../constants";
import { useBearStore } from "../../store";
import {
  APPROVAL_STATUS,
  EventType,
  TemplateAdminType,
  TemplateFilterType,
  TemplateType,
} from "../../types";
import "./styles.scss";
import NoTemplates from "../../assets/svg/no-events.svg";
import { urlhandler } from "../../utils/common.utils";
import { EmptyData } from "../../components/EmptyData";
import {
  modalClassNames,
  modalStyles,
  useModalStyle,
} from "../../configs/antd.config";
import { useTheme } from "antd-style";
import { useSearchParams } from "react-router-dom";
import { ButtonProps } from "antd/lib/button";
import { SORT_KEYS } from "./constant";
import { DataTable } from "../../components/dataTable";
import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";
import FilterListIcon from "@mui/icons-material/FilterList";
import { templateColumns } from "../templateManagement/config";
import { TemplateCard } from "../../components/templateCard";
import {
  TEMPLATE_COLUMN_KEYS,
  TEMPLATE_COLUMN_NAME,
} from "../templateManagement/constant";
import { DataTableColumnType } from "../../components/dataTable/types";
import { TemplateAdminPreview } from "../../components/TemplateAdminPreview";

const { TextArea } = Input;

const { Title, Text } = Typography;

const templateLabel: any = TEMPLATE_STATUS_LABEL;

const templateStatusOptions = Object.entries(templateLabel).map((template: any) => ({
  label: (
    <Tag
      color={TEMPLATE_STATUS_LABEL_COLOR?.[template[0]]}
      className="event-status__tag"
    >
      {templateLabel?.[template[0]]}
    </Tag>
  ),

  value: template[0],
}));

export const ReviewTemplate = () => {
  const { styles } = useModalStyle();
  const token = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  const [reviewColumns, setReviewColumns] = React.useState(
    [] as DataTableColumnType[]
  );
  const { screen, setLoading } = useBearStore.appStore();
  const [adminActionStatus, setAdminActionStatus] = React.useState("");
  const [comment, setComment] = React.useState("");
  const [isError, setIsError] = React.useState(false);
  const [statusFilter, setStatusFilter] = React.useState([EVENT_STATUS.PENDING_APPROVAL]);
  const [isFilter, setIsFilter] = React.useState(false);
  const {
    action,
    setTemplates,
    templates,
    selectedTemplate,
    setSelectedTemplate,
    isListView,
    setIsListView,
    setAction,
  } = useBearStore.templateStore();

  React.useEffect(() => {
    const filters: any = {
      approvalStatus: statusFilter.join(',')
    };

    urlhandler(searchParams, setAction, getTemplateById, () => {
      getTemplates(filters);
    });
  }, [searchParams, statusFilter]);

  React.useEffect(() => {
    const columns = templateColumns.slice(0, templateColumns.length - 1);
    columns.forEach((column) => {
      if (column.key === TEMPLATE_COLUMN_KEYS.NAME) {
        column.render = (record) => (
          <Text
            style={{ cursor: "pointer" }}
            onClick={() => {
              setSelectedTemplate(record);
              onViewSelect(record);
            }}
          >
            {record.name}
          </Text>
        );
      }
    });
    columns.push({
      key: TEMPLATE_COLUMN_KEYS.SUBMITTER,
      dataIndex: TEMPLATE_COLUMN_KEYS.SUBMITTER,
      title: TEMPLATE_COLUMN_NAME.SUBMITTER,
      sortable: true,
      filterable: true,
    });
    columns.push({
      key: TEMPLATE_COLUMN_KEYS.MOBILE,
      dataIndex: TEMPLATE_COLUMN_KEYS.MOBILE,
      title: TEMPLATE_COLUMN_NAME.MOBILE,
      sortable: true,
      filterable: true,
    });
    setReviewColumns(columns);
  }, []);

  React.useEffect(() => {
    setIsListView(
      localStorage.getItem(LOCAL_STORAGE_VIEW.EVENT_REVIEW) === "List"
    );
    return () => {
      console.log("unmounting");
      setTemplates([]);
      setAction("");
      onCancel();
    };
  }, []);

  const colProps: ColProps = {};
  if (screen === "MOBILE") {
    colProps.flex = 8;
  } else {
    colProps.span = 8;
  }

  const onCancel = (isClearAction?: boolean) => {
    if (isClearAction) {
      setSearchParams({});
    }
    setComment("");
    setIsError(false);
    setAdminActionStatus("");
  };

  const onAdminActionSelect = (status: string) => {
    setAdminActionStatus(status);
  };

  const onViewSelect = (record: TemplateType) => {
    setSearchParams({
      id: record.id,
      action: PAGE_ACTION.VIEW,
    });
  };

  const onActionConfirm = () => {
    const { id } = selectedTemplate;
    let isValid = !!comment;

    if (isValid) {
      setIsError(false);
      adminTemplateAction({
        id,
        approvalStatus: adminActionStatus,
        comment
      });
      onCancel();
    } else {
      setIsError(true);
    }
  };

  const renderTemplates = (): React.ReactNode => {
    return templates.length ? (
      isListView ? (
        <DataTable
          columns={reviewColumns}
          data={templates}
          sortKeys={SORT_KEYS}
        />
      ) : (
        templates?.map((template) => (
          <Col {...colProps}>
            <TemplateCard
              template={template}
              onClick={() => {
                setSelectedTemplate(template);
                onViewSelect(template);
              }}
            />
          </Col>
        ))
      )
    ) : (
      <EmptyData image={NoTemplates} description="No templatess to show" />
    );
  };

  const adminTemplateAction = (payload: TemplateAdminType): any => {
    setLoading(true);
    API.adminAPI
      .adminTemplateAction(payload)
      .then((response) => {
        setLoading(false);
        getTemplateById(selectedTemplate.id);
      })
      .catch((error: Error) => {
        setLoading(false);
        console.log({ location: "adminTemplateAction", error });
      });
  };

  const getTemplates = (filters = {}): void => {
    setLoading(true);
    API.adminAPI
      .getTemplates(filters)
      .then((template: TemplateType[]) => {
        setTemplates(template);
        setLoading(false);
      })
      .catch((error: Error) => {
        setLoading(false);
        console.log({ location: "getTemplates", error });
      });
  };

  const getTemplateById = (id?: string): void => {
    setLoading(true);
    API.adminAPI
      .getTemplates({ id })
      .then((templates: TemplateType[]) => {
        setLoading(false);
        if (templates?.length) {
          const record = templates?.[0];
          setSelectedTemplate(record);
        }
      })
      .catch((error: Error) => {
        setLoading(false);
        console.log({ location: "getEvents", error });
      });
  };

  const colOption = (count: number) =>
    screen === "MOBILE"
      ? {
          flex: count,
        }
      : { span: count };

  return (
    <div className="event-review__container">
      <Modal
        title={
          <>
            {adminActionStatus} - {selectedTemplate.name} ?
          </>
        }
        open={!!adminActionStatus}
        onOk={onActionConfirm}
        onCancel={() => onCancel()}
        okText="Yes"
        cancelText="No"
        okType={adminActionStatus === "REJECTED" ? "danger" : "primary"}
        classNames={modalClassNames(styles)}
        styles={modalStyles(token) as any}
      >
        <Space direction="vertical" size="small" style={{ width: "100%" }}>
          <TextArea
            showCount
            maxLength={150}
            value={comment}
            status={isError && !comment ? "error" : ""}
            onChange={(e) => {
              setComment(e.target.value);
            }}
            placeholder="Comments"
            style={{ marginBottom: "10px" }}
          />
        </Space>
      </Modal>
      {(!action || action === "DELETE") && (
        <>
          <Row wrap gutter={[8, 8]}>
            <Col span={12}>
              <Title level={3}> Review Templates</Title>
            </Col>
            <Col span={12} className="upcoming-event__pagination">
              <Button
                type="text"
                icon={
                  <Badge count={Object.values({}).filter((_) => _).length}>
                    <FilterListIcon fontSize="inherit" />
                  </Badge>
                }
                onClick={() => {
                  setIsFilter(!isFilter);
                }}
              >
                Filter
              </Button>

              <Segmented
                style={{ margin: "10px" }}
                value={isListView ? "List" : "Card"}
                options={[
                  {
                    value: "List",
                    icon: <BarsOutlined />,
                  },
                  {
                    value: "Card",
                    icon: <AppstoreOutlined />,
                  },
                ]}
                onChange={(value) => {
                  localStorage.setItem(
                    LOCAL_STORAGE_VIEW.EVENT_REVIEW,
                    value.toString()
                  );
                  setIsListView(value === "List");
                }}
              />
            </Col>
          </Row>
          {isFilter && (
            <Row className="event-review__filters" gutter={[8, 8]}>
              <Col flex={6}>
                <Form layout="vertical">
                  <Form.Item label="Status">
                    <Select
                      style={{ width: "100%" }}
                      allowClear
                      mode="multiple"
                      placeholder="Select a status"
                      optionFilterProp="children"
                      options={templateStatusOptions}
                      value={statusFilter}
                      tagRender={({ label }) => {
                        return (
                          <Tag
                            color={EVENT_STATUS_LABEL_COLOR[label as string]}
                            className="event-status__tag"
                          >
                            {label}
                          </Tag>
                        );
                      }}
                      onChange={(status) => {
                        setStatusFilter(status)
                      }}
                    />
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          )}
          <Row gutter={[16, 16]} className="event-list">
            {renderTemplates()}
          </Row>
        </>
      )}
      {action && action !== "DELETE" && (
        <Row gutter={[16, 16]} className="header__row">
          <Col flex={12}>
            <Row className="header__container">
              <Col {...colOption(4)} className="back-icon__container">
                <Button
                  type="text"
                  onClick={() => {
                    onCancel(true);
                  }}
                  icon={
                    <FontAwesomeIcon icon={faArrowLeft} className="back-icon" />
                  }
                >
                  back
                </Button>
              </Col>
              <Col {...colOption(20)}>
                {TEMPLATE_ADMIN_ACTION.map((button) => (
                  <Button
                    {...(button.props as ButtonProps)}
                    onClick={() => {
                      onAdminActionSelect(button.key);
                    }}
                    style={{ float: "right", margin: ".1rem" }}
                  >
                    {button.label}
                  </Button>
                ))}
              </Col>
            </Row>
          </Col>
        </Row>
      )}
      {action === "VIEW" && <TemplateAdminPreview />}
    </div>
  );
};
