import {
  Avatar,
  Button,
  Card,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
} from "antd";
import React from "react";
import { UserInfoType, WalletType } from "../../types";
import { UserProfileCard } from "../userProfileCard";

const paymentTypes = [
  {
    label: "Credit",
    value: "credit",
  },
  {
    label: "Debit",
    value: "debit",
  },
];

type AddCreditWalletType = {
  isEdit: boolean;
  users: UserInfoType[];
  handleAddCredit: (transaction: WalletType) => void;
  isUserFetching?: boolean;
  onSearchUser: (search: string) => void;
  handleClose: () => void;
};

export const AddCreditWallet = (props: AddCreditWalletType) => {
  const {
    isEdit,
    users,
    isUserFetching,
    handleAddCredit,
    onSearchUser,
    handleClose,
  } = props;

  const [form] = Form.useForm();

  const handleCancel = () => {
    handleClose();
  };

  React.useEffect(() => {
    if (!isEdit) {
      form.resetFields();
    }
  }, [isEdit]);

  return (
    <div>
      <Modal
        open={isEdit}
        title="Add credit"
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          name="creditAddForm"
          className="event-notification-edit__container"
          layout="vertical"
          onFinish={handleAddCredit}
          form={form}
        >
          <Form.Item
            label="Search user"
            name="userId"
            rules={[
              {
                required: true,
                message: "Search user!",
              },
            ]}
          >
            <Select
              style={{ height: "64px" }}
              placeholder="Search user"
              allowClear
              showSearch
              options={users?.map((user) => ({
                label: (
                  <UserProfileCard
                    name={user.firstName as string}
                    mobile={user.mobile?.toString()}
                    picture={user.picture as string}
                  />
                ),
                value: user.userId,
              }))}
              loading={isUserFetching}
              onSearch={onSearchUser}
              filterOption={false}
            />
          </Form.Item>
          <Form.Item
            label="Amount"
            name="amount"
            rules={[
              {
                required: true,
                message: "Please input amount!",
              },
            ]}
          >
            <Input type="number" placeholder="Amount" />
          </Form.Item>

          <Form.Item
            label="Select type"
            name="type"
            rules={[
              {
                required: true,
                message: "Please select type!",
              },
            ]}
          >
            <Select
              placeholder="Select type"
              allowClear
              options={paymentTypes}
            />
          </Form.Item>

          <Form.Item>
            <div className="submit-button">
              <Button type="default" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Add
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
