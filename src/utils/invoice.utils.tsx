import { Typography } from "antd";
import { PAYMENT_TYPE } from "../constants";
import { PlanPaymentTransactionLogType } from "../types";
import ContactlessIcon from "@mui/icons-material/Contactless";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PaymentsIcon from "@mui/icons-material/Payments";

const { Text } = Typography;

export const getPaymentTypeRender = (
  transaction: PlanPaymentTransactionLogType
) => {
  const { logs } = transaction;
  if (!logs?.data?.paymentInstrument?.type) {
    return <Text>-</Text>;
  } else if (logs?.data?.paymentInstrument?.type === PAYMENT_TYPE.UPI) {
    return (
      <div>
        <ContactlessIcon fontSize="inherit" /> <Text>UPI</Text>
      </div>
    );
  } else if (logs?.data?.paymentInstrument?.type === PAYMENT_TYPE.CARD) {
    const cardType =
      logs?.data?.paymentInstrument?.cardType === "DEBIT_CARD"
        ? "Debit card"
        : "Credit card";
    return (
      <div>
        <CreditCardIcon fontSize="inherit" /> <Text>{cardType}</Text>
      </div>
    );
  } else if (logs?.data?.paymentInstrument?.type === PAYMENT_TYPE.NETBANKING) {
    return (
      <div>
        <PaymentsIcon fontSize="inherit" /> <Text>Net banking</Text>
      </div>
    );
  }
};
