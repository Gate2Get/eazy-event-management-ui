import React from "react";
import { Alert, Button, Input, Modal, QRCode, Space, Typography } from "antd";
import { useBearStore } from "../../store";
import { API } from "../../api";

type WalletPaymentType = {
  isEdit: boolean;
  handleCancel: () => void;
};

const { Text, Link } = Typography;

export const WalletPayment = (props: WalletPaymentType) => {
  const { isEdit, handleCancel } = props;
  const [amount, setAmount] = React.useState<number>(0);
  const [url, setUrl] = React.useState("");
  const [isGeneratingUrl, setIsGeneratingUrl] = React.useState(false);

  console.log({ url });

  const generatePaymentLink = () => {
    setIsGeneratingUrl(true);
    API.userManagement
      .generatePaymentLink(amount)
      .then((url: string) => {
        setIsGeneratingUrl(false);
        setUrl(url);
      })
      .catch((error) => {
        setIsGeneratingUrl(false);
        console.log({
          location: "generatePaymentLink",
          error,
        });
      });
  };

  const handleClose = () => {
    setUrl("");
    setAmount(0);
    handleCancel();
  };

  return (
    <div>
      <Modal
        open={isEdit}
        title="Add Credit"
        onCancel={handleClose}
        footer={null}
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <Alert
            message="Scan the below code or click link to make the payment. After completing the payment, it will take one hour for the funds to be reflected in the wallet."
            type="info"
          />
          {url && (
            <div style={{ position: "relative", left: "28%" }}>
              <QRCode
                value={url}
                status={isGeneratingUrl ? "loading" : "active"}
              />
            </div>
          )}
          {url ? (
            <Text italic style={{ position: "relative", left: "20%" }}>
              Scan the above code or <Link href={url}>Click here</Link> and pay
              ₹ {amount}
            </Text>
          ) : (
            <Input
              type="number"
              placeholder="Enter amount"
              value={amount || undefined}
              onChange={(e) => {
                setAmount(Number(e.target.value));
              }}
            />
          )}
          <div style={{ position: "relative", left: "35%" }}>
            <Button
              type={url ? "text" : "primary"}
              onClick={
                url
                  ? () => {
                      setUrl("");
                    }
                  : generatePaymentLink
              }
            >
              {url ? "Edit Amount" : "Pay now"}
            </Button>
          </div>
        </Space>
      </Modal>
    </div>
  );
};
