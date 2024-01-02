import React from "react";
import { List, Typography } from "antd";
import { UserInfoType, WalletType } from "../../types";
import { useBearStore } from "../../store";
import { API } from "../../api";
import dayjs from "dayjs";
import { DATE_TIME_FORMAT } from "../../constants";

const { Text } = Typography;

export const Wallet = () => {
  const { setLoading, screen } = useBearStore.appStore();
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
          <Text strong>
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
      <h2>Wallet Balance: {user.walletBalance}</h2>
      <List
        itemLayout="horizontal"
        dataSource={walletTransaction}
        renderItem={renderItem}
        bordered
      />
    </div>
  );
};
