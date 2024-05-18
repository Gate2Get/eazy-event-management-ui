import React from "react";
import {
  Card,
  Typography,
  Table,
  Button,
  Row,
  Col,
  Space,
  Tag,
  Alert,
} from "antd";
import PrintIcon from "@mui/icons-material/Print";
import DownloadIcon from "@mui/icons-material/Download";
import Logo from "../../assets/png/logoEazyEvent.png";
import "./styles.scss";
import { API } from "../../api";
import { useBearStore } from "../../store";
import { useNavigate, useParams } from "react-router-dom";
import {
  PlanPaymentTransactionLogType,
  PlanPaymentTransactionType,
} from "../../types";
import dayjs from "dayjs";
import {
  DATE_TIME_FORMAT,
  GST_PERCENTAGE,
  PAYMENT_STATUS,
  PAYMENT_STATUS_COLOR,
  ROUTES_URL,
} from "../../constants";
import { getPaymentTypeRender } from "../../utils/invoice.utils";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const { Title, Text, Paragraph } = Typography;

const columns = [
  {
    title: "Item",
    dataIndex: "item",
    key: "item",
    render: (text: any, record: any) => (
      <div>
        <Title level={5} ellipsis={{ tooltip: text }}>
          {text}
        </Title>
        <Text type="secondary">{record.description}</Text>
      </div>
    ),
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Validity",
    dataIndex: "validity",
    key: "validity",
  },
  {
    title: "Total",
    dataIndex: "total",
    key: "total",
  },
];

