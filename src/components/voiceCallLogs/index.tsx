import React from "react";
import { Card, Col, Row, Space, Typography } from "antd";
import { ContactListType, VoiceCallLogsType } from "../../types";
import "./styles.scss";

const { Text } = Typography;

type VoiceCallLogsProps = {
  callData: VoiceCallLogsType & ContactListType;
};

export const VoiceCallLogs = (
  props: VoiceCallLogsProps
): React.ReactElement => {
  const { callData } = props;
  return (
    <Card className="voice-call-logs__container" bordered={false}>
      {callData?.callStatus ? (
        <Space size="large">
          <div>
            <Text strong>Call Status: </Text>
            <Text className="font-size-12">{callData.callStatus}</Text>
          </div>
          <div>
            <Text strong>Answer Time: </Text>
            <Text className="font-size-12">
              {callData.answerTime
                ? new Date(callData.answerTime * 1000).toLocaleString()
                : "Not answered"}
            </Text>
          </div>
          <div>
            <Text strong>End Time: </Text>
            <Text className="font-size-12">
              {new Date(callData.endTime * 1000).toLocaleString()}
            </Text>
          </div>
          <div>
            <Text strong>End Reason: </Text>
            <Text className="font-size-12">{callData.endReason}</Text>
          </div>
        </Space>
      ) : (
        <Text>No logs to show</Text>
      )}
    </Card>
  );
};
