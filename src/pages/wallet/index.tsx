import React from "react";
import { Col, List, Row, Typography } from "antd";
import { WalletType } from "../../types";
import { useBearStore } from "../../store";
import { API } from "../../api";
import dayjs from "dayjs";
import { DATE_TIME_FORMAT } from "../../constants";
import WalletImg from "../../assets/svg/Wallet-bro.svg";

const { Text } = Typography;

export const Wallet = () => {
  const { setLoading } = useBearStore.appStore();
  const { user, setUser, setWalletTransaction, walletTransaction } =
    useBearStore.userStore();

  React.useEffect(() => {
    getUserInfo();
    getWalletTransaction();
  }, []);

  const getUserInfo = () => {
    setLoading(true);
    API.userManagement
      .getUserInfo()
      .then((userInfo) => {
        setLoading(false);
        setUser(userInfo);
      })
      .catch((error) => {
        setLoading(false);
        console.log({ location: "getUserInfo", error });
      });
  };

  const getWalletTransaction = () => {
    setLoading(true);
    API.userManagement
      .getWalletTransaction()
      .then((walletTransaction: WalletType[]) => {
        setLoading(false);
        setWalletTransaction(walletTransaction);
      })
      .catch((error) => {
        setLoading(false);
        console.log({ location: "getWalletTransaction", error });
      });
  };
  const renderItem = (item: WalletType) => (
    <List.Item>
      <List.Item.Meta
        title={
          <Text
            strong
            style={{
              color:
                item.type === "credit"
                  ? "rgb(18, 183, 106)"
                  : "rgb(240, 68, 56)",
            }}
          >
            {item.type === "credit" ? `+${item.amount}` : `-${item.amount}`}
          </Text>
        }
        description={item.notes}
      />
      <div>{dayjs(item.createdAt).format(DATE_TIME_FORMAT)}</div>
    </List.Item>
  );

  return (
    <div>
      <Row>
        {/* <Col>
          <img src={WalletImg} alt="" width="30%" />
        </Col> */}
        <Col>
          <h2>Wallet Balance: {user.walletBalance} (credits points)</h2>
        </Col>
      </Row>

      <List
        itemLayout="horizontal"
        dataSource={walletTransaction}
        renderItem={renderItem}
        bordered
      />
    </div>
  );
};
