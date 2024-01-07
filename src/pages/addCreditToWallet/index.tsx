import React from "react";
import { Button, Col, Row, Space } from "antd";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { DataTable } from "../../components/dataTable";
import { walletTransactionColumns } from "./config";
import { DebounceFnType, UserInfoType, WalletType } from "../../types";
import { debounce } from "lodash";
import { API } from "../../api";
import { AddCreditWallet } from "../../components/addCreditWallet";
import { useBearStore } from "../../store";

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
  }, [isAddCredit]);

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
      .getWalletTransaction("", 0, 100)
      .then((transaction) => {
        setWalletTransaction(transaction);
        setLoading(false);
      })
      .catch((error: Error) => {
        setLoading(false);
        console.log({ location: "getAllUsers", error });
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
      <Space direction="vertical">
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
        <DataTable
          columns={walletTransactionColumns}
          data={walletTransaction}
        />
      </Space>
    </>
  );
};
