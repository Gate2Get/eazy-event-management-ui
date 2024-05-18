import React from "react";
import { useBearStore } from "../../store";
import { API } from "../../api";
import { PlanPaymentTransactionLogType } from "../../types";
import { DataTable } from "../../components/dataTable";
import { planPurchaseHistoryColumns } from "./config";
import { PLAN_PURCHASE_HISTORY_COLUMN_KEYS } from "./constants";
import { Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { ROUTES_URL } from "../../constants";

const { Link, Title } = Typography;

export const PlanPurchaseHistory = () => {
  const { setLoading, currentPage } = useBearStore.appStore();
  const navigate = useNavigate();
  const [transactions, setTransactions] = React.useState<
    PlanPaymentTransactionLogType[]
  >([]);

  React.useEffect(() => {
    getPlanPaymentTransactions();
  }, []);

  const _planPurchaseHistoryColumns = planPurchaseHistoryColumns.map((item) => {
    if (item.key === PLAN_PURCHASE_HISTORY_COLUMN_KEYS.TRANSACTION_ID) {
      item.render = (record: PlanPaymentTransactionLogType) => (
        <Link
          href="#"
          onClick={() => {
            navigate(
              `${ROUTES_URL.EE}/${ROUTES_URL.MY_PLAN_INVOICE}/${record.transactionId}`
            );
          }}
        >
          {record.transactionId}
        </Link>
      );
    }
    return item;
  });

  const getPlanPaymentTransactions = () => {
    setLoading(true);
    API.userManagement
      .getPlanPaymentTransactions()
      .then((transactions) => {
        setLoading(false);
        setTransactions(transactions);
      })
      .catch((error) => {
        setLoading(false);
        console.log({ location: "getServiceTransactionLogs", error });
      });
  };

  return (
    <div>
      <Title level={4}>{currentPage}</Title>
      <DataTable columns={_planPurchaseHistoryColumns} data={transactions} />
    </div>
  );
};
