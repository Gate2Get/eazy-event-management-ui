import React from "react";
import { Alert, Button, Col, List, Row, Select, Space, Typography } from "antd";
import { DateFilterType, WalletType } from "../../types";
import { useBearStore } from "../../store";
import { API } from "../../api";
import dayjs from "dayjs";
import { DATE_TIME_FORMAT, MONTHS } from "../../constants";
import WalletImg from "../../assets/svg/Wallet-bro.svg";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { WalletPayment } from "../../components/walletPayment";
import { generateYearArray } from "../../utils/common.utils";

const { Text } = Typography;

const yearList = generateYearArray(5).map((item) => ({
  label: item,
  value: item,
}));
const monthList = MONTHS.map((item, index) => ({
  label: item,
  value: index + 1,
}));

export const Wallet = () => {
  const { setLoading } = useBearStore.appStore();
  const { user, setUser, setWalletTransaction, walletTransaction } =
    useBearStore.userStore();
  const [isAddCredit, setIsAddCredit] = React.useState(false);
  const [filter, setFilter] = React.useState<DateFilterType>({
    month: MONTHS[new Date().getMonth()],
    year: new Date().getFullYear(),
  });

  React.useEffect(() => {
    getUserInfo();
  }, []);

  React.useEffect(() => {
    getWalletTransaction();
  }, [filter]);

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
      .getWalletTransaction(filter)
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
          <Row>
            <Col flex={12}>
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
            </Col>
            <Col flex={12}>
              <Text style={{ float: "right", fontWeight: 400 }}>
                {dayjs(item.createdAt).format(DATE_TIME_FORMAT)}
              </Text>
            </Col>
          </Row>
        }
        description={item.notes}
      />
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
          <img loading="lazy" src={WalletImg} alt="" width="30%" />
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
      <Row style={{ marginBottom: "8px" }}>
        <Col span={24}>
          <Space style={{ float: "right" }}>
            <Select
              onChange={(year) => {
                setFilter({ ...filter, year });
              }}
              value={filter.year}
              options={yearList}
            />
            <Select
              onChange={(month) => {
                setFilter({ ...filter, month });
              }}
              value={filter.month}
              options={monthList}
            />
          </Space>
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