export const PlanInvoice = () => {
  const { setLoading, currentPage } = useBearStore.appStore();

  const { transactionId } = useParams();
  const navigate = useNavigate();

  const [transaction, setTransaction] =
    React.useState<PlanPaymentTransactionType>({});

  React.useEffect(() => {
    if (transactionId) {
      getPlanPaymentTransactionById(transactionId);
    }
  }, []);

  const getPlanPaymentTransactionById = (transactionId: string) => {
    setLoading(true);
    API.userManagement
      .getPlanPaymentTransactionById(transactionId)
      .then((transaction) => {
        setLoading(false);
        setTransaction(transaction);
      })
      .catch((error) => {
        setLoading(false);
        console.log({ location: "getPlanPaymentTransactionById", error });
      });
  };

  let dataSource: any[] = [];
  let transactionDetails: any[] = [];
  let gstDetails: any[] = [];
  if (transaction.transaction) {
    dataSource = [
      {
        key: "1",
        item: transaction.plan?.name,
        description: transaction.plan?.type,
        price: transaction.plan?.discountPrice ? (
          <Space direction="vertical">
            <Text>₹{transaction.plan?.discountPrice}</Text>
            <Text delete>₹{transaction.plan?.price}</Text>{" "}
          </Space>
        ) : (
          <Text>₹{transaction.plan?.price}</Text>
        ),
        validity: `${transaction.plan?.validity} days`,
        total: `₹${transaction.plan?.discountPrice || transaction.plan?.price}`,
      },
    ];

    transactionDetails = [
      {
        name: "Transaction Id",
        value: transaction.transaction?.logs?.data?.transactionId,
      },
      {
        name: "Payment Type",
        value: getPaymentTypeRender(
          transaction.transaction as PlanPaymentTransactionLogType
        ),
      },
      {
        name: "Payment Amount",
        value: transaction.transaction?.logs?.data?.amount
          ? `₹${transaction.transaction?.logs?.data?.amount}`
          : "-",
      },
      {
        name: "Payment Message",
        value: transaction.transaction?.logs?.message,
      },
    ];

    const gstAmount =
      (transaction.plan?.discountPrice || (transaction.plan?.price as number)) *
      (GST_PERCENTAGE / 100);
    gstDetails = [
      {
        name: "Sub total",
        value: `₹${transaction.plan?.discountPrice || transaction.plan?.price}`,
      },
      {
        name: `CGST ${GST_PERCENTAGE}%`,
        value: `₹${gstAmount}`,
      },
      {
        name: `CGST ${GST_PERCENTAGE}%`,
        value: `₹${gstAmount}`,
      },
      {
        name: "Total",
        value: `₹${Math.round(
          (transaction.plan?.discountPrice ||
            (transaction.plan?.price as number)) +
            2 * gstAmount
        )}`,
      },
    ];
  }

  const handleGeneratePdf = (transactionId: string): void => {
    setLoading(true);
    const input = document.getElementById("payment-invoice");
    void html2canvas(input as HTMLElement, {
      useCORS: true,
      allowTaint: true,
      scrollY: 0,
    }).then((canvas) => {
      const image = { type: "jpeg", quality: 0.98 };
      const margin = [0.5, 0.5];
      const filename = `Invoice_${transactionId}.pdf`;

      const imgWidth = 8.5;
      let pageHeight = 11;

      const innerPageWidth = imgWidth - margin[0] * 2;
      const innerPageHeight = pageHeight - margin[1] * 2;

      // Calculate the number of pages.
      const pxFullHeight = canvas.height;
      const pxPageHeight = Math.floor(canvas.width * (pageHeight / imgWidth));
      const nPages = Math.ceil(pxFullHeight / pxPageHeight);

      // Define pageHeight separately so it can be trimmed on the final page.
      pageHeight = innerPageHeight;

      // Create a one-page canvas to split up the full image.
      const pageCanvas = document.createElement("canvas");
      const pageCtx = pageCanvas.getContext("2d") as CanvasRenderingContext2D;
      pageCanvas.width = canvas.width;
      pageCanvas.height = pxPageHeight;

      // Initialize the PDF.
      // eslint-disable-next-line new-cap
      const pdf = new jsPDF("p", "in", [8.5, 11], true);

      for (let page = 0; page < nPages; page++) {
        // Trim the final page to reduce file size.
        if (page === nPages - 1 && pxFullHeight % pxPageHeight !== 0) {
          pageCanvas.height = pxFullHeight % pxPageHeight;
          pageHeight = (pageCanvas.height * innerPageWidth) / pageCanvas.width;
        }

        // Display the page.
        const w = pageCanvas.width;
        const h = pageCanvas.height;
        pageCtx.fillStyle = "white";
        pageCtx.fillRect(0, 0, w, h);
        pageCtx.drawImage(canvas, 0, page * pxPageHeight, w, h, 0, 0, w, h);

        // Add the page to the PDF.
        if (page > 0) {
          pdf.addPage();
        }
        const imgData = pageCanvas.toDataURL(
          "image/" + image.type,
          image.quality
        );
        pdf.addImage(
          imgData,
          image.type,
          margin[1],
          margin[0],
          innerPageWidth,
          pageHeight
        );
      }

      pdf.save(filename);
      setLoading(false);
    });
  };

  const buyPlanPayment = (planId: string, transactionId: string): void => {
    setLoading(true);
    API.paymentAPI
      .buyPlanPayment(planId, transactionId)
      .then((data) => {
        setLoading(false);
        const { status, url } = data;
        if (status) {
          // navigate(
          //   `${ROUTES_URL.EE}/${ROUTES_URL.BUY_PLAN}?paymentUrl=${btoa(url)}`
          // );
          window.location.href = url;
        }
      })
      .catch((error: Error) => {
        setLoading(false);
        console.log({ location: "buyPlanPayment", error });
      });
  };

  return (
    <div className="invoice-container">
      <div className="margin-bottom-16">
        <Text
          className="cursor-pointer font-size-16"
          onClick={() => {
            navigate(
              `${ROUTES_URL.EE}/${ROUTES_URL.MY_PLAN_TRANSACTION_HISTORY}`
            );
          }}
        >
          <ArrowBackIcon fontSize="inherit" /> {" back"}
        </Text>
      </div>
      <Row justify="center">
        <Col
          xs={24}
          sm={22}
          md={20}
          lg={18}
          xl={!transaction.transaction?.logs ? 18 : 22}
        >
          <Card style={{ width: "100%" }}>
            <Row gutter={64}>
              <Col span={transaction.transaction?.logs ? 16 : 24}>
                <span id="payment-invoice">
                  <div className="invoice-title">
                    <Row>
                      <Col span={12}>
                        <Text className="app__name">
                          <img
                            loading="lazy"
                            src={Logo}
                            alt=""
                            width={30}
                            style={{ position: "relative", top: "7px" }}
                          />
                          {"  "}Eazy Event
                        </Text>
                      </Col>
                      <Col span={12}>
                        <div className="float-right">
                          <Title level={5}>Invoice #</Title>
                          <Paragraph>
                            {transaction.transaction?.transactionId}{" "}
                          </Paragraph>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  {!transaction.transaction?.logs && (
                    <Alert
                      message="Pending payment"
                      description={`You've initiated the payment process for the ${transaction.plan?.name} plan. Please complete your payment to start enjoying our services.`}
                      type="info"
                      showIcon
                    />
                  )}
                  <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12}>
                      <div className="text-muted">
                        <Title level={5}>Billed To:</Title>
                        <Title level={5}>
                          {transaction.userInfo?.firstName || ""}{" "}
                          {transaction.userInfo?.lastName || ""}{" "}
                        </Title>
                        <div className="mb-1">
                          {transaction.userInfo?.state}
                        </div>
                        <div className="mb-1">
                          {transaction.userInfo?.email}
                        </div>
                        <div>{transaction.userInfo?.mobile}</div>
                      </div>
                    </Col>
                    <Col xs={24} sm={12}>
                      <div className="float-right">
                        <Title level={5}>Eazy Event</Title>
                        <div className="mb-1">Chennai</div>
                        <div className="mb-1">Tamil Nadu</div>
                        <div>GSTIN: 33AAKFE8470G1ZB</div>
                        <div>Contact: 9363967378</div>
                      </div>
                    </Col>
                  </Row>

                  <Row className="margin-top-16">
                    <Paragraph>
                      <Text strong>Paid Date: </Text>{" "}
                      {dayjs(transaction.transaction?.updatedAt).format(
                        DATE_TIME_FORMAT
                      )}
                    </Paragraph>
                  </Row>

                  <div className="py-2">
                    <Title level={5} className="font-size-15">
                      Order Summary
                    </Title>
                    <div className="table-responsive">
                      <Table
                        dataSource={dataSource}
                        columns={columns}
                        pagination={false}
                        className="mb-0"
                      />
                    </div>
                    <Space direction="vertical" style={{ width: "100%" }}>
                      <table className="float-right margin-top-16">
                        {gstDetails.map((item) => (
                          <tr>
                            <td className="padding-right-16">
                              <Text strong>{item.name}</Text>
                            </td>
                            <td className="padding-left-16">{item.value}</td>
                          </tr>
                        ))}
                        <tr>
                          <td colSpan={2}>
                            {transaction.transaction?.logs?.code ? (
                              <Tag
                                color={
                                  PAYMENT_STATUS_COLOR?.[
                                    transaction.transaction?.logs
                                      ?.code as string
                                  ] || "default"
                                }
                                icon={<TaskAltIcon fontSize="inherit" />}
                                style={{ width: "100%", textAlign: "center" }}
                              >
                                {PAYMENT_STATUS?.[
                                  transaction.transaction?.logs?.code as string
                                ] || <></>}
                              </Tag>
                            ) : (
                              <Button
                                type="primary"
                                style={{ width: "100%" }}
                                onClick={() => {
                                  buyPlanPayment(
                                    transaction.transaction?.planId as string,
                                    transaction.transaction
                                      ?.transactionId as string
                                  );
                                }}
                              >
                                Complete payment
                              </Button>
                            )}
                          </td>
                        </tr>
                      </table>
                    </Space>
                  </div>
                </span>
                {transaction.transaction?.logs?.code === "PAYMENT_SUCCESS" && (
                  <Space direction="vertical" style={{ width: "100%" }}>
                    <div className="d-print-none mt-4">
                      <div className="float-right">
                        <Button
                          type="primary"
                          icon={<DownloadIcon fontSize="inherit" />}
                          onClick={() => {
                            handleGeneratePdf(transactionId as string);
                          }}
                        >
                          Download
                        </Button>
                        <Button
                          type="primary"
                          icon={<PrintIcon fontSize="inherit" />}
                          onClick={() => window.print()}
                          className="margin-left-8"
                        >
                          Print
                        </Button>
                      </div>
                    </div>
                  </Space>
                )}
              </Col>
              {transaction.transaction?.logs && (
                <Col flex={8} className="payment-details">
                  <Space direction="vertical" style={{ padding: "8px" }}>
                    <Tag
                      color={
                        PAYMENT_STATUS_COLOR?.[
                          transaction.transaction?.logs?.code as string
                        ] || "processing"
                      }
                    >
                      {PAYMENT_STATUS?.[
                        transaction.transaction?.logs?.code as string
                      ] || "Pending Payment"}
                    </Tag>
                    <Title level={5}>Payment Details:</Title>

                    {transactionDetails.map((item) => (
                      <div>
                        <Paragraph strong>{item.name}</Paragraph>
                        <Paragraph>{item.value}</Paragraph>
                      </div>
                    ))}
                  </Space>
                </Col>
              )}
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
