import React from "react";
import { Alert, Button, Col, List, Row, Typography } from "antd";
import { WalletType } from "../../types";
import { useBearStore } from "../../store";
import { API } from "../../api";
import dayjs from "dayjs";
import { DATE_TIME_FORMAT } from "../../constants";
import WalletImg from "../../assets/svg/Wallet-bro.svg";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { WalletPayment } from "../../components/walletPayment";

const { Text } = Typography;

export const Wallet = () => {
  const { setLoading } = useBearStore.appStore();
  const { user, setUser, setWalletTransaction, walletTransaction } =
    useBearStore.userStore();
  const [isAddCredit, setIsAddCredit] = React.useState(false);

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
      <WalletPayment
        isEdit={isAddCredit}
        handleCancel={() => setIsAddCredit(false)}
      />
      {user.walletIsTrial && (
        <Alert
          message={
            <div>
              <Button type="link">Upgrade Now</Button>
              Your trial account is ready for an upgrade. Unlock more features
              and benefits by upgrading to a Wallet Account.
            </div>
          }
          type="warning"
        />
      )}
      <Row>
        {/* <Col>
          <img src={WalletImg} alt="" width="30%" />
        </Col> */}
        <Col span={12}>
          <h2>Wallet Balance: {user.walletBalance} (credits points)</h2>
        </Col>
        <Col span={12} style={{ alignSelf: "center" }}>
          <Button
            style={{ float: "right" }}
            type="primary"
            icon={<AccountBalanceWalletIcon fontSize="inherit" />}
            onClick={() => {
              setIsAddCredit(true);
            }}
          >
            Add Credit
          </Button>
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
