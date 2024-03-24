import { Avatar, List, Typography } from "antd";
import React from "react";
import { useBearStore } from "../../store";
import { API } from "../../api";
import {
  DATE_TIME_FORMAT,
  ROUTES_URL,
  SERVICE_TRANSACTION_LOGS_ICONS,
  SERVICE_TRANSACTION_LOGS_MAP,
  SERVICE_TRANSACTION_LOGS_URL,
} from "../../constants";
import { ServiceTransactionLogsType } from "../../types";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const { Title, Link } = Typography;

export const ServiceTransactionLogs = () => {
  const [serviceTransactionLogs, setServiceTransactionLogs] = React.useState<
    ServiceTransactionLogsType[]
  >([]);

  const { screen, currentPage, setLoading } = useBearStore.appStore();
  const navigate = useNavigate();

  React.useEffect(() => {
    getServiceTransactionLogs();
  }, []);

  const getServiceTransactionLogs = () => {
    setLoading(true);
    API.userManagement
      .getServiceTransactionLogs()
      .then((logs) => {
        setServiceTransactionLogs(logs);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log({ location: "getServiceTransactionLogs", error });
      });
  };

  return (
    <>
      <div style={{ margin: screen === "MOBILE" ? 0 : "2rem" }}>
        <Title level={4}>{currentPage}</Title>
        <List
          itemLayout="horizontal"
          dataSource={serviceTransactionLogs}
          renderItem={(item: ServiceTransactionLogsType, index) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <span style={{ position: "relative", top: "10px" }}>
                    {
                      SERVICE_TRANSACTION_LOGS_ICONS[
                        item.transactionType as string
                      ]
                    }
                  </span>
                }
                title={
                  <Link
                    onClick={() => {
                      navigate(
                        `${ROUTES_URL.EE}/${
                          SERVICE_TRANSACTION_LOGS_URL[
                            item.transactionType as string
                          ]
                        }?id=${item.transactionId}&action=VIEW`
                      );
                    }}
                  >
                    {
                      SERVICE_TRANSACTION_LOGS_MAP[
                        item.transactionType as string
                      ]
                    }
                  </Link>
                }
                description={`Created at ${dayjs(item.createdAt).format(
                  DATE_TIME_FORMAT
                )}`}
              />
            </List.Item>
          )}
        />
      </div>
    </>
  );
};
