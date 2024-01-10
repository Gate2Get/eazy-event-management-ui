import React from "react";
import { Button, Col, DatePicker, Row, Select, Space } from "antd";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { DataTable } from "../../components/dataTable";
import { walletTransactionColumns } from "./config";
import {
  DateFilterType,
  DebounceFnType,
  UserInfoType,
  WalletType,
} from "../../types";
import { debounce } from "lodash";
import { API } from "../../api";
import { AddCreditWallet } from "../../components/addCreditWallet";
import { useBearStore } from "../../store";
import { generateYearArray } from "../../utils/common.utils";
import { MONTHS } from "../../constants";

const yearList = generateYearArray(5).map((item) => ({
  label: item,
  value: item,
}));
const monthList = MONTHS.map((item, index) => ({
  label: item,
  value: index + 1,
}));

export const AddCreditToWallet = () => {
  const [walletTransaction, setWalletTransaction] = React.useState<
    WalletType[]
  >([]);
  const [searchUser, setSearchUser] = React.useState("");
  const [userSearchQuery, setUserSearchQuery] = React.useState<DebounceFnType>(
    {}
  );
  const [users, setUsers] = React.useState<UserInfoType[]>([]);
  const [isUserFetching, setIsUserFetching] = React.useState(false);
  const [isAddCredit, setIsAddCredit] = React.useState(false);
  const { setLoading } = useBearStore.appStore();
  const [filter, setFilter] = React.useState<DateFilterType>({
    month: MONTHS[new Date().getMonth()],
    year: new Date().getFullYear(),
  });

  React.useEffect(() => {
    const search = debounce(getAllUsers, 1000);
    setUserSearchQuery((prevSearch: DebounceFnType) => {
      if (prevSearch.cancel) {
        prevSearch.cancel();
      }
      return search;
    });
    search(searchUser?.trim());
  }, [searchUser]);

  React.useEffect(() => {
    if (!isAddCredit) {
      getWalletTransaction();
    }
  }, [isAddCredit, filter]);

  const getAllUsers = (search: string): any => {
    setIsUserFetching(true);
    API.adminAPI
      .getAllUsers(search)
      .then((users) => {
        setUsers(users);
        setIsUserFetching(false);
      })
      .catch((error: Error) => {
        setIsUserFetching(false);
        console.log({ location: "getAllUsers", error });
      });
  };

  const getWalletTransaction = (): any => {
    setLoading(true);
    API.adminAPI
      .getWalletTransaction(filter, 0, 100)
      .then((transaction) => {
        setWalletTransaction(transaction);
        setLoading(false);
      })
      .catch((error: Error) => {
        setLoading(false);
        console.log({ location: "getWalletTransaction", error });
      });
  };

  const handleAddCredit = (transaction: WalletType) => {
    setLoading(true);
    API.adminAPI
      .updateWallet(transaction)
      .then((status) => {
        setLoading(false);
        setIsAddCredit(false);
      })
      .catch((error: Error) => {
        setLoading(false);
        console.log({ location: "handleAddCredit", error });
      });
  };

  return (
    <>
      <AddCreditWallet
        isEdit={isAddCredit}
        onSearchUser={setSearchUser}
        users={users}
        isUserFetching={isUserFetching}
        handleAddCredit={handleAddCredit}
        handleClose={() => {
          setIsAddCredit(false);
        }}
      />
      <Space direction="vertical" style={{ width: "100%" }}>
        <Row>
          <Col span={24}>
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
        <div>
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
        </div>
      </Space>
      <div style={{ width: "100%", paddingTop: "8px" }}>
        <DataTable
          columns={walletTransactionColumns}
          data={walletTransaction}
        />
      </div>
    </>
  );
};
